// src/context/CartContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // Al mount o quando necessario aggiorna il conteggio carrello
  const refreshCartCount = async () => {
    try {
      const res = await api.get("/cart/count");
      setCartCount(res.data.count || 0);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => { refreshCartCount(); }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
