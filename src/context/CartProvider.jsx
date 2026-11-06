import { useState } from "react";
import { CartContext } from "./cart-context.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("campuseats-cart", []);
  const [orders, setOrders] = useLocalStorage("campuseats-orders", []);

  function addToCart(item) {
    setCart((prevCart) => {
      const existingLine = prevCart.find((line) => line.item.id === item.id);
      if (existingLine) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...prevCart, { item, qty: 1 }];
    });
  }

  function changeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) => {
          if (line.item.id === itemId) {
            const newQty = line.qty + delta;
            return newQty > 0 ? { ...line, qty: newQty } : null;
          }
          return line;
        })
        .filter(Boolean),
    );
  }

  function removeFromCart(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId));
  }

  function placeOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0,
    );
    const newOrder = {
      id: Date.now(),
      ...details,
      items: [...cart],
      total,
      date: new Date().toLocaleString(),
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]);
  }

  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

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
