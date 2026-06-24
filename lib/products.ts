export type Product = {
  id: string;
  name: string;
  detail: string;
  price: number;
  category: "Bolos" | "Doces" | "Pães";
  imageUrl: string | null;
  imageAlt: string | null;
};

export type WeeklyHighlight = {
  headline: string;
  description: string;
  rating: number;
  reviewCount: number;
  imageUrl: string | null;
  imageAlt: string | null;
  product: Product;
};

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
