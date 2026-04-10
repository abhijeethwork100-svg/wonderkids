"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getProductsByAge } from "@/lib/utils";
import { PRODUCTS } from "@/data/products";
import type { AgeGroup } from "@/lib/utils";
import Filters from "@/components/shop/Filters";
import ProductGrid from "@/components/shop/ProductGrid";
import SortDropdown from "@/components/shop/SortDropdown";

const AGE_EMOJIS: Record<string, string> = {
  "tiny-explorers": "👶",
  "little-adventurers": "🧒",
  "big-dreamers": "🧑",
  "super-builders": "🔧",
  "teen-creators": "🎓",
};

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

export default function AgeGroupPageClient({
  ageGroup,
}: {
  ageGroup: AgeGroup;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = getProductsByAge(ageGroup.ageMin, ageGroup.ageMax);

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categoryId));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.includes(p.brand.toLowerCase().replace(/\s+/g, "-"))
      );
    }

    if (priceMin !== "") {
      const min = Number(priceMin);
      if (!isNaN(min)) result = result.filter((p) => p.price >= min);
    }

    if (priceMax !== "") {
      const max = Number(priceMax);
      if (!isNaN(max)) result = result.filter((p) => p.price <= max);
    }

    return sortProducts(result, sortBy);
  }, [ageGroup, selectedCategories, selectedBrands, priceMin, priceMax, sortBy]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceMin("");
    setPriceMax("");
  };

  const emoji = AGE_EMOJIS[ageGroup.slug] ?? "🧒";

  return (
    <div>
      {/* Hero */}
      <div
        className="w-full h-48 md:h-64 flex flex-col items-center justify-center text-center px-4"
        style={{ background: ageGroup.color }}
      >
        <span className="text-5xl mb-2">{emoji}</span>
        <h1 className="text-3xl font-extrabold text-white font-heading">
          {ageGroup.label}
        </h1>
        <p className="text-lg text-white/90 font-heading font-bold">
          {ageGroup.subtitle}
        </p>
        <p className="text-sm text-white/70 mt-2 max-w-md">
          {ageGroup.description}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-body mb-6">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-body">Shop by Age</span>
          <span className="mx-2">/</span>
          <span>{ageGroup.label}</span>
        </nav>

        <div className="flex gap-8">
          <Filters
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            selectedAges={[]}
            onAgesChange={() => {}}
            selectedBrands={selectedBrands}
            onBrandsChange={setSelectedBrands}
            priceMin={priceMin}
            onPriceMinChange={setPriceMin}
            priceMax={priceMax}
            onPriceMaxChange={setPriceMax}
            onClearAll={clearAll}
            hideAge
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <p className="text-sm text-body">
                Showing{" "}
                <span className="font-bold text-dark">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
