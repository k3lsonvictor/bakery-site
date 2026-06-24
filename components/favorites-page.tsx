"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { Logo } from "./logo";
import { ProductGrid } from "./product-grid";
import { useCart } from "./cart-provider";

export function FavoritesPage({ products }: { products: Product[] }) {
  const {
    cart,
    cartCount,
    favorites,
    add,
    remove,
    isFavorite,
    toggleFavorite,
  } = useCart();
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <main className="favorites-page">
      <header className="favorites-header">
        <div className="shell favorites-header__inner">
          <Logo />
          <div className="header-actions">
            <Link className="icon-button header-favorites" href="/favoritos" aria-label={`${favorites.length} favoritos`}>
              <Heart size={19} fill="currentColor" />
              {favorites.length > 0 && <b>{favorites.length}</b>}
            </Link>
            <Link className="bag-button" href="/sacola" aria-label={`Sacola com ${cartCount} itens`}>
              <ShoppingBag size={19} />
              <span>Sacola</span>
              {cartCount > 0 && <b>{cartCount}</b>}
            </Link>
          </div>
        </div>
      </header>

      <section className="section shell favorites-content">
        <Link className="cart-back" href="/#menu"><ArrowLeft size={17} /> Voltar ao cardápio</Link>
        <div className="favorites-heading">
          <div>
            <p className="eyebrow">SUA SELEÇÃO</p>
            <h1>Meus favoritos</h1>
          </div>
          <p>{favoriteProducts.length} {favoriteProducts.length === 1 ? "delícia salva" : "delícias salvas"}</p>
        </div>

        {favoriteProducts.length > 0 ? (
          <ProductGrid
            products={favoriteProducts}
            quantities={cart}
            isFavorite={isFavorite}
            onAdd={add}
            onRemove={remove}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <div className="favorites-empty">
            <span><Heart size={34} /></span>
            <h2>Nenhum favorito por enquanto</h2>
            <p>Salve as delícias que você quer encontrar rapidinho depois.</p>
            <Link className="button button--primary" href="/#menu">Explorar o cardápio <ArrowRight size={18} /></Link>
          </div>
        )}
      </section>
    </main>
  );
}
