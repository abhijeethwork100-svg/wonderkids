"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Search } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { formatPrice } from "@/lib/utils";

interface SearchOverlayProps {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const q = query.toLowerCase().trim();
  const results = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const displayed = results.slice(0, 6);
  const hasMore = results.length > 6;

  const getCategoryName = (catId: string) => {
    return CATEGORIES.find((c) => c.id === catId)?.name ?? catId;
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-3xl mx-auto px-4 py-4">
          {/* Input row */}
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-body shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search toys, categories, brands..."
              className="flex-1 bg-transparent text-lg font-heading text-dark placeholder:text-body/50 outline-none"
            />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
              aria-label="Close search"
            >
              <X className="w-4 h-4 text-body" />
            </button>
          </div>

          {/* Results */}
          {q === "" && (
            <p className="text-sm text-body mt-4">
              Start typing to search...
            </p>
          )}

          {q !== "" && results.length === 0 && (
            <p className="text-sm text-body mt-4">
              No results found for &ldquo;{query}&rdquo;
            </p>
          )}

          {displayed.length > 0 && (
            <div className="mt-4 flex flex-col gap-1">
              {displayed.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-sm text-dark truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-body">
                      {getCategoryName(product.categoryId)}
                    </p>
                  </div>
                  <p className="font-heading font-bold text-sm text-primary shrink-0">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              ))}

              {hasMore && (
                <Link
                  href={`/shop?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="text-center text-sm font-heading font-bold text-primary py-2 hover:underline"
                >
                  See all {results.length} results
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
