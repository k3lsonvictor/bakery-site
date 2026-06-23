import { ProductCard, type Product } from "./product-card";

type ProductGridProps = {
  products: Product[];
  quantities: Record<number, number>;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
};

export function ProductGrid({ products, quantities, onAdd, onRemove }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={quantities[product.id] ?? 0}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}

      {products.length === 0 && (
        <p className="empty-state">Nenhuma delícia encontrada. Tente outro sabor.</p>
      )}
    </div>
  );
}
