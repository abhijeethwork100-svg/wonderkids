"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Heart, Baby, Truck, Check } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice, getProductsByCategory } from "@/lib/utils";
import { BRANDS } from "@/data/brands";
import type { Product, Category } from "@/lib/utils";
import ProductCarousel from "@/components/ui/ProductCarousel";
import SectionHeader from "@/components/ui/SectionHeader";

const TABS = ["Why Kids Love This", "Benefits", "Safety"] as const;
type TabKey = (typeof TABS)[number];

export default function ProductDetailClient({
  product,
  category,
}: {
  product: Product;
  category: Category | null;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("Why Kids Love This");
  const [imgError, setImgError] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const brand = BRANDS.find(
    (b) => b.slug === product.brand.toLowerCase().replace(/\s+/g, "-")
  );

  const tabContent: Record<TabKey, string[]> = {
    "Why Kids Love This": product.highlights,
    Benefits: product.benefits,
    Safety: product.safety,
  };

  const relatedProducts = category
    ? getProductsByCategory(category.id)
        .filter((p) => p.id !== product.id)
        .slice(0, 8)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-body mb-6">
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="text-primary hover:underline">
          Shop
        </Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/shop/${category.slug}`}
              className="text-primary hover:underline"
            >
              {category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left — Image */}
        <div>
          <div className="aspect-square rounded-[24px] overflow-hidden bg-gray-100 relative">
            {imgError ? (
              <div
                className="w-full h-full flex items-center justify-center text-6xl"
                style={{
                  background:
                    category?.gradient ??
                    "linear-gradient(135deg, #ccc, #eee)",
                }}
              >
                ☁️
              </div>
            ) : (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onError={() => setImgError(true)}
              />
            )}
          </div>
          {/* Thumbnail placeholders */}
          <div className="flex gap-2 mt-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${
                  i === 0 ? "border-primary" : "border-border-light"
                } bg-gray-100 relative`}
              >
                {i === 0 && !imgError ? (
                  <Image
                    src={product.image}
                    alt={`${product.name} thumbnail`}
                    fill
                    className="object-cover"
                    sizes="64px"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-lg"
                    style={{
                      background:
                        category?.gradient ??
                        "linear-gradient(135deg, #eee, #ddd)",
                    }}
                  >
                    {category?.icon ?? "🧸"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Product Info */}
        <div>
          {/* Brand */}
          {brand && (
            <p className="text-xs uppercase tracking-wider text-primary font-bold mb-1">
              {brand.name}
            </p>
          )}

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-dark mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">
              {"⭐".repeat(Math.round(product.rating))}
            </span>
            <span className="text-sm text-body">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-black font-heading text-dark">
              {formatPrice(product.price)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-lg line-through text-body">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="bg-accent-green/20 text-accent-green rounded-full px-3 py-1 text-sm font-bold">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-body leading-relaxed mt-4 mb-6">
            {product.description}
          </p>

          {/* Age range */}
          <div className="flex items-center gap-2 mb-6">
            <Baby size={16} className="text-primary" />
            <span className="text-sm font-bold text-dark">
              Ages {product.ageRange}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-bold text-dark">Quantity:</span>
            <div className="flex items-center gap-0 border border-border-light rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 h-10 flex items-center justify-center text-sm font-bold text-dark border-x border-border-light">
                {qty}
              </span>
              <button
                onClick={() => setQty(Math.min(10, qty + 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              for (let i = 0; i < qty; i++) addToCart(product.id);
            }}
            className="w-full py-4 rounded-2xl bg-primary text-white text-lg font-extrabold font-heading hover:opacity-90 transition-opacity mb-3"
          >
            Add to Cart
          </motion.button>

          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`w-full py-3 rounded-2xl border-2 font-bold flex items-center justify-center gap-2 transition-colors ${
              wishlisted
                ? "border-primary bg-primary/5 text-primary"
                : "border-border-light text-dark hover:border-primary"
            }`}
          >
            <Heart
              size={18}
              fill={wishlisted ? "currentColor" : "none"}
            />
            {wishlisted ? "Added to Wishlist" : "Add to Wishlist"}
          </button>

          {/* Delivery info */}
          <div className="flex items-center gap-2 mt-4 text-sm text-body">
            <Truck size={16} className="text-primary" />
            Free delivery on orders above ₹999
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-6 border-b border-border-light">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-body hover:text-dark"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="py-6"
          >
            <ul className="space-y-3">
              {tabContent[activeTab].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-body">
                  <Check
                    size={16}
                    className="text-accent-green mt-0.5 flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <ProductCarousel
            products={relatedProducts}
            title="You May Also Like"
            subtitle="Related"
          />
        </div>
      )}
    </div>
  );
}
