"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/shop/${category.slug}`} className="block">
      <motion.div
        whileHover={{ translateY: -4 }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="rounded-[20px] overflow-hidden relative aspect-[4/3] md:aspect-square"
        style={{ background: category.gradient }}
      >
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <span className="text-3xl block mb-1">{category.icon}</span>
          <h3 className="text-white font-heading font-extrabold text-sm">
            {category.name}
          </h3>
          <p className="text-white/70 text-xs">
            {category.productCount} products
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
