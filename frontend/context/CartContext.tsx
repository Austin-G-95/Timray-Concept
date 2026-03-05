'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BaseProduct, CartItem } from '@/lib/types';

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (product: BaseProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;
  isHydrated: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }): React.ReactNode {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize cart from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem('timray-cart');
    if (saved) {
      try {
        const parsedItems = JSON.parse(saved);
        // Filter out items with external URLs (old data)
        const validItems = parsedItems.filter((item: CartItem) => 
          item.image && (item.image.startsWith('/img/') || item.image.startsWith('./img/'))
        );
        setCartItems(validItems);
        
        // If we filtered out items, update localStorage
        if (validItems.length !== parsedItems.length) {
          localStorage.setItem('timray-cart', JSON.stringify(validItems));
        }
      } catch (error) {
        console.error('Error parsing cart data:', error);
        localStorage.removeItem('timray-cart');
        setCartItems([]);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('timray-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isHydrated]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addToCart = (product: BaseProduct) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      setCartItems(prev => {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        );
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQuantity = (productId: string) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      totalItems,
      totalAmount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemQuantity,
      isInCart,
      isHydrated
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
