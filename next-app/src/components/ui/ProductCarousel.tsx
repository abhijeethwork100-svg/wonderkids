"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Product } from "@/lib/utils";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  seeAllLink?: string;
}

export default function ProductCarousel({
  products,
  title,
  subtitle,
  seeAllLink,
}: ProductCarouselProps) {
  return (
    <div>
      {title && (
        <div className="flex items-end justify-between px-4 mb-4">
          <SectionHeader title={title} subtitle={subtitle} />
          {seeAllLink && (
            <Link
              href={seeAllLink}
              className="text-sm font-extrabold font-heading text-primary hover:underline whitespace-nowrap ml-4"
            >
              See All &rarr;
            </Link>
          )}
        </div>
      )}

      <div
        className="flex gap-4 overflow-x-auto px-4 pb-4 hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
