import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
