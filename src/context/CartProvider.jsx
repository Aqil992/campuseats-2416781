import { useState } from "react";
import { CartContext } from "./cart-context.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("campuseats-cart", []);
  const [orders, setOrders] = useLocalStorage("campuseats-orders", []);

  // Calculate total quantity of items in the cart
  const count = cart.reduce((total, cartItem) => total + cartItem.qty, 0);

  // Calculate the total price of items in the cart
  const total = cart.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.qty,
    0,
  );

  // Add an item to the cart, or increase its quantity
  function addToCart(item) {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.item.id === item.id,
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem,
        );
      }

      return [...prevCart, { item, qty: 1 }];
    });
  }

  // Increase or decrease item quantity
  function changeQty(itemId, change) {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, qty: cartItem.qty + change }
            : cartItem,
        )
        .filter((cartItem) => cartItem.qty > 0),
    );
  }

  // Remove an item from the cart
  function removeFromCart(itemId) {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.item.id !== itemId),
    );
  }

  // Save an order and clear the cart
  function placeOrder(details) {
    const order = {
      ...details,
      items: cart,
      total,
      id: Date.now(),
      date: new Date().toISOString(),
    };

    setOrders((prevOrders) => [...prevOrders, order]);
    setCart([]);
  }

  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
