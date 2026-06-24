"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartContextValue = {
  cart: Record<number, number>;
  cartCount: number;
  favorites: number[];
  favoriteCount: number;
  add: (id: number) => void;
  remove: (id: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [favorites, setFavorites] = useState<number[]>([1]);

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

  const add = (id: number) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const remove = (id: number) => setCart((current) => ({ ...current, [id]: Math.max((current[id] || 0) - 1, 0) }));
  const removeItem = (id: number) => setCart((current) => {
    const next = { ...current };
    delete next[id];
    return next;
  });
  const clear = () => setCart({});
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const isFavorite = (id: number) => favorites.includes(id);
  const toggleFavorite = (id: number) => setFavorites((current) =>
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
