import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {Product} from "../mock-data/products";
import {UserContext} from "./User";

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
  addItemToCart: (productId: number) => void;
  deleteItemFromCart: (cartItemId: number) => void;
  clearItem: (cartItemId: number) => void;
  clearShoppingCart: (cartId: number) => Promise<void>;
  itemQuantity: number;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
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
  const [itemQuantity, setQuantity] = useState(0);
  const {userData} = useContext(UserContext);

  const fetchShoppingCart = async (userId: number) => {
    try {
      console.log(userId);
      const response = await axios.get(`/cart/${userId}`);
      console.log(response, userId, "shopping cart context");
      const shoppingCart: ShoppingCart = response.data;

      setCartItems(shoppingCart.cartItems);
      setShoppingCartId(shoppingCart.shoppingCartId);
      // Use the shopping cart data as needed, e.g., update context state
    } catch (error) {
      console.error("Error fetching shopping cart:", error);
    }
  };
  useEffect(() => {
    console.log(userData?.id);
    if (userData && userData.id) {
      fetchShoppingCart(userData.id);
    }
  }, [userData]); // Trigger the effect only when userId changes

  const addItemToCart = async (productId: number) => {
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
        const newCartItemRes = await axios.post(
          `/cart-item/add/${userData?.id}`,
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
        console.log(newCartItemRes.data, "new item")
      }

      if (userData)
        // Update the local state with the updated cart items
        fetchShoppingCart(userData?.id);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
    setQuantity(itemQuantity + 1);
  };

  const deleteItemFromCart = async (cartItemId: number) => {
    try {
      await axios.delete(`/cart-item/delete/${cartItemId}`);
      // Update the local state to remove the deleted item from cartItems
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.cartItemId !== cartItemId)
      );
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
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
        itemQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
