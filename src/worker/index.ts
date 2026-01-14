import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

// Helper to get or create session ID from cookie
function getSessionId(c: any): string {
  let sessionId = c.req.header('x-session-id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
  }
  return sessionId;
}

// Get artworks with optional filters
app.get("/api/artworks", async (c) => {
  const db = c.env.DB;
  const featured = c.req.query("featured");
  const trending = c.req.query("trending");
  const bestseller = c.req.query("bestseller");
  const category = c.req.query("category");
  const limit = c.req.query("limit") || "20";
  const offset = c.req.query("offset") || "0";

  let sql = `
    SELECT 
      artworks.*,
      artists.name as artist_name
    FROM artworks
    LEFT JOIN artists ON artworks.artist_id = artists.id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (featured === "1") {
    sql += " AND artworks.is_featured = 1";
  }
  if (trending === "1") {
    sql += " AND artworks.is_trending = 1";
  }
  if (bestseller === "1") {
    sql += " AND artworks.is_bestseller = 1";
  }
  if (category) {
    sql += " AND artworks.category = ?";
    params.push(category);
  }

  sql += " ORDER BY artworks.created_at DESC LIMIT ? OFFSET ?";
  params.push(parseInt(limit), parseInt(offset));

  const result = await db.prepare(sql).bind(...params).all();
  return c.json(result.results || []);
});

// Get single artwork
app.get("/api/artworks/:id", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");

  const result = await db
    .prepare(
      `
      SELECT 
        artworks.*,
        artists.name as artist_name,
        artists.bio as artist_bio,
        artists.profile_image_url as artist_profile_image_url
      FROM artworks
      LEFT JOIN artists ON artworks.artist_id = artists.id
      WHERE artworks.id = ?
    `
    )
    .bind(id)
    .first();

  if (!result) {
    return c.json({ error: "Artwork not found" }, 404);
  }

  return c.json(result);
});

// Get related artworks
app.get("/api/artworks/:id/related", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");

  // First get the artwork's category
  const artwork = await db
    .prepare("SELECT category FROM artworks WHERE id = ?")
    .bind(id)
    .first();

  if (!artwork) {
    return c.json({ error: "Artwork not found" }, 404);
  }

  // Get related artworks from same category
  const result = await db
    .prepare(
      `
      SELECT 
        artworks.*,
        artists.name as artist_name
      FROM artworks
      LEFT JOIN artists ON artworks.artist_id = artists.id
      WHERE artworks.category = ? AND artworks.id != ?
      ORDER BY RANDOM()
      LIMIT 4
    `
    )
    .bind(artwork.category, id)
    .all();

  return c.json(result.results || []);
});

// Get all artists
app.get("/api/artists", async (c) => {
  const db = c.env.DB;
  const result = await db
    .prepare("SELECT * FROM artists ORDER BY name")
    .all();

  return c.json(result.results || []);
});

// Get single artist
app.get("/api/artists/:id", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");

  const artist = await db
    .prepare("SELECT * FROM artists WHERE id = ?")
    .bind(id)
    .first();

  if (!artist) {
    return c.json({ error: "Artist not found" }, 404);
  }

  return c.json(artist);
});

// Get artworks by artist
app.get("/api/artists/:id/artworks", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");

  const result = await db
    .prepare(
      `
      SELECT 
        artworks.*,
        artists.name as artist_name
      FROM artworks
      LEFT JOIN artists ON artworks.artist_id = artists.id
      WHERE artworks.artist_id = ?
      ORDER BY artworks.created_at DESC
    `
    )
    .bind(id)
    .all();

  return c.json(result.results || []);
});

// Get category stats
app.get("/api/categories/stats", async (c) => {
  const db = c.env.DB;
  const result = await db
    .prepare(
      `
      SELECT 
        category,
        COUNT(*) as count
      FROM artworks
      GROUP BY category
      ORDER BY category
    `
    )
    .all();

  return c.json(result.results || []);
});

// Search artworks
app.get("/api/search", async (c) => {
  const db = c.env.DB;
  const query = c.req.query("q") || "";
  const limit = c.req.query("limit") || "20";

  if (!query) {
    return c.json([]);
  }

  const result = await db
    .prepare(
      `
      SELECT 
        artworks.*,
        artists.name as artist_name
      FROM artworks
      LEFT JOIN artists ON artworks.artist_id = artists.id
      WHERE 
        artworks.title LIKE ? OR
        artworks.description LIKE ? OR
        artists.name LIKE ? OR
        artworks.category LIKE ?
      ORDER BY artworks.is_featured DESC, artworks.created_at DESC
      LIMIT ?
    `
    )
    .bind(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, parseInt(limit))
    .all();

  return c.json(result.results || []);
});

// Cart endpoints
app.get("/api/cart", async (c) => {
  const db = c.env.DB;
  const sessionId = getSessionId(c);

  const result = await db
    .prepare(
      `
      SELECT 
        cart_items.*,
        artworks.title,
        artworks.image_url,
        artworks.price,
        artworks.category,
        artists.name as artist_name
      FROM cart_items
      LEFT JOIN artworks ON cart_items.artwork_id = artworks.id
      LEFT JOIN artists ON artworks.artist_id = artists.id
      WHERE cart_items.session_id = ?
      ORDER BY cart_items.created_at DESC
    `
    )
    .bind(sessionId)
    .all();

  return c.json(result.results || [], 200, {
    'x-session-id': sessionId
  });
});

app.post("/api/cart", async (c) => {
  const db = c.env.DB;
  const sessionId = getSessionId(c);
  const body = await c.req.json();
  const { artwork_id, quantity = 1, size_option = null } = body;

  if (!artwork_id) {
    return c.json({ error: "artwork_id is required" }, 400);
  }

  // Check if item already exists
  const existing = await db
    .prepare(
      "SELECT * FROM cart_items WHERE session_id = ? AND artwork_id = ? AND size_option = ?"
    )
    .bind(sessionId, artwork_id, size_option)
    .first();

  if (existing) {
    // Update quantity
    await db
      .prepare(
        "UPDATE cart_items SET quantity = quantity + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      )
      .bind(quantity, existing.id)
      .run();
  } else {
    // Insert new item
    await db
      .prepare(
        "INSERT INTO cart_items (session_id, artwork_id, quantity, size_option) VALUES (?, ?, ?, ?)"
      )
      .bind(sessionId, artwork_id, quantity, size_option)
      .run();
  }

  return c.json({ success: true }, 200, {
    'x-session-id': sessionId
  });
});

app.delete("/api/cart/:id", async (c) => {
  const db = c.env.DB;
  const sessionId = getSessionId(c);
  const id = c.req.param("id");

  await db
    .prepare("DELETE FROM cart_items WHERE id = ? AND session_id = ?")
    .bind(id, sessionId)
    .run();

  return c.json({ success: true });
});

app.patch("/api/cart/:id", async (c) => {
  const db = c.env.DB;
  const sessionId = getSessionId(c);
  const id = c.req.param("id");
  const body = await c.req.json();
  const { quantity } = body;

  if (!quantity || quantity < 1) {
    return c.json({ error: "Invalid quantity" }, 400);
  }

  await db
    .prepare(
      "UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND session_id = ?"
    )
    .bind(quantity, id, sessionId)
    .run();

  return c.json({ success: true });
});

// Wishlist endpoints
app.get("/api/wishlist", async (c) => {
  const db = c.env.DB;
  const sessionId = getSessionId(c);

  const result = await db
    .prepare(
      `
      SELECT 
        wishlist_items.*,
        artworks.title,
        artworks.image_url,
        artworks.price,
        artworks.category,
        artists.name as artist_name
      FROM wishlist_items
      LEFT JOIN artworks ON wishlist_items.artwork_id = artworks.id
      LEFT JOIN artists ON artworks.artist_id = artists.id
      WHERE wishlist_items.session_id = ?
      ORDER BY wishlist_items.created_at DESC
    `
    )
    .bind(sessionId)
    .all();

  return c.json(result.results || [], 200, {
    'x-session-id': sessionId
  });
});

app.post("/api/wishlist", async (c) => {
  const db = c.env.DB;
  const sessionId = getSessionId(c);
  const body = await c.req.json();
  const { artwork_id } = body;

  if (!artwork_id) {
    return c.json({ error: "artwork_id is required" }, 400);
  }

  // Check if already in wishlist
  const existing = await db
    .prepare("SELECT * FROM wishlist_items WHERE session_id = ? AND artwork_id = ?")
    .bind(sessionId, artwork_id)
    .first();

  if (existing) {
    return c.json({ success: true, already_exists: true }, 200);
  }

  await db
    .prepare("INSERT INTO wishlist_items (session_id, artwork_id) VALUES (?, ?)")
    .bind(sessionId, artwork_id)
    .run();

  return c.json({ success: true }, 200, {
    'x-session-id': sessionId
  });
});

app.delete("/api/wishlist/:id", async (c) => {
  const db = c.env.DB;
  const sessionId = getSessionId(c);
  const id = c.req.param("id");

  await db
    .prepare("DELETE FROM wishlist_items WHERE id = ? AND session_id = ?")
    .bind(id, sessionId)
    .run();

  return c.json({ success: true });
});

export default app;
