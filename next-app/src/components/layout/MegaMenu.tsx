"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { AGE_GROUPS } from "@/data/ages";
import { BRANDS } from "@/data/brands";
import { ACTIVITIES } from "@/data/activities";

interface MegaMenuProps {
  activeMenu: "category" | "age" | "brand" | "play" | null;
  onClose: () => void;
}

export default function MegaMenu({ activeMenu, onClose }: MegaMenuProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (activeMenu) {
      document.addEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeMenu, onClose]);

  const featuredActivities = ACTIVITIES.slice(0, 3);

  const activityTypes = [
    { label: "DIY Crafts", type: "diy" },
    { label: "Toy Demos", type: "demo" },
    { label: "Printables", type: "printable" },
    { label: "Mini Games", type: "game" },
    { label: "Learning Corner", type: "learning" },
  ];

  return (
    <AnimatePresence>
      {activeMenu && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 right-0 z-50 bg-white border-b border-border-light shadow-lg overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              {/* Category Panel */}
              {activeMenu === "category" && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop/${cat.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <p className="font-heading font-bold text-sm">
                          {cat.name}
                        </p>
                        <p className="text-xs text-body">
                          {cat.productCount} products
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Age Panel */}
              {activeMenu === "age" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {AGE_GROUPS.map((age) => (
                    <Link
                      key={age.id}
                      href={`/age/${age.slug}`}
                      onClick={onClose}
                      className="group block rounded-xl border border-border-light overflow-hidden hover:border-primary transition-colors"
                    >
                      <div
                        className="h-2"
                        style={{ backgroundColor: age.color }}
                      />
                      <div className="p-4">
                        <p className="font-heading font-bold text-sm group-hover:text-primary">
                          {age.label}
                        </p>
                        <p className="text-xs text-body mt-0.5">
                          {age.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Brand Panel */}
              {activeMenu === "brand" && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {BRANDS.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/brands/${brand.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: brand.color }}
                      />
                      <p className="font-heading font-bold text-sm">
                        {brand.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}

              {/* Play Panel */}
              {activeMenu === "play" && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-dark mb-3">
                      Activity Types
                    </h3>
                    <div className="flex flex-col gap-1">
                      {activityTypes.map((at) => (
                        <Link
                          key={at.type}
                          href="/play"
                          onClick={onClose}
                          className="px-4 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary font-heading font-bold text-sm transition-colors"
                        >
                          {at.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-dark mb-3">
                      Featured Activities
                    </h3>
                    <div className="flex flex-col gap-3">
                      {featuredActivities.map((act) => (
                        <Link
                          key={act.id}
                          href="/play"
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border-light hover:border-primary transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg bg-accent-yellow/30 shrink-0" />
                          <div>
                            <p className="font-heading font-bold text-sm">
                              {act.title}
                            </p>
                            <p className="text-xs text-body">{act.duration}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
