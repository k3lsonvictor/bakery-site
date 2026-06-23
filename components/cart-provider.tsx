"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartContextValue = {
  cart: Record<number, number>;
  cartCount: number;
  add: (id: number) => void;
  remove: (id: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({});

  useEffect(() => {
    const savedCart = window.localStorage.getItem("pa-do-sol-cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("pa-do-sol-cart", JSON.stringify(cart));
  }, [cart]);

  const add = (id: number) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const remove = (id: number) => setCart((current) => ({ ...current, [id]: Math.max((current[id] || 0) - 1, 0) }));
  const removeItem = (id: number) => setCart((current) => {
    const next = { ...current };
    delete next[id];
    return next;
  });
  const clear = () => setCart({});
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return <CartContext.Provider value={{ cart, cartCount, add, remove, removeItem, clear }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa ser usado dentro de CartProvider");
  return context;
}
