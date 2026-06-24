"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartContextValue = {
  cart: Record<string, number>;
  cartCount: number;
  favorites: string[];
  favoriteCount: number;
  add: (id: string) => void;
  remove: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedCart = window.localStorage.getItem("pa-do-sol-cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedFavorites = window.localStorage.getItem("pa-do-sol-favorites");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("pa-do-sol-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem("pa-do-sol-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const add = (id: string) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const remove = (id: string) => setCart((current) => ({ ...current, [id]: Math.max((current[id] || 0) - 1, 0) }));
  const removeItem = (id: string) => setCart((current) => {
    const next = { ...current };
    delete next[id];
    return next;
  });
  const clear = () => setCart({});
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const isFavorite = (id: string) => favorites.includes(id);
  const toggleFavorite = (id: string) => setFavorites((current) =>
    current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
  );

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      favorites,
      favoriteCount: favorites.length,
      add,
      remove,
      removeItem,
      clear,
      isFavorite,
      toggleFavorite,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa ser usado dentro de CartProvider");
  return context;
}
