import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistItem {
  id: number;
  artwork_id: number;
  title: string;
  image_url: string;
  price: number;
  category: string;
  artist_name: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  itemCount: number;
  isInWishlist: (artworkId: number) => boolean;
  addToWishlist: (artworkId: number) => Promise<void>;
  removeFromWishlist: (itemId: number) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [sessionId, setSessionId] = useState<string>('');

  const refreshWishlist = async () => {
    try {
      const headers: HeadersInit = {};
      if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      const response = await fetch('/api/wishlist', { headers });
      const newSessionId = response.headers.get('x-session-id');
      if (newSessionId) {
        setSessionId(newSessionId);
        localStorage.setItem('sessionId', newSessionId);
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
    refreshWishlist();
  }, []);

  const addToWishlist = async (artworkId: number) => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers,
        body: JSON.stringify({ artwork_id: artworkId })
      });

      const newSessionId = response.headers.get('x-session-id');
      if (newSessionId) {
        setSessionId(newSessionId);
        localStorage.setItem('sessionId', newSessionId);
      }

      await refreshWishlist();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (itemId: number) => {
    try {
      const headers: HeadersInit = {};
      if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      await fetch(`/api/wishlist/${itemId}`, {
        method: 'DELETE',
        headers
      });
      await refreshWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  const isInWishlist = (artworkId: number) => {
    return items.some(item => item.artwork_id === artworkId);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      itemCount: items.length,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      refreshWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
