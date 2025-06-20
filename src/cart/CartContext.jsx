import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart (with quantity default to 1)
  const addToCart = (item) => {
    const exists = cartItems.some(i => i.certificate_number === item.certificate_number);
    if (!exists) {
      const updated = [...cartItems, { ...item, quantity: 1 }]; // 👈 Ensure quantity is set
      setCartItems(updated);
    }
  };

  // Remove item by certificate number
  const removeFromCart = (certificate_number) => {
    const updated = cartItems.filter(item => item.certificate_number !== certificate_number);
    setCartItems(updated);
  };

  // Update item quantity
  const updateCartItem = (certificate_number, quantity) => {
    const updated = cartItems.map(item =>
      item.certificate_number === certificate_number
        ? { ...item, quantity }
        : item
    );
    setCartItems(updated);
  };

  // Clear all cart items
  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItem, // 👈 Added here
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
