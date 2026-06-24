import Image from "next/image";
import { Heart, Minus, Plus } from "lucide-react";
import { currencyFormatter, type Product } from "@/lib/products";

export type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  quantity: number;
  isFavorite: boolean;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

export function ProductCard({ product, quantity, isFavorite, onAdd, onRemove, onToggleFavorite }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <Image
          src={product.imageUrl || "/images/bakery-hero.png"}
          alt={product.imageAlt || product.name}
          fill
          sizes="(max-width: 700px) 90vw, 25vw"
          style={{ objectPosition: "center" }}
        />
        <button
          className={`favorite${isFavorite ? " favorite--active" : ""}`}
          aria-label={`${isFavorite ? "Remover" : "Adicionar"} ${product.name} ${isFavorite ? "dos" : "aos"} favoritos`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(product.id)}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-card__body">
        <div className="product-card__content">
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
          <p>{product.detail}</p>
        </div>

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
