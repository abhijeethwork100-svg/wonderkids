import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { getCategoryById } from '../data/products';

const H = { fontFamily: "'Nunito', sans-serif" };

export default function ProductModal({ product, onClose }) {
  const [tab, setTab] = useState(0);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = product ? isWishlisted(product.id) : false;
  const cat = product ? getCategoryById(product.cat) : null;
  const stars = product ? '⭐'.repeat(Math.min(product.rating, 5)) : '';

  const tabs = ['💚 Kids Love It', '🌟 Benefits', '🛡️ Safety'];
  const tabData = product ? [product.love, product.benefits, product.safety] : [[], [], []];

  return (
    <AnimatePresence>
      {product && (
        <motion.div className="fixed inset-0 z-[3000] flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div className="w-full max-w-[600px] overflow-y-auto"
            style={{ background: '#fff', borderRadius: '32px 32px 0 0', maxHeight: '92svh' }}
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}>

            {/* Handle */}
            <div className="w-10 h-1 rounded-full mx-auto mt-3 mb-0" style={{ background: '#F0E6D3' }} />

            {/* Image */}
            <div className="w-full aspect-square flex items-center justify-center text-[6rem]"
              style={{ background: `linear-gradient(135deg, ${cat?.color || '#FF6B6B'}22, ${cat?.color || '#FF6B6B'}44)` }}>
              {product.emoji}
            </div>

            {/* Body */}
            <div className="p-5 pb-10">
              <div className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: '#FF6B6B' }}>{product.tag}</div>
              <h2 className="text-2xl font-extrabold mb-2" style={H}>{product.name}</h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs">{stars}</span>
                <span className="text-xs" style={{ color: '#636E72' }}>({product.reviews} reviews)</span>
                {product.badge && <span className="text-[0.7rem] font-extrabold px-2.5 py-0.5 rounded-full" style={{ ...H, background: '#FFE66D', color: '#1A1A2E' }}>{product.badge}</span>}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black" style={{ ...H, color: '#1A1A2E' }}>₹{product.price.toLocaleString()}</span>
                {product.old && <span className="text-sm line-through" style={{ color: '#636E72' }}>₹{product.old.toLocaleString()}</span>}
                <span className="text-[0.7rem] font-extrabold px-2.5 py-0.5 rounded-full" style={{ ...H, background: '#2ECC71', color: '#fff' }}>{product.discount}% OFF</span>
              </div>

              {/* Tabs */}
              <div className="flex mb-4" style={{ borderBottom: '1.5px solid #F0E6D3' }}>
                {tabs.map((t, i) => (
                  <button key={i} onClick={() => setTab(i)} className="flex-1 py-2.5 text-center text-[0.82rem] font-bold transition-all"
                    style={{ ...H, color: tab === i ? '#FF6B6B' : '#636E72', borderBottom: tab === i ? '2px solid #FF6B6B' : '2px solid transparent', marginBottom: '-1.5px' }}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="grid gap-2.5 mb-5">
                {tabData[tab]?.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: '#636E72' }}>
                    <span className="font-extrabold flex-shrink-0" style={{ color: '#2ECC71' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2.5">
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0 border-2 transition-all"
                  style={{ background: wished ? '#FFE4E1' : '#fff', borderColor: wished ? '#FF6B6B' : '#F0E6D3' }}
                  onClick={() => toggleWishlist(product.id)}>
                  {wished ? '❤️' : '🤍'}
                </button>
                <button className="flex-1 py-3 rounded-full text-base font-extrabold transition-all hover:opacity-90 active:scale-[0.97]"
                  style={{ ...H, background: '#FF6B6B', color: '#fff', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}
                  onClick={() => { addToCart(product.id); onClose(); }}>
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
