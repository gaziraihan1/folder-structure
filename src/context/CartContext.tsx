"use client";

import React, { createContext, useContext, useState } from "react";
import { FileItemType } from "@/data/folder";

export interface CartItem extends FileItemType {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: FileItemType) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean; // ✅ added helper
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: FileItemType) => {
    setCart((prevCart) => {
      const exists = prevCart.find((i) => i.id === item.id);
      if (exists) return prevCart; // ✅ don’t add again
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const isInCart = (id: number) => cart.some((item) => item.id === id);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
