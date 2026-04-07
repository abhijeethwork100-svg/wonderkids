import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { getProductById } from '../data/products';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wk-cart')) || []; } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wk-wish')) || []; } catch { return []; }
  });
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimer = useRef(null);

  useEffect(() => { localStorage.setItem('wk-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wk-wish', JSON.stringify(wishlist)); }, [wishlist]);

  const showToast = useCallback((message) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
  }, []);

  const addToCart = useCallback((id) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === id);
      if (existing) return prev.map(i => i.productId === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { productId: id, qty: 1 }];
    });
    const p = getProductById(id);
    showToast(`🛒 ${p?.name || 'Item'} added to cart!`);
  }, [showToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.productId !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.productId === id ? { ...i, qty } : i));
  }, [removeFromCart]);

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => {
      const has = prev.includes(id);
      if (has) { showToast('💔 Removed from wishlist'); return prev.filter(i => i !== id); }
      showToast('❤️ Added to wishlist!');
      return [...prev, id];
    });
  }, [showToast]);

  const isWishlisted = useCallback((id) => wishlist.includes(id), [wishlist]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => {
      const p = getProductById(item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  return (
    <StoreContext.Provider value={{
      cart, wishlist, toast,
      addToCart, removeFromCart, updateQty,
      toggleWishlist, isWishlisted,
      getCartTotal, getCartCount, showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
