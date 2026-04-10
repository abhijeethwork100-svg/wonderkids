"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Minus, Plus, Check } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

interface Selections {
  theme: string;
  guestCount: number;
  budgetPerChild: number;
  addOns: string[];
}

const THEMES = [
  { id: "space", label: "Space", emoji: "\uD83D\uDE80", gradient: "linear-gradient(135deg, #1A1A2E 0%, #4A00E0 100%)" },
  { id: "jungle", label: "Jungle", emoji: "\uD83E\uDD81", gradient: "linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)" },
  { id: "princess", label: "Princess", emoji: "\uD83D\uDC51", gradient: "linear-gradient(135deg, #C77DFF 0%, #E0AAFF 100%)" },
  { id: "superhero", label: "Superhero", emoji: "\uD83E\uDDB8", gradient: "linear-gradient(135deg, #E63946 0%, #457B9D 100%)" },
  { id: "ocean", label: "Ocean", emoji: "\uD83D\uDC20", gradient: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)" },
  { id: "art-party", label: "Art Party", emoji: "\uD83C\uDFA8", gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)" },
];

const BUDGET_OPTIONS = [
  { value: 100, included: "Basic party favors & stickers" },
  { value: 200, included: "Party favors, small toy & candy bag" },
  { value: 300, included: "Premium toy, candy bag & activity kit" },
  { value: 500, included: "Deluxe gift box with toy, book & treats" },
];

interface AddOn {
  id: string;
  label: string;
  price: number;
  perChild: boolean;
}

