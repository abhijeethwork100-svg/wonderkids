"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background pattern — subtle dots */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[420px] md:min-h-[520px]">
        {/* Left — text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-secondary font-heading font-bold text-sm tracking-wide uppercase mb-4"
          >
            India&apos;s #1 toy store
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-extrabold text-white leading-[1.1] tracking-tight mb-5"
          >
            Where every child&apos;s imagination comes alive
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-white/80 text-base md:text-lg max-w-lg mb-8 leading-relaxed"
          >
            Premium toys, magical birthday experiences, and curated adventures
            designed for kids aged 0-13. Safe, eco-friendly, and endlessly fun.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center bg-white text-primary rounded-full px-7 py-3 font-heading font-bold text-sm hover:bg-secondary hover:text-dark transition-colors"
            >
              Shop all toys
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center bg-transparent text-white border-2 border-white/30 rounded-full px-7 py-3 font-heading font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Find the perfect gift
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mt-10">
            {[
              { label: "Free shipping", sub: "on orders \u20B9999+" },
              { label: "BIS certified", sub: "100% safe" },
              { label: "Easy returns", sub: "7-day policy" },
            ].map((item) => (
              <div key={item.label} className="text-white/90">
                <p className="text-sm font-heading font-bold">{item.label}</p>
                <p className="text-xs text-white/50">{item.sub}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-white/10">
            <Image
              src="/images/mascot/waving.png"
              alt="WonderKids mascot bear waving"
              fill
              className="object-contain p-8"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
