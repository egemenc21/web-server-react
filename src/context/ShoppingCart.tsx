import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {Product} from "../mock-data/products";

interface User {
  userId: number;
  username: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  address: string;
}

interface ShoppingCart {
  shoppingCartId: number;
  user: User;
  cartItems: CartItem[];
}

export interface CartItem {
  cartItemId: number;
  quantity: number;
  product: Product;
  shoppingCart: number;
}

interface ShoppingCartContextType {
  cartItems: CartItem[];
  shoppingCartId: number | undefined;
  addItemToCart: (productId: number, userId: number) => void;
  deleteItemFromCart: (cartItemId: number) => void;
  clearItem: (cartItemId: number) => void;
  clearShoppingCart: (cartId: number) => Promise<void>;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

export const useShoppingCart = (): ShoppingCartContextType => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

const ShoppingCartProvider = ({children}: {children: React.ReactNode}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shoppingCartId, setShoppingCartId] = useState<number>();

  const fetchShoppingCart = async (userId: number) => {
    try {
      const response = await axios.get(`/cart/${userId}`);
      const shoppingCart: ShoppingCart = response.data;

      setCartItems(shoppingCart.cartItems);
      setShoppingCartId(shoppingCart.shoppingCartId);
      // Use the shopping cart data as needed, e.g., update context state
    } catch (error) {
      console.error("Error fetching shopping cart:", error);
    }
  };
  useEffect(() => {
    fetchShoppingCart(1);
  }, []); // Trigger the effect only when userId changes

  const addItemToCart = async (productId: number, userId: number) => {
    try {
      // Check if the product already exists in the cart
      const existingCartItem = cartItems.find(
        (item) => item.product.productId === productId
      );

      if (existingCartItem) {
        const incrementedQuantity = existingCartItem.quantity + 1;
        // If the product exists, update the quantity

        await axios.put(
          `/cart-item/updateQuantity/${existingCartItem.cartItemId}?quantity=${incrementedQuantity}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              // Include any authorization headers or other required headers
            },
          }
        );
      } else {
        // If the product does not exist, create a new cart item
        await axios.post(
          `/cart-item/add/${userId}`,
          {
            productId: productId,
            quantity: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              // Include any authorization headers or other required headers
            },
          }
        );
      }

      // Update the local state with the updated cart items
      fetchShoppingCart(userId);
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

  const clearShoppingCart = async (cartId: number) => {
    try {
      await axios.delete(`/cart-item/deleteAll/${cartId}`, {
        headers: {
          "Content-Type": "application/json",
          // Include any authorization headers or other required headers
        },
      });
      setCartItems([]); // Update the local state to clear the cart items
    } catch (error) {
      console.error("Error clearing shopping cart:", error);
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        shoppingCartId,
        deleteItemFromCart,
        clearItem,
        clearShoppingCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
