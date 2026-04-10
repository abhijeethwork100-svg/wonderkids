"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { AGE_GROUPS } from "@/data/ages";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";

/* ------------------------------------------------------------------ */
/*  Types & constants                                                  */
/* ------------------------------------------------------------------ */

interface Answers {
  age: string;
  interests: string[];
  budget: string;
}

const INTERESTS = [
  { id: "space", label: "Space", emoji: "\uD83D\uDE80" },
  { id: "animals", label: "Animals", emoji: "\uD83E\uDD81" },
  { id: "art", label: "Art", emoji: "\uD83C\uDFA8" },
  { id: "building", label: "Building", emoji: "\uD83E\uDDF1" },
  { id: "fantasy", label: "Fantasy", emoji: "\uD83C\uDFF0" },
  { id: "vehicles", label: "Vehicles", emoji: "\uD83D\uDE97" },
  { id: "sports", label: "Sports", emoji: "\u26BD" },
  { id: "music", label: "Music", emoji: "\uD83C\uDFB5" },
];

const AGE_EMOJIS: Record<string, string> = {
  "tiny-explorers": "\uD83D\uDC76",
  "little-adventurers": "\uD83E\uDDD2",
  "big-dreamers": "\uD83E\uDDD1",
  "super-builders": "\uD83E\uDDD1\u200D\uD83D\uDD27",
  "teen-creators": "\uD83E\uDDD1\u200D\uD83C\uDFA8",
};

