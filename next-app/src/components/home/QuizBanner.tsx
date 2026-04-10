"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function QuizBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-4 mb-5"
    >
      <div
        className="rounded-[32px] p-7 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #667EEA, #764BA2)" }}
      >
        <div className="relative z-10 max-w-lg">
          <h3 className="text-white text-lg font-extrabold font-heading mb-2">
            {"\uD83C\uDFAF"} Not Sure What to Buy?
          </h3>
          <p className="text-xs text-white/80 leading-relaxed mb-4">
            Take our 60-second gift quiz and get personalized toy recommendations based on your child&apos;s age, interests, and personality.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-white text-dark rounded-full px-7 py-3 font-extrabold font-heading transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
          >
            Start Quiz {"\uD83C\uDFAF"}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
