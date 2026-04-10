"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const floatingItems = [
  { emoji: "⭐", top: "10%", left: "8%", delay: 0 },
  { emoji: "🪐", top: "20%", right: "12%", delay: 0.5 },
  { emoji: "🌟", bottom: "25%", left: "15%", delay: 1 },
  { emoji: "✨", top: "15%", left: "45%", delay: 1.5 },
  { emoji: "💫", bottom: "20%", right: "10%", delay: 0.8 },
  { emoji: "⭐", bottom: "35%", left: "5%", delay: 1.2 },
  { emoji: "🌟", top: "35%", right: "5%", delay: 0.3 },
];

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center relative overflow-hidden">
      {/* Floating background elements */}
      {floatingItems.map((item, i) => (
        <span
          key={i}
          className="absolute text-3xl opacity-10 pointer-events-none animate-float"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </span>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center px-6 relative z-10"
      >
        {/* Large faded 404 behind */}
        <p className="text-8xl font-black font-heading text-primary/20 leading-none select-none">
          404
        </p>

        {/* Bear emoji */}
        <div className="text-[80px] mb-6 -mt-4 animate-bounce-subtle">🧸</div>

        {/* Title */}
        <h1 className="text-2xl font-extrabold font-heading text-dark">
          Oops! This page got lost in space
        </h1>

        {/* Description */}
        <p className="text-sm text-body mt-3">
          Don&apos;t worry, our teddy bear will guide you home!
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-block bg-primary text-white rounded-full px-7 py-3.5 font-extrabold font-heading mt-6 hover:opacity-90 transition-opacity"
        >
          🏠 Let&apos;s Go Home
        </Link>
      </motion.div>
    </div>
  );
}
