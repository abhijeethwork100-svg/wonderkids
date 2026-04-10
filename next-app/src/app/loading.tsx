import {
  Skeleton,
  ProductCardSkeleton,
  CategoryCardSkeleton,
} from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="relative">
      {/* Hero skeleton */}
      <Skeleton className="h-[60vh] w-full animate-shimmer" />

      {/* PromoTicker skeleton */}
      <Skeleton className="h-10 w-full mt-1 animate-shimmer" />

      {/* Category grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Skeleton className="h-8 w-48 mb-6 animate-shimmer" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Age strip skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Skeleton className="h-8 w-40 mb-4 animate-shimmer" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-20 w-28 rounded-2xl shrink-0 animate-shimmer"
            />
          ))}
        </div>
      </div>

      {/* Product row skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Skeleton className="h-8 w-56 mb-6 animate-shimmer" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
