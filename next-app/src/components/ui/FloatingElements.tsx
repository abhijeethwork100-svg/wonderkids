"use client";

interface FloatingElementsProps {
  density?: "light" | "medium" | "heavy";
}

const ALL_ELEMENTS = [
  { emoji: "⭐", top: "5%", left: "3%", size: "text-2xl", opacity: "opacity-[0.08]", animation: "animate-float", delay: "0s", duration: "18s" },
  { emoji: "☁️", top: "12%", right: "5%", size: "text-3xl", opacity: "opacity-[0.07]", animation: "animate-drift", delay: "2s", duration: "22s" },
  { emoji: "✨", top: "28%", left: "2%", size: "text-xl", opacity: "opacity-[0.1]", animation: "animate-float", delay: "1s", duration: "16s" },
  { emoji: "🚀", top: "40%", right: "3%", size: "text-2xl", opacity: "opacity-[0.09]", animation: "animate-drift", delay: "3s", duration: "25s" },
  { emoji: "💖", top: "55%", left: "4%", size: "text-xl", opacity: "opacity-[0.08]", animation: "animate-float", delay: "4s", duration: "20s" },
  { emoji: "⭐", top: "65%", right: "4%", size: "text-xl", opacity: "opacity-[0.1]", animation: "animate-float", delay: "0.5s", duration: "17s" },
  { emoji: "☁️", top: "75%", left: "6%", size: "text-2xl", opacity: "opacity-[0.07]", animation: "animate-drift", delay: "2.5s", duration: "28s" },
  { emoji: "✨", top: "18%", left: "8%", size: "text-xl", opacity: "opacity-[0.12]", animation: "animate-float", delay: "1.5s", duration: "15s" },
  { emoji: "🚀", top: "85%", right: "6%", size: "text-xl", opacity: "opacity-[0.08]", animation: "animate-drift", delay: "5s", duration: "30s" },
  { emoji: "💖", top: "35%", right: "7%", size: "text-2xl", opacity: "opacity-[0.09]", animation: "animate-float", delay: "3.5s", duration: "19s" },
  { emoji: "⭐", top: "90%", left: "2%", size: "text-xl", opacity: "opacity-[0.1]", animation: "animate-float", delay: "4.5s", duration: "21s" },
  { emoji: "✨", top: "50%", left: "1%", size: "text-2xl", opacity: "opacity-[0.07]", animation: "animate-drift", delay: "0s", duration: "24s" },
];

const DENSITY_MAP = { light: 6, medium: 9, heavy: 12 } as const;

export default function FloatingElements({ density = "medium" }: FloatingElementsProps) {
  const count = DENSITY_MAP[density];
  const elements = ALL_ELEMENTS.slice(0, count);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden md:block" aria-hidden="true">
      {elements.map((el, i) => (
        <span
          key={i}
          className={`absolute ${el.size} ${el.opacity} ${el.animation}`}
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            animationDelay: el.delay,
            animationDuration: el.duration,
          }}
        >
          {el.emoji}
        </span>
      ))}
    </div>
  );
}
