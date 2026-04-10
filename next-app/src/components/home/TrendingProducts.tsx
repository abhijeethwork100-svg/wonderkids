import { getTrendingProducts } from "@/lib/utils";
import ProductCarousel from "@/components/ui/ProductCarousel";

export default function TrendingProducts() {
  const products = getTrendingProducts();

  return (
    <section className="py-6">
      <ProductCarousel
        products={products}
        title="Kids Are Loving"
        subtitle="Trending Now"
        seeAllLink="/shop"
      />
    </section>
  );
}
