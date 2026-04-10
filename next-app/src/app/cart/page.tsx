"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import EmptyState from "@/components/ui/EmptyState";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CartPage() {
  const { cart, removeFromCart, updateQty, getCartTotal, getCartCount, showToast } = useStore();
  const [couponCode, setCouponCode] = useState("");

  const cartCount = getCartCount();
  const subtotal = getCartTotal();
  const delivery = subtotal >= 999 ? 0 : 49;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <EmptyState
          icon={"\uD83D\uDED2"}
          title="Your cart is empty!"
          description="Looks like you haven&apos;t added any toys yet."
          actionLabel="Start Shopping"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ---- Left column: Cart items ---- */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-extrabold font-heading text-dark mb-6">
              Shopping Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
            </h1>

            <AnimatePresence mode="popLayout">
              {cart.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId);
                if (!product) return null;
                const category = CATEGORIES.find((c) => c.id === product.categoryId);

                return (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, x: -200, height: 0, marginBottom: 0, padding: 0, overflow: "hidden" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-[20px] p-4 border border-border-light mb-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <CartItemImage product={product} category={category} />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-extrabold font-heading text-dark truncate">
                          {product.name}
                        </h3>
                        {category && (
                          <span className="text-xs text-primary font-bold">{category.name}</span>
                        )}
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQty(item.productId, item.qty - 1)}
                          className="w-8 h-8 rounded-lg border border-border-light flex items-center justify-center hover:border-primary transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-dark" />
                        </button>
                        <span className="w-8 text-center text-sm font-extrabold font-heading text-dark">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.qty + 1)}
                          className="w-8 h-8 rounded-lg border border-border-light flex items-center justify-center hover:border-primary transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-dark" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-lg font-black font-heading text-dark min-w-[80px] text-right">
                        {formatPrice(product.price * item.qty)}
                      </span>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-body hover:text-red-500 transition-colors ml-1"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ---- Right column: Order summary ---- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-[20px] p-6 border border-border-light">
                <h2 className="text-lg font-extrabold font-heading text-dark mb-4">
                  Order Summary
                </h2>

                <div className="flex justify-between text-sm mb-2">
                  <span className="text-body">Subtotal</span>
                  <span className="font-bold text-dark">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm mb-4">
                  <span className="text-body">Delivery</span>
                  <span className="font-bold text-dark">
                    {delivery === 0 ? (
                      <span className="text-accent-green">FREE</span>
                    ) : (
                      `\u20B9${delivery}`
                    )}
                  </span>
                </div>

                <div className="border-t border-border-light my-4" />

                <div className="flex justify-between mb-6">
                  <span className="text-sm font-bold text-dark">Total</span>
                  <span className="text-xl font-black font-heading text-dark">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Coupon */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 border border-border-light rounded-xl px-4 py-2.5 text-sm text-dark placeholder:text-body/50 focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => showToast("\uD83C\uDF89 Coupon applied!")}
                    className="bg-dark text-white rounded-xl px-4 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity"
                  >
                    Apply
                  </button>
                </div>

                {/* Checkout */}
                <button
                  onClick={() => showToast("\uD83D\uDED2 Checkout coming soon!")}
                  className="w-full py-4 rounded-2xl bg-primary text-white font-extrabold font-heading text-lg hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/shop"
                  className="block text-center text-primary text-sm font-bold mt-4 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cart item image (handles error state)                              */
/* ------------------------------------------------------------------ */

function CartItemImage({
  product,
  category,
}: {
  product: { image: string; name: string };
  category?: { gradient?: string; icon?: string };
}) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl shrink-0"
        style={{ background: category?.gradient ?? "linear-gradient(135deg, #ccc, #eee)" }}
      >
        {category?.icon ?? "\uD83E\uDDF8"}
      </div>
    );
  }

  return (
    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 relative shrink-0">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover"
        sizes="80px"
        onError={() => setImgError(true)}
      />
    </div>
  );
}
