"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import type { Product } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No products found"
        description="No products match your filters. Try adjusting your criteria."
        actionLabel="Browse All Toys"
        actionHref="/shop"
      />
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="flex justify-center"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
