"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { showToast } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast("\uD83C\uDF89 You're subscribed!");
      setEmail("");
    }
  };

  return (
    <section
      className="py-12 px-4"
      style={{
        background: "linear-gradient(180deg, #1A1A2E 0%, #2C2C54 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-white/50 text-xs font-heading tracking-[2px] uppercase mb-2">
          STAY UPDATED
        </p>
        <h2 className="text-white text-2xl font-heading font-extrabold mb-2">
          Get Magical Offers 🎁
        </h2>
        <p className="text-white/65 text-sm mb-6">
          Subscribe for exclusive deals, new product launches, and parenting
          tips
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex items-center rounded-full border border-white/20 bg-white/10 p-1.5 pl-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none min-w-0"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white rounded-full px-5 py-2.5 font-heading font-extrabold text-sm hover:bg-primary/90 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </div>
        </form>

        <p className="text-white/40 text-xs mt-4">
          No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
