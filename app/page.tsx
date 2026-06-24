import { BakeryHome } from "@/components/bakery-home";
import { getProducts, getWeeklyHighlight } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, weeklyHighlight] = await Promise.all([
    getProducts(),
    getWeeklyHighlight(),
  ]);

  return <BakeryHome products={products} weeklyHighlight={weeklyHighlight} />;
}
