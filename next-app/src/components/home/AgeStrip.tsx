"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AGE_GROUPS } from "@/data/ages";
import SectionHeader from "@/components/ui/SectionHeader";

const AGE_EMOJIS: Record<string, string> = {
  "0-2": "\uD83D\uDC76",
  "3-5": "\uD83E\uDDD2",
  "6-8": "\uD83E\uDDD1",
  "9-12": "\uD83E\uDDD1\u200D\uD83D\uDD27",
  "13-plus": "\uD83E\uDDD1\u200D\uD83C\uDF93",
};

export default function AgeStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <SectionHeader subtitle="Perfect Match" title="Shop by Age" align="center" />
      </div>

      <div className="flex gap-4 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center pb-4 hide-scrollbar">
        {AGE_GROUPS.map((age, i) => (
          <motion.div
            key={age.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Link
              href={`/age/${age.slug}`}
              className="block rounded-[20px] p-6 min-w-[160px] bg-white border border-border-light transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary"
            >
              {/* Colored accent bar */}
              <div
                className="h-1 w-12 rounded-full mb-4"
                style={{ backgroundColor: age.color }}
              />
              {/* Emoji */}
              <span className="text-3xl block mb-2">{AGE_EMOJIS[age.id] ?? "\uD83E\uDDD2"}</span>
              {/* Age range */}
              <p className="text-lg font-black font-heading text-dark">{age.label}</p>
              {/* Subtitle */}
              <p className="text-xs text-body font-semibold">{age.subtitle}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
