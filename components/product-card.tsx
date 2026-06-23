import Image from "next/image";
import { Heart, Minus, Plus } from "lucide-react";
import { currencyFormatter } from "@/lib/products";

export type Product = {
  id: number;
  name: string;
  detail: string;
  price: number;
  category: "Bolos" | "Doces" | "Pães";
  crop: string;
  favorite?: boolean;
};

type ProductCardProps = {
  product: Product;
  quantity: number;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
};

export function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <Image
          src="/images/bakery-hero.png"
          alt={product.name}
          fill
          sizes="(max-width: 700px) 90vw, 25vw"
          style={{ objectPosition: product.crop }}
        />
        <button className="favorite" aria-label={`Adicionar ${product.name} aos favoritos`}>
          <Heart size={18} fill={product.favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-card__body">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.detail}</p>

        <div className="product-card__footer">
          <strong>{currencyFormatter.format(product.price)}</strong>
          {quantity > 0 ? (
            <div className="stepper">
              <button onClick={() => onRemove(product.id)} aria-label={`Remover ${product.name}`}>
                <Minus size={14} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => onAdd(product.id)} aria-label={`Adicionar mais um ${product.name}`}>
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button className="add-button" onClick={() => onAdd(product.id)} aria-label={`Adicionar ${product.name}`}>
              <Plus size={18} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