const BUDGETS = [
  { id: "200-800", label: "\u20B9200 \u2013 \u20B9800", min: 200, max: 800 },
  { id: "800-1500", label: "\u20B9800 \u2013 \u20B91,500", min: 800, max: 1500 },
  { id: "1500-3000", label: "\u20B91,500 \u2013 \u20B93,000", min: 1500, max: 3000 },
  { id: "3000+", label: "\u20B93,000+", min: 3000, max: Infinity },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function QuizPage() {
  const { addToCart, showToast } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    age: "",
    interests: [],
    budget: "",
  });

  /* ---- Navigation ---- */
  const goNext = () => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 4));
  };
  const goBack = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  };
  const restart = () => {
    setDirection(-1);
    setCurrentStep(0);
    setAnswers({ age: "", interests: [], budget: "" });
  };

  /* ---- Answer handlers ---- */
  const selectAge = (slug: string) => setAnswers((a) => ({ ...a, age: slug }));

  const toggleInterest = (id: string) =>
    setAnswers((a) => {
      const has = a.interests.includes(id);
      if (has) return { ...a, interests: a.interests.filter((i) => i !== id) };
      if (a.interests.length >= 3) return a;
      return { ...a, interests: [...a.interests, id] };
    });

  const selectBudget = (id: string) => setAnswers((a) => ({ ...a, budget: id }));

  /* ---- Filtered results ---- */
  const results = useMemo(() => {
    const ageGroup = AGE_GROUPS.find((g) => g.slug === answers.age);
    const budgetObj = BUDGETS.find((b) => b.id === answers.budget);
    if (!ageGroup || !budgetObj) return [];

    return PRODUCTS.filter((p) => {
      const [pMin, pMax] = p.ageRange.split("-").map(Number);
      const ageOk = pMin <= ageGroup.ageMax && pMax >= ageGroup.ageMin;
      const budgetOk = p.price >= budgetObj.min && p.price <= budgetObj.max;
      return ageOk && budgetOk;
    }).slice(0, 8);
  }, [answers.age, answers.budget]);

  const addAllToCart = () => {
    results.forEach((p) => addToCart(p.id));
    showToast(`\uD83C\uDF89 Added ${results.length} items to cart!`);
  };

  /* ---- Can go next? ---- */
  const canNext =
    (currentStep === 1 && answers.age !== "") ||
    (currentStep === 2 && answers.interests.length > 0) ||
    (currentStep === 3 && answers.budget !== "");

  /* ---- Progress ---- */
  const progress = currentStep === 0 ? 0 : (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-cream py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        {currentStep > 0 && (
          <div className="h-2 rounded-full bg-border-light mb-8 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          {/* ---- Step 0: Welcome ---- */}
          {currentStep === 0 && (
            <motion.div
              key="welcome"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <span className="text-6xl block mb-4">{"\uD83C\uDFAF"}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-dark mb-4">
                Gift Finder Quiz
              </h1>
              <p className="text-body text-sm mb-8 max-w-md mx-auto">
                Answer 4 quick questions and we&apos;ll find the perfect toy!
              </p>
              <button
                onClick={goNext}
                className="bg-primary text-white rounded-2xl px-8 py-4 font-extrabold font-heading text-lg hover:opacity-90 transition-opacity"
              >
                Start Quiz <ArrowRight className="inline w-5 h-5 ml-1" />
              </button>
            </motion.div>
          )}

          {/* ---- Step 1: Age ---- */}
          {currentStep === 1 && (
            <motion.div
              key="age"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-extrabold font-heading text-dark mb-6 text-center">
                How old is the child?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {AGE_GROUPS.map((ag) => (
                  <button
                    key={ag.slug}
                    onClick={() => selectAge(ag.slug)}
                    className={`rounded-[16px] p-6 bg-white border-2 text-center transition-all ${
                      answers.age === ag.slug
                        ? "border-primary bg-primary/5"
                        : "border-border-light hover:border-primary/30"
                    }`}
                  >
                    <span className="text-3xl block mb-2">{AGE_EMOJIS[ag.slug] ?? "\uD83E\uDDD2"}</span>
                    <span className="text-sm font-extrabold font-heading text-dark block">
                      {ag.label}
                    </span>
                    <span className="text-xs text-body">{ag.subtitle}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ---- Step 2: Interests ---- */}
          {currentStep === 2 && (
            <motion.div
              key="interests"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-extrabold font-heading text-dark mb-1 text-center">
                What do they love?
              </h2>
              <p className="text-body text-sm text-center mb-6">(Pick up to 3)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {INTERESTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={`rounded-[16px] p-6 bg-white border-2 text-center transition-all ${
                      answers.interests.includes(item.id)
                        ? "border-primary bg-primary/5"
                        : "border-border-light hover:border-primary/30"
                    }`}
                  >
                    <span className="text-3xl block mb-2">{item.emoji}</span>
                    <span className="text-sm font-extrabold font-heading text-dark">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ---- Step 3: Budget ---- */}
          {currentStep === 3 && (
            <motion.div
              key="budget"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-extrabold font-heading text-dark mb-6 text-center">
                What&apos;s your budget?
              </h2>
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
                {BUDGETS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => selectBudget(b.id)}
                    className={`rounded-[16px] p-6 bg-white border-2 text-center transition-all ${
                      answers.budget === b.id
                        ? "border-primary bg-primary/5"
                        : "border-border-light hover:border-primary/30"
                    }`}
                  >
                    <span className="text-lg font-extrabold font-heading text-dark">
                      {b.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ---- Step 4: Results ---- */}
          {currentStep === 4 && (
            <motion.div
              key="results"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-extrabold font-heading text-dark mb-6 text-center">
                {"\uD83C\uDF89"} Perfect Matches!
              </h2>
              {results.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {results.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <button
                      onClick={addAllToCart}
                      className="bg-primary text-white rounded-2xl px-8 py-4 font-extrabold font-heading text-lg hover:opacity-90 transition-opacity"
                    >
                      Add All to Cart
                    </button>
                    <button
                      onClick={restart}
                      className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                    >
                      <RotateCcw className="w-4 h-4" /> Retake Quiz
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <span className="text-5xl block mb-4">{"\uD83D\uDE14"}</span>
                  <p className="text-body text-sm mb-6">
                    No exact matches found. Try different filters!
                  </p>
                  <button
                    onClick={restart}
                    className="text-primary text-sm font-bold flex items-center gap-1 mx-auto hover:underline"
                  >
                    <RotateCcw className="w-4 h-4" /> Retake Quiz
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- Nav buttons for steps 1-3 ---- */}
        {currentStep >= 1 && currentStep <= 3 && (
          <div className="flex justify-between mt-4">
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-body text-sm font-bold hover:text-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={goNext}
              disabled={!canNext}
              className="flex items-center gap-1 bg-primary text-white rounded-xl px-6 py-2.5 font-extrabold font-heading text-sm disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
