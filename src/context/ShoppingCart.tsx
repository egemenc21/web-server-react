import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export interface CartItem {
  cartItemId: number;
  quantity: number;
  product: {
    productId: number;
    name: string;
    price: number;
  };
}

interface ShoppingCartContextType {
  cartItems: CartItem[];
  addItemToCart: (productId: number) => void;
  deleteItemFromCart: (cartItemId: number) => void;
  clearItem: (cartItemId: number) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const useShoppingCart = (): ShoppingCartContextType => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};

const ShoppingCartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = (productId: number) => {
    // Logic to add item to cart
  };

  const deleteItemFromCart = (cartItemId: number) => {
    // Logic to delete item from cart
  };

  const clearItem = (cartItemId: number) => {
    // Logic to clear item from cart
  };

  return (
    <ShoppingCartContext.Provider value={{ cartItems, addItemToCart, deleteItemFromCart, clearItem }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
