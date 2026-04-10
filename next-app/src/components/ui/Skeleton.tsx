import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Generic Skeleton                                                   */
/* ------------------------------------------------------------------ */

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("bg-gray-200 rounded", className)}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  ProductCard Skeleton                                                */
/* ------------------------------------------------------------------ */

export function ProductCardSkeleton() {
  return (
    <div
      className="rounded-[20px] overflow-hidden bg-white min-w-[200px] max-w-[260px]"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
    >
      {/* Image placeholder */}
      <Skeleton className="aspect-square w-full animate-shimmer" />

      {/* Info area */}
      <div className="p-3 pb-4 space-y-2">
        <Skeleton className="h-3 w-16 animate-shimmer" />
        <Skeleton className="h-4 w-full animate-shimmer" />
        <Skeleton className="h-3 w-24 animate-shimmer" />
        <Skeleton className="h-4 w-20 animate-shimmer" />
        <Skeleton className="h-10 w-full rounded-xl animate-shimmer" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CategoryCard Skeleton                                              */
/* ------------------------------------------------------------------ */

export function CategoryCardSkeleton() {
  return (
    <div className="rounded-[20px] overflow-hidden aspect-[4/3] md:aspect-square">
      <Skeleton className="w-full h-full animate-shimmer" />
    </div>
  );
}
