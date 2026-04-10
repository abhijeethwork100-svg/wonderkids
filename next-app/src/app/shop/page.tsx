"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { AGE_GROUPS } from "@/data/ages";
import SectionHeader from "@/components/ui/SectionHeader";
import Filters from "@/components/shop/Filters";
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

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categoryId));
    }

    if (selectedAges.length > 0) {
      result = result.filter((p) => {
        const [pMin, pMax] = p.ageRange.split("-").map(Number);
        return selectedAges.some((ageId) => {
          const ageGroup = AGE_GROUPS.find((a) => a.id === ageId);
          if (!ageGroup) return false;
          return pMin <= ageGroup.ageMax && pMax >= ageGroup.ageMin;
        });
      });
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
  }, [selectedCategories, selectedAges, selectedBrands, priceMin, priceMax, sortBy]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedAges([]);
    setSelectedBrands([]);
    setPriceMin("");
    setPriceMax("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-body mb-6">
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Shop</span>
      </nav>

      <SectionHeader title="All Toys" subtitle="Shop" />

      <div className="flex gap-8 mt-8">
        {/* Sidebar */}
        <Filters
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          selectedAges={selectedAges}
          onAgesChange={setSelectedAges}
          selectedBrands={selectedBrands}
          onBrandsChange={setSelectedBrands}
          priceMin={priceMin}
          onPriceMinChange={setPriceMin}
          priceMax={priceMax}
          onPriceMaxChange={setPriceMax}
          onClearAll={clearAll}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
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
  );
}
