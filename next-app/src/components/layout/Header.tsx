"use client";

import { useState } from "react";
import { Search, Heart, ShoppingCart, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";
import MobileDrawer from "./MobileDrawer";

type MenuType = "category" | "age" | "brand" | "play" | null;

const NAV_ITEMS: { label: string; menu: MenuType }[] = [
  { label: "Shop by Category", menu: "category" },
  { label: "Shop by Age", menu: "age" },
  { label: "Shop by Brand", menu: "brand" },
  { label: "Play", menu: "play" },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { getCartCount, getWishlistCount } = useStore();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const toggleMenu = (menu: MenuType) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-xl border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-lg bg-gradient-to-br from-primary to-orange-400">
              <span role="img" aria-label="teddy bear">
                🧸
              </span>
            </div>
            <span className="font-heading font-black text-xl text-dark">
              Wonder<span className="text-primary">Kids</span>
            </span>
          </a>

          {/* Center nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.menu}
                onClick={() => toggleMenu(item.menu)}
                className={cn(
                  "px-3.5 py-2 rounded-full text-sm font-bold font-heading transition-colors",
                  activeMenu === item.menu
                    ? "text-primary bg-primary/8"
                    : "text-dark hover:text-primary hover:bg-primary/8"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-full border border-border-light bg-white hover:border-primary flex items-center justify-center transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] text-dark" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => (window.location.href = "/wishlist")}
              className="relative w-10 h-10 rounded-full border border-border-light bg-white hover:border-primary flex items-center justify-center transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-[18px] h-[18px] text-dark" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-primary text-white text-[0.65rem] font-extrabold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => (window.location.href = "/cart")}
              className="relative w-10 h-10 rounded-full border border-border-light bg-white hover:border-primary flex items-center justify-center transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-[18px] h-[18px] text-dark" />
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-primary text-white text-[0.65rem] font-extrabold flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden w-10 h-10 rounded-full border border-border-light bg-white hover:border-primary flex items-center justify-center transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-[18px] h-[18px] text-dark" />
            </button>
          </div>
        </div>
      </header>

      {/* Mega menu */}
      <MegaMenu activeMenu={activeMenu} onClose={() => setActiveMenu(null)} />

      {/* Search overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
