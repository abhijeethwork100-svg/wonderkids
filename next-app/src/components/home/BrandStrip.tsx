"use client";

import Link from "next/link";
import { BRANDS } from "@/data/brands";
import SectionHeader from "@/components/ui/SectionHeader";

export default function BrandStrip() {
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <SectionHeader subtitle="Trusted Brands" title="Shop by Brand" align="center" />
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-cream to-transparent" />

        <div className="brand-track flex gap-12 items-center py-4">
          {doubled.map((brand, i) => (
            <Link
              key={`${brand.id}-${i}`}
              href={`/brands/${brand.slug}`}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: brand.color }}
              >
                <span className="text-2xl font-black text-white">
                  {brand.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs font-bold text-body whitespace-nowrap">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>

        <style jsx>{`
          .brand-track {
            animation: brand-scroll 40s linear infinite;
          }
          @keyframes brand-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
