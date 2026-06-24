import { CartPage } from "@/components/cart-page";
import { getProducts } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function SacolaPage() {
  const products = await getProducts();
  return <CartPage products={products} />;
}
