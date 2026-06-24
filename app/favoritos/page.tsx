import { FavoritesPage } from "@/components/favorites-page";
import { getProducts } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function FavoritosPage() {
  const products = await getProducts();
  return <FavoritesPage products={products} />;
}
