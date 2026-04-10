"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ACTIVITIES, type Activity } from "@/data/activities";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyState from "@/components/ui/EmptyState";
import ActivityCard from "@/components/play/ActivityCard";

type FilterType = "all" | Activity["type"];

const FILTERS: { value: FilterType; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "" },
  { value: "diy", label: "DIY Crafts", emoji: "\u{1F3A8}" },
  { value: "demo", label: "Toy Demos", emoji: "\u{1F3AE}" },
  { value: "printable", label: "Printables", emoji: "\u{1F5A8}\uFE0F" },
  { value: "game", label: "Mini Games", emoji: "\u{1F3AF}" },
  { value: "learning", label: "Learning", emoji: "\u{1F4DA}" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export default function PlayPageClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filtered =
    activeFilter === "all"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.type === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="py-16 text-center bg-gradient-to-b from-accent-purple/10 to-secondary/10">
        <span className="text-6xl block mb-4">{"\u{1F3AE}"}</span>
        <SectionHeader
          subtitle="Fun & Learn"
          title="The Play Zone"
          description="DIY crafts, toy demos, printables, games, and learning activities for every age"
          align="center"
        />
      </section>

      {/* Filters + Grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`rounded-full px-4 py-2 text-sm font-bold font-heading transition-colors ${
                activeFilter === f.value
                  ? "bg-primary text-white"
                  : "bg-white text-body border border-border-light hover:border-primary/40"
              }`}
            >
              {f.emoji ? `${f.emoji} ` : ""}
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <EmptyState
              icon="\u{1F50D}"
              title="No Activities Found"
              description="Try a different filter to discover more fun activities."
            />
          ) : (
            <motion.div
              key={activeFilter}
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((activity) => (
                <motion.div key={activity.id} variants={item}>
                  <ActivityCard activity={activity} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
