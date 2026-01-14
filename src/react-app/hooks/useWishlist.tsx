import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MOCK_ARTWORKS } from '@/react-app/data/mockArtworks';

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

const LOCAL_STORAGE_KEY = 'swearts_wishlist_items';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems));
      } catch (e) {
        console.error('Error parsing wishlist items from storage:', e);
      }
    }
  }, []);

  // Sync with localStorage on changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const refreshWishlist = async () => {
    // No-op for local implementation
  };

  const addToWishlist = async (artworkId: number) => {
    if (isInWishlist(artworkId)) return;

    const artwork = MOCK_ARTWORKS.find(a => a.id === artworkId);
    if (!artwork) return;

    const newItem: WishlistItem = {
      id: Date.now(), // Generate a simple local ID
      artwork_id: artworkId,
      title: artwork.title,
      image_url: artwork.image_url,
      price: artwork.price,
      category: artwork.category,
      artist_name: artwork.artist_name || 'Unknown Artist'
    };

    setItems(prevItems => [...prevItems, newItem]);
  };

  const removeFromWishlist = async (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId && item.artwork_id !== itemId));
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
