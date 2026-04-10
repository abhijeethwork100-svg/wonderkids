"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getProductsByBrand } from "@/lib/utils";
import { PRODUCTS } from "@/data/products";
import type { Brand } from "@/lib/utils";
import ProductGrid from "@/components/shop/ProductGrid";
import SortDropdown from "@/components/shop/SortDropdown";

function sortProducts(products: typeof PRODUCTS, sortBy: string) {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
}

export default function BrandPageClient({ brand }: { brand: Brand }) {
  const [sortBy, setSortBy] = useState("featured");

  const products = useMemo(() => {
    return sortProducts(getProductsByBrand(brand.slug), sortBy);
  }, [brand.slug, sortBy]);

  return (
    <div>
      {/* Hero */}
      <div
        className="w-full h-40 flex flex-col items-center justify-center text-center px-4"
        style={{ backgroundColor: brand.color }}
      >
        <h1 className="text-3xl text-white font-extrabold font-heading">
          {brand.name}
        </h1>
        <p className="text-sm text-white/80 mt-2 max-w-md">
          {brand.description}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-body mb-6">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/brands" className="text-primary hover:underline">
            Brands
          </Link>
          <span className="mx-2">/</span>
          <span>{brand.name}</span>
        </nav>

        {/* Sort bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-body">
            Showing{" "}
            <span className="font-bold text-dark">{products.length}</span>{" "}
            products
          </p>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
