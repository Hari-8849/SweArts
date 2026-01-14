
CREATE TABLE artists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE artworks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  artist_id INTEGER NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  price REAL NOT NULL,
  orientation TEXT,
  width INTEGER,
  height INTEGER,
  is_featured BOOLEAN DEFAULT 0,
  is_trending BOOLEAN DEFAULT 0,
  is_bestseller BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  artwork_id INTEGER NOT NULL,
  quantity INTEGER DEFAULT 1,
  size_option TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wishlist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  artwork_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_artworks_category ON artworks(category);
CREATE INDEX idx_artworks_artist ON artworks(artist_id);
CREATE INDEX idx_artworks_featured ON artworks(is_featured);
CREATE INDEX idx_cart_session ON cart_items(session_id);
CREATE INDEX idx_wishlist_session ON wishlist_items(session_id);
