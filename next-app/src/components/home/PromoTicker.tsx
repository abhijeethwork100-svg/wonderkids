"use client";

const ITEMS = [
  "\uD83C\uDF82 Birthday Special: 20% Off Party Kits",
  "\uD83D\uDE80 New: Space Collection Launched",
  "\uD83C\uDFA8 Free Art Kit on Orders \u20B92,000+",
  "\u2B50 4.9/5 Rating from 10,000+ Parents",
  "\uD83D\uDE9A Free Delivery Above \u20B9999",
];

export default function PromoTicker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="bg-accent-yellow/20 overflow-hidden py-3">
      <div className="ticker-track flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-bold font-heading text-dark/80 mx-4 shrink-0">
            {item}
            <span className="mx-4 text-dark/30">{"\u2022"}</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker-scroll 30s linear infinite;
        }
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
