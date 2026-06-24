import { ProductCard, type Product } from "./product-card";

type ProductGridProps = {
  products: Product[];
  quantities: Record<number, number>;
  isFavorite: (id: number) => boolean;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  onToggleFavorite: (id: number) => void;
};

export function ProductGrid({ products, quantities, isFavorite, onAdd, onRemove, onToggleFavorite }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={quantities[product.id] ?? 0}
          isFavorite={isFavorite(product.id)}
          onAdd={onAdd}
          onRemove={onRemove}
          onToggleFavorite={onToggleFavorite}
        />
      ))}

      {products.length === 0 && (
        <p className="empty-state">Nenhuma delícia encontrada. Tente outro sabor.</p>
      )}
    </div>
  );
}
