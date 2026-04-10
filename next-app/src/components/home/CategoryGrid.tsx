"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";
import SectionHeader from "@/components/ui/SectionHeader";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <SectionHeader
          subtitle="Explore Worlds"
          title="13 Magical Categories"
          description="Each world is a unique adventure \u2014 tap to explore"
          align="center"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 md:gap-5"
      >
        {CATEGORIES.map((cat) => (
          <motion.div key={cat.id} variants={itemVariants}>
            <CategoryCard category={cat} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
