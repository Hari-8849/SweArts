import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string>('');

  const refreshCart = async () => {
    try {
      const headers: HeadersInit = {};
      if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      const response = await fetch('/api/cart', { headers });
      const newSessionId = response.headers.get('x-session-id');
      if (newSessionId) {
        setSessionId(newSessionId);
        localStorage.setItem('sessionId', newSessionId);
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
    refreshCart();
  }, []);

  const addToCart = async (artworkId: number, sizeOption?: string, quantity = 1) => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          artwork_id: artworkId,
          size_option: sizeOption || null,
          quantity
        })
      });

      const newSessionId = response.headers.get('x-session-id');
      if (newSessionId) {
        setSessionId(newSessionId);
        localStorage.setItem('sessionId', newSessionId);
      }

      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      const headers: HeadersInit = {};
      if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
        headers
      });
      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ quantity })
      });
      await refreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
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
