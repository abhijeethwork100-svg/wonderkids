"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const MESSAGES = [
  "\u2728 Free Shipping on Orders Over \u20B9999",
  "\uD83D\uDEE1\uFE0F 100% Safe & BIS Certified Toys",
  "\uD83D\uDE9A 2-Day Delivery Across India",
  "\u21A9\uFE0F Easy 7-Day Returns",
];

export default function PromoBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="relative h-9 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,107,107,0.85) 0%, rgba(255,230,109,0.85) 50%, rgba(78,205,196,0.85) 100%)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs font-heading font-bold text-white"
        >
          {MESSAGES[index]}
        </motion.p>
      </AnimatePresence>

      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
        aria-label="Close promo bar"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
