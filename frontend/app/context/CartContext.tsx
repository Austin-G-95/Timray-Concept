// context/CartContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('timray-cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('timray-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (productId: number) => {
    setCartItems(current => {
      const existing = current.find(item => item.id === productId);
      if (existing) {
        return current.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(current => {
      const existing = current.find(item => item.id === productId);
      if (existing && existing.quantity > 1) {
        return current.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return current.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      setCartItems(current => current.filter(item => item.id !== productId));
    } else {
      setCartItems(current => {
        const existing = current.find(item => item.id === productId);
        if (existing) {
          return current.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          );
        }
        return [...current, { id: productId, quantity }];
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQuantity = (productId: number) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      totalItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemQuantity,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}