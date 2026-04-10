"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { AGE_GROUPS } from "@/data/ages";
import { PRODUCTS } from "@/data/products";
import { X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

interface FiltersProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  selectedAges: string[];
  onAgesChange: (ages: string[]) => void;
  selectedBrands: string[];
  onBrandsChange: (brands: string[]) => void;
  priceMin: string;
  onPriceMinChange: (val: string) => void;
  priceMax: string;
  onPriceMaxChange: (val: string) => void;
  onClearAll: () => void;
  hideAge?: boolean;
  hideCategory?: boolean;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border-light py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-extrabold font-heading text-dark"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckboxItem({
  label,
  checked,
  onChange,
  count,
  prefix,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
  prefix?: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-border-light text-primary focus:ring-primary/30 accent-primary"
      />
      <span className="text-sm text-body group-hover:text-dark transition-colors flex-1">
        {prefix && <span className="mr-1">{prefix}</span>}
        {label}
      </span>
      {count !== undefined && (
        <span className="text-xs text-body/60">({count})</span>
      )}
    </label>
  );
}

function FilterContent({
  selectedCategories,
  onCategoriesChange,
  selectedAges,
  onAgesChange,
  selectedBrands,
  onBrandsChange,
  priceMin,
  onPriceMinChange,
  priceMax,
  onPriceMaxChange,
  onClearAll,
  hideAge,
  hideCategory,
}: FiltersProps) {
  const hasFilters =
    selectedCategories.length > 0 ||
    selectedAges.length > 0 ||
    selectedBrands.length > 0 ||
    priceMin !== "" ||
    priceMax !== "";

  const toggleItem = (
    list: string[],
    item: string,
    setter: (val: string[]) => void
  ) => {
    setter(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  const getCategoryProductCount = (catId: string) =>
    PRODUCTS.filter((p) => p.categoryId === catId).length;

  const getBrandProductCount = (brandName: string) =>
    PRODUCTS.filter(
      (p) => p.brand.toLowerCase().replace(/\s+/g, "-") === brandName
    ).length;

  return (
    <div>
      {hasFilters && (
        <button
          onClick={onClearAll}
          className="text-sm font-bold text-primary hover:underline mb-2"
        >
          Clear All
        </button>
      )}

      {!hideCategory && (
        <FilterSection title="Category">
          {CATEGORIES.map((cat) => (
            <CheckboxItem
              key={cat.id}
              label={cat.name}
              prefix={cat.icon}
              checked={selectedCategories.includes(cat.id)}
              onChange={() =>
                toggleItem(selectedCategories, cat.id, onCategoriesChange)
              }
              count={getCategoryProductCount(cat.id)}
            />
          ))}
        </FilterSection>
      )}

      {!hideAge && (
        <FilterSection title="Age Range">
          {AGE_GROUPS.map((ag) => (
            <CheckboxItem
              key={ag.id}
              label={ag.label}
              checked={selectedAges.includes(ag.id)}
              onChange={() => toggleItem(selectedAges, ag.id, onAgesChange)}
            />
          ))}
        </FilterSection>
      )}

      <FilterSection title="Brand">
        {BRANDS.map((brand) => (
          <CheckboxItem
            key={brand.id}
            label={brand.name}
            checked={selectedBrands.includes(brand.slug)}
            onChange={() =>
              toggleItem(selectedBrands, brand.slug, onBrandsChange)
            }
            count={getBrandProductCount(brand.slug)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price Range (₹)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => onPriceMinChange(e.target.value)}
            className="w-full border border-border-light rounded-lg px-3 py-2 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <span className="text-body text-sm">–</span>
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => onPriceMaxChange(e.target.value)}
            className="w-full border border-border-light rounded-lg px-3 py-2 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </FilterSection>
    </div>
  );
}

export default function Filters(props: FiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <FilterContent {...props} />
      </aside>

      {/* Mobile filter button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 bg-white border border-border-light rounded-xl px-4 py-2.5 text-sm font-bold text-dark"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      {/* Mobile slide-up sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-cream rounded-t-3xl z-50 lg:hidden max-h-[80vh] overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-extrabold font-heading text-dark">
                  Filters
                </h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-border-light flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>
              <FilterContent {...props} />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full mt-4 py-3 rounded-2xl bg-primary text-white font-extrabold font-heading text-sm"
              >
                Show Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
