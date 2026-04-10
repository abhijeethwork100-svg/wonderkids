"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FloatingElements from "@/components/ui/FloatingElements";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const showcaseVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.3 } },
};

const stats = [
  { value: "2,000+", label: "Products" },
  { value: "13", label: "Worlds" },
  { value: "4.9\u2605", label: "Rating" },
];

const floatingLabels = [
  { text: "\uD83D\uDE80 Space Adventure", top: "8%", left: "-12%", delay: "0s" },
  { text: "\uD83C\uDF82 Birthday Planner", bottom: "12%", right: "-14%", delay: "1s" },
  { text: "\uD83C\uDFA8 Creative Art", top: "50%", left: "-16%", delay: "2s" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #FFF5F5 0%, #FFF9E6 40%, #F0FCFC 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(circle at 80% 20%, rgba(255,107,107,0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(78,205,196,0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 60%, rgba(255,230,109,0.12) 0%, transparent 50%)",
          ].join(", "),
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElements density="light" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10" style={{ minHeight: "calc(100svh - 100px)" }}>
        {/* Left column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md text-sm font-bold font-heading text-dark">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-green" />
              </span>
              {"\u2728"} India&apos;s #1 Toy Store
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading leading-tight text-dark mb-5">
            Where Every Child&apos;s{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #FF6B6B, #FF8C42)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Imagination
            </span>{" "}
            Comes Alive
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-base text-body mb-8 max-w-lg">
            Premium toys, magical birthday experiences, and curated adventures designed for kids aged 0&ndash;13. Safe, eco-friendly, and endlessly fun.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center bg-primary text-white rounded-full px-7 py-3.5 font-extrabold font-heading transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "0 4px 20px rgba(255,107,107,0.4)" }}
            >
              {"\uD83E\uDDE9"} Explore All
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center bg-white text-dark rounded-full px-7 py-3.5 font-extrabold font-heading transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            >
              {"\uD83C\uDFAF"} Find My Toy
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="flex gap-6 mt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-black text-dark">{s.value}</p>
                <p className="text-xs font-semibold text-body">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — showcase */}
        <motion.div
          variants={showcaseVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center justify-center relative"
        >
          <div
            className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-[40px] overflow-hidden flex items-center justify-center relative"
            style={{
              background: "linear-gradient(135deg, #FFD1DC 0%, #C5E8FF 50%, #D1FAE5 100%)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
            }}
          >
            <span className="text-[120px] leading-none select-none">{"\uD83E\uDDF8"}</span>
          </div>

          {/* Floating labels */}
          {floatingLabels.map((label) => (
            <span
              key={label.text}
              className="absolute hidden lg:flex bg-white rounded-xl shadow-lg px-3.5 py-2.5 text-sm font-bold font-heading text-dark animate-float"
              style={{
                top: label.top,
                left: label.left,
                right: label.right,
                bottom: label.bottom,
                animationDelay: label.delay,
              }}
            >
              {label.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
