"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, Clock3, CreditCard, MapPin,
  Minus, Plus, QrCode, ShieldCheck, ShoppingBag, Trash2,
} from "lucide-react";
import { useState } from "react";
import { products, currencyFormatter } from "@/lib/products";
import { useCart } from "./cart-provider";
import { Logo } from "./logo";

type Fulfillment = "delivery" | "pickup";
type Payment = "card" | "pix";
type CheckoutStep = 1 | 2 | 3;

const stepLabels = ["Sacola", "Dados", "Pagamento"];

export function CartPage() {
  const { cart, cartCount, add, remove, removeItem } = useCart();
  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");
  const [payment, setPayment] = useState<Payment>("card");
  const [step, setStep] = useState<CheckoutStep>(1);
  const [coupon, setCoupon] = useState("");
  const [completed, setCompleted] = useState(false);

  const items = products.filter((product) => cart[product.id] > 0);
  const subtotal = items.reduce((total, product) => total + product.price * cart[product.id], 0);
  const deliveryFee = fulfillment === "delivery" && subtotal > 0 ? 8 : 0;
  const total = subtotal + deliveryFee;

  const nextStep = () => {
    if (step < 3) {
      setStep((step + 1) as CheckoutStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCompleted(true);
    }
  };

  const previousStep = () => {
    setStep((step - 1) as CheckoutStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="cart-page">
      <header className="cart-header">
        <div className="shell cart-header__inner">
          <Logo />
          <div className="checkout-steps" aria-label="Etapas do pedido">
            {stepLabels.map((label, index) => {
              const number = (index + 1) as CheckoutStep;
              return (
                <div className="checkout-step-wrapper" key={label}>
                  {index > 0 && <i className={step >= number ? "complete" : ""} />}
                  <button className={step === number ? "active" : step > number ? "complete" : ""} onClick={() => number <= step && setStep(number)}>
                    <b>{step > number ? <Check size={13} /> : number}</b>{label}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="cart-security"><ShieldCheck size={18} /> Compra segura</div>
        </div>
      </header>

      <div className="shell cart-layout">
        <section className="cart-content">
          {step === 1 && (
            <>
              <Link className="cart-back" href="/#menu"><ArrowLeft size={17} /> Continuar comprando</Link>
              <div className="cart-title">
                <div><p className="eyebrow">SEU PEDIDO</p><h1>Minha sacola</h1></div>
                <span>{cartCount} {cartCount === 1 ? "item" : "itens"}</span>
              </div>

              {items.length > 0 ? (
                <div className="cart-items">
                  {items.map((product) => (
                    <article className="cart-item" key={product.id}>
                      <div className="cart-item__image"><Image src="/images/bakery-hero.png" alt={product.name} fill sizes="130px" style={{ objectPosition: product.crop }} /></div>
                      <div className="cart-item__info">
                        <small>{product.category}</small><h2>{product.name}</h2><p>{product.detail}</p>
                        <button className="remove-item" onClick={() => removeItem(product.id)}><Trash2 size={14} /> Remover</button>
                      </div>
                      <div className="cart-item__actions">
                        <strong>{currencyFormatter.format(product.price * cart[product.id])}</strong>
                        <div className="cart-quantity">
                          <button onClick={() => remove(product.id)} aria-label={`Remover um ${product.name}`}><Minus size={15} /></button>
                          <span>{cart[product.id]}</span>
                          <button onClick={() => add(product.id)} aria-label={`Adicionar um ${product.name}`}><Plus size={15} /></button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="cart-empty">
                  <span><ShoppingBag size={34} /></span><h2>Sua sacola está vazia</h2><p>Parece que nenhuma delícia entrou aqui ainda.</p>
                  <Link className="button button--primary" href="/#menu">Conhecer o cardápio <ArrowRight size={18} /></Link>
                </div>
              )}

              {items.length > 0 && (
                <div className="fulfillment">
                  <div className="fulfillment__heading"><p className="eyebrow">COMO VOCÊ PREFERE?</p><h2>Receber o pedido</h2></div>
                  <div className="fulfillment__options">
                    <button className={fulfillment === "delivery" ? "active" : ""} onClick={() => setFulfillment("delivery")}>
                      <MapPin size={21} /><span><strong>Entrega</strong><small>Receba no seu endereço</small></span>{fulfillment === "delivery" && <Check size={17} />}
                    </button>
                    <button className={fulfillment === "pickup" ? "active" : ""} onClick={() => setFulfillment("pickup")}>
                      <Clock3 size={21} /><span><strong>Retirada</strong><small>Pronto em até 45 minutos</small></span>{fulfillment === "pickup" && <Check size={17} />}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); nextStep(); }}>
              <button type="button" className="cart-back" onClick={previousStep}><ArrowLeft size={17} /> Voltar para a sacola</button>
              <div className="checkout-form__title"><p className="eyebrow">QUASE LÁ</p><h1>Seus dados</h1><p>Precisamos de algumas informações para preparar seu pedido.</p></div>
              <fieldset>
                <legend>Dados pessoais</legend>
                <div className="form-grid">
                  <label className="full"><span>Nome completo</span><input required placeholder="Como podemos chamar você?" /></label>
                  <label><span>Telefone</span><input required type="tel" placeholder="(85) 99999-9999" /></label>
                  <label><span>E-mail</span><input required type="email" placeholder="voce@email.com" /></label>
                </div>
              </fieldset>
              {fulfillment === "delivery" ? (
                <fieldset>
                  <legend>Endereço de entrega</legend>
                  <div className="form-grid">
                    <label><span>CEP</span><input required placeholder="00000-000" /></label>
                    <label><span>Número</span><input required placeholder="123" /></label>
                    <label className="full"><span>Rua</span><input required placeholder="Rua, avenida..." /></label>
                    <label><span>Bairro</span><input required placeholder="Seu bairro" /></label>
                    <label><span>Complemento</span><input placeholder="Apto, bloco..." /></label>
                  </div>
                </fieldset>
              ) : (
                <div className="pickup-notice"><MapPin size={22} /><div><strong>Retirada na Pá do Sol</strong><p>Rua das Flores, 180 • Aldeota, Fortaleza</p></div></div>
              )}
              <label className="order-note"><span>Observações do pedido <small>(opcional)</small></span><textarea placeholder="Alguma preferência ou informação importante?" /></label>
              <button className="button button--primary form-next" type="submit">Ir para pagamento <ArrowRight size={18} /></button>
            </form>
          )}

          {step === 3 && !completed && (
            <div className="checkout-form payment-form">
              <button type="button" className="cart-back" onClick={previousStep}><ArrowLeft size={17} /> Voltar para os dados</button>
              <div className="checkout-form__title"><p className="eyebrow">ÚLTIMA ETAPA</p><h1>Pagamento</h1><p>Escolha como prefere pagar seu pedido.</p></div>
              <div className="payment-options">
                <button className={payment === "card" ? "active" : ""} onClick={() => setPayment("card")}><CreditCard /><span><strong>Cartão de crédito</strong><small>Pagamento seguro e imediato</small></span>{payment === "card" && <Check size={17} />}</button>
                <button className={payment === "pix" ? "active" : ""} onClick={() => setPayment("pix")}><QrCode /><span><strong>Pix</strong><small>Aprovação em poucos segundos</small></span>{payment === "pix" && <Check size={17} />}</button>
              </div>
              {payment === "card" ? (
                <div className="card-fields form-grid">
                  <label className="full"><span>Número do cartão</span><input placeholder="0000 0000 0000 0000" /></label>
                  <label className="full"><span>Nome impresso</span><input placeholder="NOME COMO NO CARTÃO" /></label>
                  <label><span>Validade</span><input placeholder="MM/AA" /></label>
                  <label><span>CVV</span><input placeholder="123" /></label>
                </div>
              ) : (
                <div className="pix-notice"><QrCode size={30} /><div><strong>O QR Code será gerado depois da confirmação</strong><p>Você terá 15 minutos para concluir o pagamento.</p></div></div>
              )}
              <button className="button button--primary form-next" onClick={nextStep}>Confirmar pedido • {currencyFormatter.format(total)} <ArrowRight size={18} /></button>
            </div>
          )}

          {step === 3 && completed && (
            <div className="checkout-success">
              <span><CheckCircle2 size={42} /></span><p className="eyebrow">PEDIDO RECEBIDO</p><h1>Agora é com a gente!</h1>
              <p>Seu pedido mockado <strong>#PN-1048</strong> foi confirmado. Em breve você receberia os detalhes pelo WhatsApp.</p>
              <Link className="button button--dark" href="/">Voltar para o início</Link>
            </div>
          )}
        </section>

        <aside className="order-summary">
          <p className="eyebrow">RESUMO</p><h2>Seu pedido</h2>
          <div className="summary-products">{items.map((product) => <p key={product.id}><span><b>{cart[product.id]}×</b> {product.name}</span><strong>{currencyFormatter.format(product.price * cart[product.id])}</strong></p>)}</div>
          <div className="summary-lines"><p><span>Subtotal</span><strong>{currencyFormatter.format(subtotal)}</strong></p><p><span>{fulfillment === "delivery" ? "Entrega" : "Retirada"}</span><strong>{deliveryFee ? currencyFormatter.format(deliveryFee) : "Grátis"}</strong></p></div>
          {step === 1 && <label className="coupon-field"><span>Cupom de desconto</span><div><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Digite seu cupom" /><button>Aplicar</button></div></label>}
          <div className="summary-total"><span>Total</span><strong>{currencyFormatter.format(total)}</strong></div>
          {step === 1 && <button className="button button--primary checkout-button" disabled={!items.length} onClick={nextStep}>Continuar pedido <ArrowRight size={18} /></button>}
          <p className="summary-note"><ShieldCheck size={15} /> Ambiente seguro e dados protegidos</p>
          <div className="summary-help"><strong>Precisa de ajuda?</strong><span>Fale com a gente: (85) 99999-1234</span></div>
        </aside>
      </div>
    </main>
  );
}
