import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, getFeaturedProducts, getNewArrivals } from '../data/products';
import { useStore } from '../context/StoreContext';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const H = { fontFamily: "'Nunito', sans-serif" };

export default function Home() {
  const navigate = useNavigate();
  const { showToast } = useStore();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div className="pb-[72px] md:pb-0">
      {/* HERO */}
      <section className="relative overflow-hidden flex items-center" style={{ minHeight: 'calc(100svh - 64px - 72px)', background: 'linear-gradient(135deg, #FFF5F5 0%, #FFF9E6 40%, #F0FCFC 100%)', padding: '40px 0 60px' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(255,107,107,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(78,205,196,0.12) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(255,230,109,0.1) 0%, transparent 40%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md mb-5" style={{ ...H, fontWeight: 700, fontSize: '0.85rem', color: '#1A1A2E' }}>
              <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: '#2ECC71' }} />
              ✨ 500+ Happy Families
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight" style={H}>
              Where Every Child's{' '}
              <span style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8C42)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Imagination</span>
              {' '}Comes Alive
            </h1>
            <p className="text-base mb-8 max-w-lg leading-relaxed" style={{ color: '#636E72' }}>
              Premium toys, magical birthday experiences, and curated adventures designed for kids aged 2–8. Safe, eco-friendly, and endlessly fun.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => navigate('/categories')} className="px-7 py-3.5 rounded-full font-extrabold text-white transition-all hover:-translate-y-0.5 active:scale-[0.96]"
                style={{ ...H, background: '#FF6B6B', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}>
                🧩 Explore All
              </button>
              <button onClick={() => navigate('/quiz')} className="px-7 py-3.5 rounded-full font-extrabold transition-all hover:-translate-y-0.5 active:scale-[0.96]"
                style={{ ...H, background: '#fff', color: '#1A1A2E', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                🎯 Find My Toy
              </button>
            </div>
            <div className="flex gap-6 mt-8 flex-wrap">
              {[['2,000+', 'Products'], ['10', 'Worlds'], ['4.9★', 'Rating']].map(([v, l]) => (
                <div key={l} style={H}>
                  <strong className="block text-xl font-black" style={{ color: '#1A1A2E' }}>{v}</strong>
                  <span className="text-xs font-semibold" style={{ color: '#636E72' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-80 md:h-[420px] flex items-center justify-center">
            <div className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-[40px] overflow-hidden flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FFE4E1 0%, #FFD1DC 30%, #E8F4FD 60%, #D4EFDF 100%)', boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }}>
              <img src="/images/hero-bear.png" alt="WonderKids Teddy Bear" className="w-full h-full object-cover" />
            </div>
            {[['🚀 Space Adventure', 'top-5 -right-2.5', 0], ['🎂 Birthday Planner', 'bottom-15 -left-5', 1.5], ['🎨 Creative Art', 'top-1/2 -right-7', 0.8]].map(([text, pos, delay]) => (
              <div key={text} className={`absolute ${pos} bg-white rounded-xl shadow-lg px-3.5 py-2.5 text-xs font-extrabold flex items-center gap-2 animate-float hidden md:flex`}
                style={{ ...H, animationDelay: `${delay}s` }}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <div className="flex items-center gap-3 bg-white border-2 rounded-full px-5 py-3 transition-colors focus-within:border-[#FF6B6B]" style={{ borderColor: '#F0E6D3' }}>
          <span>🔍</span>
          <input type="text" placeholder="Search toys, categories, themes…" className="flex-1 border-none outline-none bg-transparent text-sm" style={{ color: '#2D3436' }} />
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: '#FF6B6B', color: '#fff' }}>→</button>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs font-extrabold tracking-[2px] uppercase mb-2" style={{ ...H, color: '#FF6B6B' }}>Explore Worlds</div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={H}>10 Magical Categories</h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: '#636E72' }}>Each world is a unique adventure — tap to explore toys, activities, and surprises</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 md:gap-5">
            {CATEGORIES.map((c, i) => (
              <CategoryCard key={c.id} category={c} large={[3, 6].includes(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16" style={{ background: '#FFF5E6' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 mb-4">
            <div>
              <div className="text-xs font-extrabold tracking-[2px] uppercase mb-1" style={{ ...H, color: '#FF6B6B' }}>Trending Now</div>
              <h2 className="text-xl font-extrabold" style={H}>Kids Are Loving</h2>
            </div>
            <button onClick={() => navigate('/categories')} className="px-4 py-2 rounded-full text-xs font-extrabold border-2 transition-all hover:-translate-y-0.5"
              style={{ ...H, color: '#FF6B6B', borderColor: '#FF6B6B', background: 'transparent' }}>
              See All →
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 pb-4 hide-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
            {featured.map(p => (
              <div key={p.id} className="flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                <ProductCard product={p} onClick={setSelectedProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIRTHDAY STRIP */}
      <div className="mx-4 my-5 rounded-[32px] overflow-hidden relative p-8" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53, #FF6B6B)' }}>
        <div className="absolute -top-2.5 left-0 right-0 text-2xl tracking-[20px] opacity-15 text-center pointer-events-none">🎉🎈🎂🎁🎊</div>
        <h3 className="text-white text-xl font-extrabold mb-2" style={H}>🎉 Plan the Perfect Birthday!</h3>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>Our step-by-step birthday planner helps you create magical memories. Choose themes, budget, and get a full party kit!</p>
        <button onClick={() => navigate('/birthday')} className="px-7 py-3 rounded-full font-extrabold transition-all hover:-translate-y-0.5 active:scale-[0.96]"
          style={{ ...H, background: '#fff', color: '#1A1A2E', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
          Start Planning →
        </button>
      </div>

      {/* BRAND VALUES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs font-extrabold tracking-[2px] uppercase mb-2" style={{ ...H, color: '#FF6B6B' }}>Our Promise</div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={H}>Why Parents Trust Us</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🛡️', title: '100% Safe', desc: 'All toys are BIS & EN71 certified. Non-toxic, child-safe materials — always.', bg: '#FFF0F0' },
              { icon: '🌿', title: 'Eco-Friendly', desc: 'Sustainably sourced materials. Recyclable packaging. Planet-first approach.', bg: '#F0FFF4' },
              { icon: '🧠', title: 'Learning Through Play', desc: 'Every product is designed to spark creativity, curiosity, and development.', bg: '#FFF9E6' },
              { icon: '🚚', title: 'Fast Delivery', desc: '2-day delivery across India. Special gift wrapping available on all orders.', bg: '#F0F8FF' },
            ].map(v => (
              <div key={v.title} className="bg-white rounded-[20px] p-6 text-center transition-all hover:-translate-y-1" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1.5px solid #F0E6D3' }}>
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ background: v.bg }}>{v.icon}</div>
                <h4 className="text-sm font-extrabold mb-2" style={{ ...H }}>{v.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#636E72' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ STRIP */}
      <div className="mx-4 mb-5 rounded-[32px] overflow-hidden p-7 relative" style={{ background: 'linear-gradient(135deg, #667EEA, #764BA2)' }}>
        <h3 className="text-white text-lg font-extrabold mb-1.5" style={H}>🎯 Not Sure What to Buy?</h3>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>Take our 60-second quiz and we'll find the perfect toy matched to your child's personality and age.</p>
        <button onClick={() => navigate('/quiz')} className="px-7 py-3 rounded-full font-extrabold transition-all hover:-translate-y-0.5 active:scale-[0.96]"
          style={{ ...H, background: '#fff', color: '#1A1A2E', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
          Take the Quiz →
        </button>
      </div>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="py-16" style={{ background: '#FFFBF5' }}>
          <div className="max-w-7xl mx-auto">
            <div className="px-4 mb-4">
              <div className="text-xs font-extrabold tracking-[2px] uppercase mb-1" style={{ ...H, color: '#FF6B6B' }}>Just Arrived</div>
              <h2 className="text-xl font-extrabold" style={H}>New Arrivals 🌟</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto px-4 pb-4 hide-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
              {newArrivals.map(p => (
                <div key={p.id} className="flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <ProductCard product={p} onClick={setSelectedProduct} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="py-12 mt-10" style={{ background: 'linear-gradient(135deg, #1A1A2E, #2C2C54)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-xs font-extrabold tracking-[2px] uppercase mb-2" style={{ ...H, color: 'rgba(255,255,255,0.5)' }}>Stay Updated</div>
          <h2 className="text-2xl font-extrabold text-white mb-2.5" style={H}>Get Magical Offers 🎁</h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>Subscribe for exclusive deals, new product launches, and parenting tips</p>
          <div className="flex gap-2.5 max-w-md mx-auto rounded-full border p-1.5 pl-5" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
            <input type="email" placeholder="Your email address" className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/40" />
            <button onClick={() => showToast("🎉 You're subscribed!")} className="px-5 py-2.5 rounded-full font-extrabold text-sm whitespace-nowrap"
              style={{ ...H, background: '#FF6B6B', color: '#fff' }}>
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>No spam, unsubscribe anytime.</p>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
