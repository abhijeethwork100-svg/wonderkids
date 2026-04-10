import { getNewArrivals } from "@/lib/utils";
import ProductCarousel from "@/components/ui/ProductCarousel";

export default function NewArrivals() {
  const products = getNewArrivals();

  return (
    <section className="py-6">
      <ProductCarousel
        products={products}
        title="New Arrivals \uD83C\uDF1F"
        subtitle="Just Arrived"
        seeAllLink="/shop"
      />
    </section>
  );
}
