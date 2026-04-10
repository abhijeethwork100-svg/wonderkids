"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const TRUST_CARDS = [
  {
    icon: "\uD83D\uDEE1\uFE0F",
    title: "100% Safe",
    desc: "All toys are BIS & EN71 certified for complete peace of mind.",
    bg: "#FFF0F0",
  },
  {
    icon: "\uD83C\uDF3F",
    title: "Eco-Friendly",
    desc: "Sustainably sourced materials that are gentle on the planet.",
    bg: "#F0FFF4",
  },
  {
    icon: "\uD83E\uDDE0",
    title: "Learning Through Play",
    desc: "Every product sparks creativity, curiosity, and growth.",
    bg: "#FFF9E6",
  },
  {
    icon: "\uD83D\uDE9A",
    title: "Fast Delivery",
    desc: "2-day delivery across India with real-time tracking.",
    bg: "#F0F8FF",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export default function TrustSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <SectionHeader subtitle="Our Promise" title="Why Parents Trust Us" align="center" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {TRUST_CARDS.map((card) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{ translateY: -4 }}
            className="bg-white rounded-[20px] p-6 text-center border border-border-light transition-shadow"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
          >
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
              style={{ backgroundColor: card.bg }}
            >
              {card.icon}
            </div>
            <h4 className="text-sm font-extrabold font-heading text-dark mb-1">{card.title}</h4>
            <p className="text-xs text-body leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
