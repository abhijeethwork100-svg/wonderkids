"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Activity } from "@/data/activities";

const TYPE_CONFIG = {
  diy: {
    gradient: "bg-gradient-to-br from-orange-200 to-red-200",
    emoji: "\u{1F3A8}",
    badge: "bg-orange-500",
    label: "DIY",
  },
  demo: {
    gradient: "bg-gradient-to-br from-blue-200 to-cyan-200",
    emoji: "\u{1F3AE}",
    badge: "bg-blue-500",
    label: "Demo",
  },
  printable: {
    gradient: "bg-gradient-to-br from-green-200 to-emerald-200",
    emoji: "\u{1F5A8}\uFE0F",
    badge: "bg-green-600",
    label: "Printable",
  },
  game: {
    gradient: "bg-gradient-to-br from-purple-200 to-pink-200",
    emoji: "\u{1F3AF}",
    badge: "bg-purple-500",
    label: "Game",
  },
  learning: {
    gradient: "bg-gradient-to-br from-yellow-200 to-amber-200",
    emoji: "\u{1F4DA}",
    badge: "bg-amber-500",
    label: "Learning",
  },
} as const;

const DIFFICULTY_DOTS: Record<Activity["difficulty"], string> = {
  easy: "\u25CF\u25CB\u25CB",
  medium: "\u25CF\u25CF\u25CB",
  hard: "\u25CF\u25CF\u25CF",
};

export default function ActivityCard({ activity }: { activity: Activity }) {
  const config = TYPE_CONFIG[activity.type];

  return (
    <Link href={`/play/${activity.slug}`} className="block">
      <motion.div
        whileHover={{ translateY: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="rounded-[20px] bg-white overflow-hidden border border-border-light"
      >
        {/* Image area */}
        <div className={`aspect-video relative flex items-center justify-center ${config.gradient}`}>
          <span className="text-5xl">{config.emoji}</span>

          {/* Type badge */}
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white ${config.badge}`}
          >
            {config.label}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-extrabold font-heading text-dark">
            {activity.title}
          </h3>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-2 text-xs text-body">
            <span className="bg-cream rounded-full px-2 py-0.5 font-bold">
              {activity.ageRange} yrs
            </span>
            <span title={activity.difficulty}>{DIFFICULTY_DOTS[activity.difficulty]}</span>
            <span>{activity.duration}</span>
          </div>

          <p className="text-xs text-body line-clamp-2 mt-2">
            {activity.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
