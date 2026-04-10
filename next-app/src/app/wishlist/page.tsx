"use client";

import { PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyState from "@/components/ui/EmptyState";
import { Share2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, showToast } = useStore();

  const wishlistedProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("\uD83D\uDCCB Link copied!");
    } catch {
      showToast("\uD83D\uDCCB Link copied!");
    }
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <EmptyState
          icon={"\uD83D\uDC96"}
          title="Your wishlist is empty!"
          description="Save toys you love and come back to them later."
          actionLabel="Explore Toys"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader title="My Wishlist" subtitle={"Saved Items"} />
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-white border border-border-light rounded-xl px-4 py-2.5 text-sm font-bold text-dark hover:border-primary transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share Wishlist
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
