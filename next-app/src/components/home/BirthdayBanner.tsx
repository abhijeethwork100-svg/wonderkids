"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BirthdayBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-4 my-5"
    >
      <div
        className="rounded-[32px] overflow-hidden relative p-8"
        style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53, #FF6B6B)" }}
      >
        {/* Decorative emoji strip */}
        <div className="absolute top-4 left-0 right-0 text-center text-3xl tracking-[20px] opacity-15 pointer-events-none select-none" aria-hidden="true">
          {"\uD83C\uDF89\uD83C\uDF88\uD83C\uDF82\uD83C\uDF81\uD83C\uDF8A"}
        </div>

        <div className="relative z-10 max-w-lg">
          <h3 className="text-white text-xl font-extrabold font-heading mb-2">
            {"\uD83C\uDF89"} Plan the Perfect Birthday!
          </h3>
          <p className="text-sm text-white/85 leading-relaxed mb-5">
            From themed decorations to curated party kits, we have everything to make your child&apos;s special day unforgettable. Choose from 10+ magical themes!
          </p>
          <Link
            href="/birthday"
            className="inline-block bg-white text-dark rounded-full px-7 py-3 font-extrabold font-heading transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
          >
            Plan a Party {"\uD83C\uDF82"}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
