"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { AGE_GROUPS } from "@/data/ages";
import { BRANDS } from "@/data/brands";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}

function AccordionSection({ title, children }: AccordionSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border-light">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4"
      >
        <span className="font-heading font-bold text-dark text-sm">
          {title}
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-body" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/30"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-[85vw] max-w-sm bg-cream overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
              <span className="font-heading font-black text-lg text-dark">
                Wonder<span className="text-primary">Kids</span>
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-dark" />
              </button>
            </div>

            {/* Sections */}
            <AccordionSection title="Shop by Category">
              <div className="flex flex-col gap-0.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/shop/${cat.slug}`)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 text-left transition-colors"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-heading font-bold text-dark">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Shop by Age">
              <div className="flex flex-col gap-0.5">
                {AGE_GROUPS.map((age) => (
                  <button
                    key={age.id}
                    onClick={() => navigate(`/age/${age.slug}`)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 text-left transition-colors"
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: age.color }}
                    />
                    <div>
                      <span className="text-sm font-heading font-bold text-dark">
                        {age.label}
                      </span>
                      <span className="text-xs text-body ml-2">
                        {age.subtitle}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Shop by Brand">
              <div className="flex flex-col gap-0.5">
                {BRANDS.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => navigate(`/brands/${brand.slug}`)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 text-left transition-colors"
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: brand.color }}
                    />
                    <span className="text-sm font-heading font-bold text-dark">
                      {brand.name}
                    </span>
                  </button>
                ))}
              </div>
            </AccordionSection>

            {/* Direct links */}
            <div className="border-b border-border-light">
              <button
                onClick={() => navigate("/play")}
                className="w-full text-left px-5 py-4 font-heading font-bold text-dark text-sm"
              >
                Play
              </button>
            </div>
            <div className="border-b border-border-light">
              <button
                onClick={() => navigate("/birthday")}
                className="w-full text-left px-5 py-4 font-heading font-bold text-dark text-sm"
              >
                Birthday Planner
              </button>
            </div>
            <div className="border-b border-border-light">
              <button
                onClick={() => navigate("/quiz")}
                className="w-full text-left px-5 py-4 font-heading font-bold text-dark text-sm"
              >
                Gift Quiz
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
