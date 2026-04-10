"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Gamepad2, Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: Grid3X3 },
  { href: "/play", label: "Play", icon: Gamepad2 },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { getCartCount } = useStore();
  const cartCount = getCartCount();

  const getActiveKey = () => {
    for (const item of NAV_ITEMS) {
      if (item.href === "/" && pathname === "/") return item.href;
      if (item.href !== "/" && pathname.startsWith(item.href)) return item.href;
    }
    return "/";
  };

  const activeKey = getActiveKey();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border-light">
      <div className="flex items-center justify-around h-[72px] pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeKey === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 flex-1 pt-2",
                isActive ? "text-primary" : "text-body"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 w-8 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.label === "Cart" && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2.5 w-[18px] h-[18px] rounded-full bg-primary text-white text-[0.65rem] font-extrabold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[0.65rem] font-heading font-bold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
