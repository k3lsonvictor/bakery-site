"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Instagram,
  Menu,
  Search,
  ShoppingBag,
  Star,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Logo } from "./logo";
import { ProductGrid } from "./product-grid";
import type { Product } from "./product-card";
import { products } from "@/lib/products";
import { useCart } from "./cart-provider";

type Category = "Todos" | Product["category"];

export function BakeryHome() {
  const [category, setCategory] = useState<Category>("Todos");
  const [query, setQuery] = useState("");
  const { cart, cartCount, add, remove } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visible = useMemo(
    () => products.filter((product) => (category === "Todos" || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase())),
    [category, query],
  );
  return (
    <main>
      <header className="site-header" id="inicio">
        <div className="announcement">Feito hoje, com tempo e bons ingredientes <span>•</span> Entregas de segunda a sábado</div>
        <div className="header-inner shell">
          <Logo />
          <nav className={mobileOpen ? "nav nav--open" : "nav"} aria-label="Menu principal">
            <a href="#menu" onClick={() => setMobileOpen(false)}>Cardápio</a>
            <a href="#destaque" onClick={() => setMobileOpen(false)}>Nossa cozinha</a>
            <a href="#encomendas" onClick={() => setMobileOpen(false)}>Encomendas</a>
            <a href="#rodape" onClick={() => setMobileOpen(false)}>Visite-nos</a>
          </nav>
          <div className="header-actions">
            <button className="icon-button desktop-action" aria-label="Minha conta"><UserRound size={19} /></button>
            <Link className="bag-button" href="/sacola" aria-label={`Sacola com ${cartCount} itens`}>
              <ShoppingBag size={19} />
              <span>Sacola</span>
              {cartCount > 0 && <b>{cartCount}</b>}
            </Link>
            <button className="icon-button menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <Image className="hero__image" src="/images/bakery-hero.png" alt="Mesa com bolo, pães e doces artesanais" fill priority sizes="100vw" />
        <div className="hero__shade" />
        <div className="hero__content shell">
          {/* <p className="eyebrow light">PADARIA ARTESANAL • DESDE 1998</p> */}
          <h1>Pequenos rituais,<br />grandes sabores.</h1>
          <p className="hero__lead">Do forno para a sua mesa. Receitas autorais, fermentação natural e ingredientes que a gente conhece pelo nome.</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#menu">Explorar cardápio <ArrowRight size={18} /></a>
            <a className="text-link light" href="#encomendas">Quero encomendar <ArrowRight size={15} /></a>
          </div>
        </div>
        <div className="hero__note">
          <Clock3 size={20} />
          <div><small>Próxima fornada</small><strong>Hoje, às 16h</strong></div>
        </div>
      </section>

      <section className="menu-section section shell" id="menu">
        <div className="section-heading">
          <div><p className="eyebrow">ESCOLHIDOS PARA VOCÊ</p><h2>Favoritos da casa</h2></div>
          <p>Uma seleção enxuta do que sai quentinho da nossa cozinha todos os dias.</p>
        </div>
        <div className="catalog-toolbar">
          <div className="categories" role="group" aria-label="Categorias">
            {(["Todos", "Bolos", "Doces", "Pães"] as Category[]).map((item) => (
              <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>
            ))}
          </div>
          <label className="search-field"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar uma delícia" /></label>
        </div>
        <ProductGrid products={visible} quantities={cart} onAdd={add} onRemove={remove} />
      </section>

      <section className="feature-section" id="destaque">
        <div className="feature shell">
          <div className="feature__copy">
            <p className="eyebrow light">DESTAQUE DA SEMANA</p>
            <h2>Chocolate que<br />fala por si.</h2>
            <div className="rating"><span>4,9</span>{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={15} fill="currentColor" />)}<small>128 avaliações</small></div>
            <p>Camadas generosas de bolo macio, ganache aveludada e chocolate 70%. Feito para dividir — se você quiser.</p>
            <div className="feature__price"><span>A partir de</span><strong>R$ 52</strong></div>
            <button className="button button--cream" onClick={() => add(1)}>Pedir agora <ArrowRight size={18} /></button>
          </div>
          <div className="feature__image"><Image src="/images/chocolate-feature.png" alt="Bolo e fatia de chocolate" fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
        </div>
      </section>

      <section className="custom-section section shell" id="encomendas">
        <div className="custom-card">
          <div className="custom-card__image"><Image src="/images/bakery-hero.png" alt="Bolo artesanal para celebração" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
          <div className="custom-card__copy">
            <p className="eyebrow">DO SEU JEITO</p>
            <h2>Um bolo só seu,<br />para um dia só seu.</h2>
            <p>Conte sua ideia. Nossa confeitaria cuida dos sabores, acabamentos e pequenos detalhes para deixar sua celebração com a sua cara.</p>
            <ul><li><span>01</span> Escolha massa e recheios</li><li><span>02</span> Conte como será a festa</li><li><span>03</span> Retire ou receba em casa</li></ul>
            <a className="button button--dark" href="mailto:encomendas@padosol.com.br">Começar minha encomenda <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="shell newsletter__inner"><div><p className="eyebrow">CARTINHAS DO FORNO</p><h2>Novidades ainda quentinhas.</h2></div><form onSubmit={(e) => e.preventDefault()}><input type="email" required placeholder="Seu melhor e-mail" aria-label="Seu e-mail" /><button aria-label="Cadastrar e-mail"><ArrowRight /></button></form></div>
      </section>

      <footer id="rodape">
        <div className="shell footer-grid"><div><Logo light /><p>Pães, doces e encontros.<br />Feitos com calma em Teresina.</p></div><div><h3>Visite a gente</h3><p>Rua da Alegria, 3055<br />Santo Antônio • Teresina, PI</p></div><div><h3>Horários</h3><p>Seg–Sáb: 5h às 21h<br />Dom: 5h às 12h</p></div><div><h3>Siga o cheiro</h3><a className="social" href="#"><Instagram size={18} /> @padariapaonosso</a></div></div>
        <div className="shell footer-bottom"><span>© 2026 Padaria Pão Nosso</span><span>Feito à mão, como nossos pães.</span></div>
      </footer>
    </main>
  );
}
