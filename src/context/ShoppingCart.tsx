import React, {createContext, useContext, useState} from "react";
import axios from "axios";

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
  addItemToCart: (productId: number, userId: number) => void;
  deleteItemFromCart: (cartItemId: number) => void;
  clearItem: (cartItemId: number) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

export const useShoppingCart = (): ShoppingCartContextType => {
    const context = useContext(ShoppingCartContext);
    if (!context) {
      throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
    }
    return context;
  };

const ShoppingCartProvider = ({children}: {children: React.ReactNode}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = async (productId: number, userId: number) => {
    try {
      const response = await axios.post(
        `/cart/add`,
        {
          userId: userId,
          productId: productId,
          quantity: 5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Include any authorization headers or other required headers
          },
        }
      );
      console.log(response.data)
      // Update the local state with the updated cart items from the response
    //   setCartItems(response.data.cartItems); // Assuming the response returns the updated cart items
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const deleteItemFromCart = (cartItemId: number) => {
    // Logic to delete item from cart
  };

  const clearItem = (cartItemId: number) => {
    // Logic to clear item from cart
  };

  return (
    <ShoppingCartContext.Provider
      value={{cartItems, addItemToCart, deleteItemFromCart, clearItem}}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
