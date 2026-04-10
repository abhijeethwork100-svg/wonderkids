"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import { useStore } from "@/context/StoreContext";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [imgError, setImgError] = useState(false);

  const category = CATEGORIES.find((c) => c.id === product.categoryId);
  const wishlisted = isWishlisted(product.id);

  const handleCardClick = () => {
    if (onClick) onClick(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const card = (
    <motion.div
      whileHover={{ translateY: -6, scale: 1.02, boxShadow: "0 16px 48px rgba(0,0,0,0.14)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="cursor-pointer rounded-[20px] overflow-hidden bg-white min-w-[200px] max-w-[260px]"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
    >
      {/* Image area */}
      <div className="aspect-square overflow-hidden relative">
        {imgError ? (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ background: category?.gradient ?? "linear-gradient(135deg, #ccc, #eee)" }}
          >
            {category?.icon ?? "🧸"}
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 260px"
            onError={() => setImgError(true)}
          />
        )}

        {/* Wishlist button */}
        <motion.button
          whileTap={{ scale: 0.75 }}
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm z-10"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlisted ? "❤️" : "🤍"}
        </motion.button>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-accent-yellow text-dark text-[0.7rem] font-extrabold font-heading px-2.5 py-0.5 rounded-full animate-bounce-subtle z-10">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info area */}
      <div className="p-3 pb-4">
        {/* Category tag */}
        {category && (
          <p className="text-[0.68rem] font-bold uppercase tracking-wider text-primary mb-1">
            {category.name}
          </p>
        )}

        {/* Product name */}
        <h3 className="text-[0.88rem] font-extrabold font-heading text-dark leading-tight mb-1.5">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-[0.68rem]">
            {"⭐".repeat(Math.round(product.rating))}
          </span>
          <span className="text-body text-[0.68rem]">({product.reviewCount})</span>
        </div>

        {/* Price row */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-base font-black font-heading text-dark">
            {formatPrice(product.price)}
          </span>
          {product.discount > 0 && (
            <>
              <span className="line-through text-body text-[0.78rem]">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-accent-green text-xs font-bold">
                {product.discount}% off
              </span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2.5 rounded-xl text-[0.82rem] font-extrabold font-heading bg-primary text-white hover:opacity-90 transition-opacity"
        >
          Add to Cart 🛒
        </button>
      </div>
    </motion.div>
  );

  if (onClick) {
    return <div onClick={handleCardClick}>{card}</div>;
  }

  return (
    <Link href={`/shop/product/${product.slug}`} className="block">
      {card}
    </Link>
  );
}
