"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { PRODUCTS } from "@/data/products";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CartItem {
  productId: number;
  qty: number;
}

interface ToastState {
  message: string;
  visible: boolean;
}

interface StoreContextValue {
  /* cart */
  cart: CartItem[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  /* wishlist */
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  getWishlistCount: () => number;

  /* toast */
  toast: ToastState;
  showToast: (message: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const CART_KEY = "wonderkids_cart";
const WISHLIST_KEY = "wonderkids_wishlist";

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* silently ignore — quota exceeded, etc. */
  }
}

function getProductById(id: number) {
  return PRODUCTS.find((p) => p.id === id);
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast] = useState<ToastState>({
    message: "",
    visible: false,
  });
  const [hydrated, setHydrated] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- Restore from localStorage on mount ---- */
  useEffect(() => {
    setCart(loadFromStorage<CartItem[]>(CART_KEY, []));
    setWishlist(loadFromStorage<number[]>(WISHLIST_KEY, []));
    setHydrated(true);
  }, []);

  /* ---- Persist whenever cart / wishlist change (after hydration) ---- */
  useEffect(() => {
    if (!hydrated) return;
    saveToStorage(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveToStorage(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  /* ---- Toast ---- */
  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, visible: true });
    toastTimer.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  }, []);

  /* ---- Cart actions ---- */
  const addToCart = useCallback(
    (id: number) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === id);
        if (existing) {
          return prev.map((item) =>
            item.productId === id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...prev, { productId: id, qty: 1 }];
      });
      const product = getProductById(id);
      showToast(`🛒 ${product?.name ?? "Item"} added to cart!`);
    },
    [showToast]
  );

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.productId !== id));
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== id));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === id ? { ...item, qty } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  /* ---- Wishlist actions ---- */
  const toggleWishlist = useCallback(
    (id: number) => {
      setWishlist((prev) => {
        const exists = prev.includes(id);
        if (exists) {
          const product = getProductById(id);
          showToast(`💔 ${product?.name ?? "Item"} removed from wishlist`);
          return prev.filter((wId) => wId !== id);
        } else {
          const product = getProductById(id);
          showToast(`❤️ ${product?.name ?? "Item"} added to wishlist!`);
          return [...prev, id];
        }
      });
    },
    [showToast]
  );

  const isWishlisted = useCallback(
    (id: number) => wishlist.includes(id),
    [wishlist]
  );

  /* ---- Derived values ---- */
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product?.price ?? 0) * item.qty;
    }, 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.qty, 0);
  }, [cart]);

  const getWishlistCount = useCallback(() => wishlist.length, [wishlist]);

  /* ---- Render ---- */
  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        getCartTotal,
        getCartCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        getWishlistCount,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a <StoreProvider>");
  }
  return context;
}
