"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Activity } from "@/data/activities";
import ActivityCard from "@/components/play/ActivityCard";

const TYPE_CONFIG = {
  diy: {
    gradient: "bg-gradient-to-br from-orange-200 to-red-200",
    emoji: "\u{1F3A8}",
    badge: "bg-orange-500",
    label: "DIY Craft",
  },
  demo: {
    gradient: "bg-gradient-to-br from-blue-200 to-cyan-200",
    emoji: "\u{1F3AE}",
    badge: "bg-blue-500",
    label: "Toy Demo",
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
    label: "Mini Game",
  },
  learning: {
    gradient: "bg-gradient-to-br from-yellow-200 to-amber-200",
    emoji: "\u{1F4DA}",
    badge: "bg-amber-500",
    label: "Learning",
  },
} as const;

const DIFFICULTY_DOTS: Record<Activity["difficulty"], string> = {
  easy: "\u25CF\u25CB\u25CB Easy",
  medium: "\u25CF\u25CF\u25CB Medium",
  hard: "\u25CF\u25CF\u25CF Hard",
};

const PLACEHOLDER_MATERIALS = [
  "Safety scissors",
  "Washable glue stick",
  "Coloured paper (assorted)",
  "Markers or crayons",
  "Old newspaper (for covering surfaces)",
  "Stickers and decorations (optional)",
];

const PLACEHOLDER_STEPS = [
  "Gather all your materials and lay down newspaper to protect your workspace.",
  "Follow the template outline to cut out the main shapes from coloured paper.",
  "Carefully glue the pieces together, letting each layer dry for a minute.",
  "Add details with markers, crayons, or stickers to make it uniquely yours.",
  "Let everything dry completely before displaying your masterpiece!",
];

export default function ActivityDetailClient({
  activity,
  related,
}: {
  activity: Activity;
  related: Activity[];
}) {
  const config = TYPE_CONFIG[activity.type];

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 pb-2 text-xs text-body">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/play" className="hover:text-primary">
          Play
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-dark font-bold">{activity.title}</span>
      </nav>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`h-48 md:h-64 flex flex-col items-center justify-center ${config.gradient}`}
      >
        <span className="text-7xl mb-3">{config.emoji}</span>
        <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-dark text-center px-4">
          {activity.title}
        </h1>
      </motion.section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold text-white ${config.badge}`}
          >
            {config.label}
          </span>
          <span className="bg-cream rounded-full px-3 py-1 text-xs font-bold text-body">
            {activity.ageRange} yrs
          </span>
          <span className="text-xs text-body">
            {DIFFICULTY_DOTS[activity.difficulty]}
          </span>
          <span className="text-xs text-body">{activity.duration}</span>
        </div>

        {/* Description */}
        <div className="space-y-4 text-base text-body leading-relaxed mb-10">
          <p>{activity.description}</p>
          <p>
            This activity is designed for children aged {activity.ageRange} and
            can be enjoyed at home, in the classroom, or at a playdate. It
            encourages creativity, problem-solving, and hands-on learning while
            keeping kids entertained for around {activity.duration}.
          </p>
          <p>
            Whether your child is a seasoned crafter or trying something new for
            the first time, this activity adapts to different skill levels. Adult
            supervision is recommended for younger participants, and the whole
            family is welcome to join in!
          </p>
        </div>

        {/* DIY-specific sections */}
        {activity.type === "diy" && (
          <>
            <div className="mb-10">
              <h2 className="text-xl font-extrabold font-heading text-dark mb-4">
                Materials Needed
              </h2>
              <ul className="space-y-2">
                {PLACEHOLDER_MATERIALS.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-body">
                    <span className="text-primary font-bold mt-0.5">
                      {"\u2713"}
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-extrabold font-heading text-dark mb-4">
                Steps
              </h2>
              <ol className="space-y-4">
                {PLACEHOLDER_STEPS.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-body">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}

        {/* Related Activities */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-extrabold font-heading text-dark mb-4">
              Related Activities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <ActivityCard key={r.id} activity={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