const ADD_ONS: AddOn[] = [
  { id: "cake", label: "Cake", price: 500, perChild: false },
  { id: "decorations", label: "Extra Decorations", price: 300, perChild: false },
  { id: "return-gifts", label: "Return Gifts", price: 200, perChild: true },
  { id: "games-kit", label: "Games Kit", price: 400, perChild: false },
  { id: "costumes", label: "Costumes", price: 150, perChild: true },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

/* ------------------------------------------------------------------ */
/*  Confetti component                                                 */
/* ------------------------------------------------------------------ */

function Confetti() {
  const pieces = useMemo(() => {
    const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA", "#34D399", "#FF9800"];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 3}s`,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 6,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-confetti-fall"
          style={{
            left: p.left,
            top: -10,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti-fall {
          animation-name: confetti-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BirthdayPage() {
  const { showToast } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selections, setSelections] = useState<Selections>({
    theme: "",
    guestCount: 10,
    budgetPerChild: 0,
    addOns: [],
  });

  /* ---- Navigation ---- */
  const goNext = () => { setDirection(1); setCurrentStep((s) => Math.min(s + 1, 4)); };
  const goBack = () => { setDirection(-1); setCurrentStep((s) => Math.max(s - 1, 0)); };

  /* ---- Answer handlers ---- */
  const selectTheme = (id: string) => setSelections((s) => ({ ...s, theme: id }));

  const setGuestCount = (delta: number) =>
    setSelections((s) => ({ ...s, guestCount: Math.max(5, Math.min(50, s.guestCount + delta)) }));

  const selectBudget = (value: number) => setSelections((s) => ({ ...s, budgetPerChild: value }));

  const toggleAddOn = (id: string) =>
    setSelections((s) => ({
      ...s,
      addOns: s.addOns.includes(id) ? s.addOns.filter((a) => a !== id) : [...s.addOns, id],
    }));

  /* ---- Price calculation ---- */
  const totalPrice = useMemo(() => {
    const base = selections.guestCount * selections.budgetPerChild;
    const addOnTotal = ADD_ONS.reduce((sum, ao) => {
      if (!selections.addOns.includes(ao.id)) return sum;
      return sum + (ao.perChild ? ao.price * selections.guestCount : ao.price);
    }, 0);
    return base + addOnTotal;
  }, [selections]);

  /* ---- Can go next? ---- */
  const canNext =
    (currentStep === 1 && selections.theme !== "") ||
    (currentStep === 2) ||
    (currentStep === 3 && selections.budgetPerChild > 0);

  const progress = currentStep === 0 ? 0 : (currentStep / 4) * 100;
  const selectedTheme = THEMES.find((t) => t.id === selections.theme);

  return (
    <div className="min-h-screen bg-cream py-8 px-4 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Progress bar */}
        {currentStep > 0 && (
          <div className="h-2 rounded-full bg-border-light mb-8 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-secondary"
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
              <span className="text-6xl block mb-4">{"\uD83C\uDF82"}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-dark mb-4">
                Birthday Party Planner
              </h1>
              <p className="text-body text-sm mb-2">
                {"\uD83C\uDF88\uD83C\uDF89\uD83C\uDF8A"}
              </p>
              <p className="text-body text-sm mb-8 max-w-md mx-auto">
                Plan a magical birthday in 4 easy steps!
              </p>
              <button
                onClick={goNext}
                className="bg-secondary text-white rounded-2xl px-8 py-4 font-extrabold font-heading text-lg hover:opacity-90 transition-opacity"
              >
                Start Planning <ArrowRight className="inline w-5 h-5 ml-1" />
              </button>
            </motion.div>
          )}

          {/* ---- Step 1: Theme ---- */}
          {currentStep === 1 && (
            <motion.div
              key="theme"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-extrabold font-heading text-dark mb-6 text-center">
                Choose a Theme
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => selectTheme(theme.id)}
                    className={`rounded-[16px] p-6 text-white text-center transition-all ${
                      selections.theme === theme.id ? "ring-4 ring-primary scale-105" : ""
                    }`}
                    style={{ background: theme.gradient }}
                  >
                    <span className="text-4xl block mb-2">{theme.emoji}</span>
                    <span className="text-sm font-extrabold font-heading">{theme.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ---- Step 2: Guest Count ---- */}
          {currentStep === 2 && (
            <motion.div
              key="guests"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-extrabold font-heading text-dark mb-8 text-center">
                How many little guests?
              </h2>
              <div className="flex items-center justify-center gap-6 mb-6">
                <button
                  onClick={() => setGuestCount(-1)}
                  className="w-12 h-12 rounded-full border-2 border-border-light bg-white flex items-center justify-center hover:border-primary transition-colors"
                >
                  <Minus className="w-5 h-5 text-dark" />
                </button>
                <span className="text-5xl font-black font-heading text-dark w-20 text-center">
                  {selections.guestCount}
                </span>
                <button
                  onClick={() => setGuestCount(1)}
                  className="w-12 h-12 rounded-full border-2 border-border-light bg-white flex items-center justify-center hover:border-primary transition-colors"
                >
                  <Plus className="w-5 h-5 text-dark" />
                </button>
              </div>
              <div className="text-center text-2xl mb-8">
                {Array.from({ length: Math.min(selections.guestCount, 20) }, (_, i) => (
                  <span key={i}>{"\uD83C\uDF89"}</span>
                ))}
                {selections.guestCount > 20 && <span className="text-sm text-body ml-1">+{selections.guestCount - 20} more</span>}
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
                Budget per child
              </h2>
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectBudget(opt.value)}
                    className={`rounded-[16px] p-6 bg-white border-2 text-center transition-all ${
                      selections.budgetPerChild === opt.value
                        ? "border-secondary bg-secondary/5"
                        : "border-border-light hover:border-secondary/30"
                    }`}
                  >
                    <span className="text-lg font-extrabold font-heading text-dark block mb-1">
                      {formatPrice(opt.value)}
                    </span>
                    <span className="text-xs text-body">{opt.included}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ---- Step 4: Summary ---- */}
          {currentStep === 4 && (
            <motion.div
              key="summary"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Confetti />
              <h2 className="text-2xl font-extrabold font-heading text-dark mb-6 text-center">
                {"\uD83C\uDF89"} Your Party Kit
              </h2>

              {/* Summary card */}
              <div className="bg-white rounded-[20px] p-6 border border-border-light mb-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  {selectedTheme && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{selectedTheme.emoji}</span>
                      <div>
                        <p className="text-xs text-body">Theme</p>
                        <p className="text-sm font-extrabold font-heading text-dark">{selectedTheme.label}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{"\uD83D\uDC65"}</span>
                    <div>
                      <p className="text-xs text-body">Guests</p>
                      <p className="text-sm font-extrabold font-heading text-dark">{selections.guestCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{"\uD83D\uDCB0"}</span>
                    <div>
                      <p className="text-xs text-body">Per child</p>
                      <p className="text-sm font-extrabold font-heading text-dark">{formatPrice(selections.budgetPerChild)}</p>
                    </div>
                  </div>
                </div>

                {/* Add-ons */}
                <h3 className="text-sm font-extrabold font-heading text-dark mb-3">Add-ons</h3>
                <div className="space-y-3 mb-6">
                  {ADD_ONS.map((ao) => (
                    <label
                      key={ao.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <button
                        onClick={() => toggleAddOn(ao.id)}
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          selections.addOns.includes(ao.id)
                            ? "bg-secondary border-secondary"
                            : "border-border-light"
                        }`}
                      >
                        {selections.addOns.includes(ao.id) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <span className="text-sm text-dark flex-1">{ao.label}</span>
                      <span className="text-sm font-bold text-body">
                        {formatPrice(ao.price)}{ao.perChild ? "/child" : ""}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-border-light my-4" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-body">Total</span>
                  <span className="text-2xl font-black font-heading text-dark">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => showToast("\uD83C\uDF89 Party kit added to cart!")}
                  className="bg-secondary text-white rounded-2xl px-8 py-4 font-extrabold font-heading text-lg hover:opacity-90 transition-opacity"
                >
                  Add Party Kit to Cart
                </button>
              </div>
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
              className="flex items-center gap-1 bg-secondary text-white rounded-xl px-6 py-2.5 font-extrabold font-heading text-sm disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
