import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MOCK_ARTWORKS } from '@/react-app/data/mockArtworks';

interface CartItem {
  id: number;
  artwork_id: number;
  quantity: number;
  size_option: string | null;
  title: string;
  image_url: string;
  price: number;
  category: string;
  artist_name: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addToCart: (artworkId: number, sizeOption?: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'swearts_cart_items';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems));
      } catch (e) {
        console.error('Error parsing cart items from storage:', e);
      }
    }
  }, []);

  // Sync with localStorage on changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const refreshCart = async () => {
    // No-op for local implementation, but kept for compatibility
  };

  const addToCart = async (artworkId: number, sizeOption?: string, quantity = 1) => {
    const artwork = MOCK_ARTWORKS.find(a => a.id === artworkId);
    if (!artwork) return;

    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.artwork_id === artworkId && item.size_option === (sizeOption || null)
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      const newItem: CartItem = {
        id: Date.now(), // Generate a simple local ID
        artwork_id: artworkId,
        quantity,
        size_option: sizeOption || null,
        title: artwork.title,
        image_url: artwork.image_url,
        price: artwork.price,
        category: artwork.category,
        artist_name: artwork.artist_name || 'Unknown Artist'
      };
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = async (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    setItems(prevItems => prevItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
