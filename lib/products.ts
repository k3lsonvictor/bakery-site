import type { Product } from "@/components/product-card";

export const products: Product[] = [
  { id: 1, name: "Bolo intenso", detail: "Chocolate 70%", price: 52, category: "Bolos", crop: "64% 42%", favorite: true },
  { id: 2, name: "Croissant clássico", detail: "Manteiga francesa", price: 14, category: "Pães", crop: "82% 78%" },
  { id: 3, name: "Tartelete da estação", detail: "Frutas frescas", price: 18, category: "Doces", crop: "40% 82%" },
  { id: 4, name: "Pão de fermentação", detail: "Levain • 24 horas", price: 26, category: "Pães", crop: "43% 57%" },
];

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
