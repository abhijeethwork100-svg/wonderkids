"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { getProductsByCategory } from "@/lib/utils";
import type { Category } from "@/lib/utils";
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

export default function CategoryPageClient({
  category,
}: {
  category: Category;
}) {
  const [sortBy, setSortBy] = useState("featured");
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    null
  );

  const products = useMemo(() => {
    let result = getProductsByCategory(category.id);
    if (activeSubcategory) {
      result = result.filter((p) =>
        p.tags.some(
          (t) => t.toLowerCase() === activeSubcategory.toLowerCase()
        )
      );
    }
    return sortProducts(result, sortBy);
  }, [category.id, sortBy, activeSubcategory]);

  return (
    <div>
      {/* Hero */}
      <div
        className="w-full h-48 md:h-64 flex flex-col items-center justify-center text-center px-4 relative"
        style={{ background: category.gradient }}
      >
        <span className="text-5xl mb-2">{category.icon}</span>
        <h1 className="text-3xl font-extrabold text-white font-heading">
          {category.name}
        </h1>
        <nav className="text-sm text-white/80 mt-2">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-white">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{category.name}</span>
        </nav>
        <p className="text-sm text-white/70 mt-1">
          {products.length} products
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Subcategory pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-6">
          <button
            onClick={() => setActiveSubcategory(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              activeSubcategory === null
                ? "bg-primary text-white"
                : "bg-white border border-border-light text-body hover:border-primary"
            }`}
          >
            All
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() =>
                setActiveSubcategory(activeSubcategory === sub ? null : sub)
              }
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                activeSubcategory === sub
                  ? "bg-primary text-white"
                  : "bg-white border border-border-light text-body hover:border-primary"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

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
