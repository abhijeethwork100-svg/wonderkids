import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const H = { fontFamily: "'Nunito', sans-serif" };

// Themed hero backgrounds
const heroThemes = {
  space: { bg: 'linear-gradient(135deg, #0D1B2A 0%, #1B2838 30%, #0F3460 60%, #16213E 100%)', dark: true },
  jungle: { bg: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 40%, #40916C 70%, #52B788 100%)', dark: true },
  ocean: { bg: 'linear-gradient(180deg, #00B4D8 0%, #0077B6 40%, #023E8A 100%)', dark: true },
  fantasy: { bg: 'linear-gradient(135deg, #200040 0%, #4B0082 40%, #8B00FF 70%, #DA70D6 100%)', dark: true },
  city: { bg: 'linear-gradient(135deg, #2C3E50, #3498DB 60%, #2980B9 100%)', dark: true },
  art: { bg: '#FFFBF5', dark: false },
  clothing: { bg: 'linear-gradient(135deg, #FFECD2, #FCB69F 50%, #FF9A9E 100%)', dark: true },
  cycles: { bg: 'linear-gradient(135deg, #1A1A2E, #16213E, #0F3460)', dark: true },
};

// Decorative elements per category
function HeroDecorations({ catId }) {
  if (catId === 'space') {
    return (
      <>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute w-[2px] h-[2px] bg-white rounded-full animate-twinkle"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0.3 + Math.random() * 0.7, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 2}s` }} />
        ))}
        <div className="absolute text-5xl animate-rocket" style={{ top: '50%', animationDuration: '8s' }}>🚀</div>
      </>
    );
  }
  if (catId === 'jungle') {
    return ['🌿', '🍃', '🌴', '🌱', '🍀'].map((leaf, i) => (
      <div key={i} className="absolute text-3xl opacity-60 animate-sway" style={{ left: `${10 + i * 20}%`, top: `${10 + (i % 3) * 25}%`, animationDelay: `${i * 0.5}s`, animationDuration: `${3 + i}s`, transformOrigin: 'bottom center' }}>
        {leaf}
      </div>
    ));
  }
  if (catId === 'ocean') {
    return (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: 6 + Math.random() * 12, height: 6 + Math.random() * 12,
            left: `${Math.random() * 100}%`, bottom: '-20px',
            background: 'rgba(255,255,255,0.15)',
            animation: `bubble-rise ${3 + Math.random() * 3}s ease-in infinite`,
            animationDelay: `${Math.random() * 4}s`
          }} />
        ))}
        <svg className="absolute bottom-[-2px] left-0 right-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60 }}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#FFFBF5" />
        </svg>
      </>
    );
  }
  if (catId === 'fantasy') {
    return ['✨', '⭐', '💫', '🌟', '✨', '⭐'].map((s, i) => (
      <div key={i} className="absolute animate-sparkle" style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 20}%`, fontSize: '1rem', animationDelay: `${i * 0.4}s`, animationDuration: `${1.5 + i * 0.3}s` }}>
        {s}
      </div>
    ));
  }
  if (catId === 'city') {
    return (
      <>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="absolute h-[1px]" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            top: `${20 + i * 15}%`, animation: `speed-line ${1 + i * 0.3}s linear infinite`, animationDelay: `${i * 0.5}s`
          }} />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center px-5 gap-5" style={{ background: '#34495E' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-10 h-[3px] rounded flex-shrink-0" style={{ background: '#F1C40F' }} />
          ))}
        </div>
        {['🚗', '🚕', '🚌'].map((car, i) => (
          <div key={i} className="absolute text-xl animate-car" style={{ bottom: 8, animationDuration: `${5 + i * 2}s`, animationDelay: `${i * 2}s` }}>
            {car}
          </div>
        ))}
      </>
    );
  }
  if (catId === 'art') {
    return [
      { color: '#FF6B6B', size: 120, left: '10%', top: '20%', delay: '0s' },
      { color: '#4ECDC4', size: 90, left: '60%', top: '10%', delay: '1s' },
      { color: '#FFE66D', size: 100, left: '75%', top: '50%', delay: '2s' },
      { color: '#9B59B6', size: 80, left: '25%', top: '60%', delay: '0.5s' },
    ].map((b, i) => (
      <div key={i} className="absolute opacity-40 animate-blob" style={{
        width: b.size, height: b.size, background: b.color,
        left: b.left, top: b.top, animationDelay: b.delay,
        borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', animationDuration: `${4 + i}s`
      }} />
    ));
  }
  return null;
}

const filters = ['All', 'Best Sellers', 'New', 'Top Rated', 'Under ₹1000', 'STEM'];

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const category = getCategoryById(categoryId);
  const allProducts = getProductsByCategory(categoryId);
  const theme = heroThemes[categoryId] || heroThemes.space;

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return allProducts;
    if (activeFilter === 'Best Sellers') return allProducts.filter(p => p.badge === 'Best Seller');
    if (activeFilter === 'New') return allProducts.filter(p => p.badge === 'New');
    if (activeFilter === 'Top Rated') return allProducts.filter(p => p.rating >= 5);
    if (activeFilter === 'Under ₹1000') return allProducts.filter(p => p.price < 1000);
    if (activeFilter === 'STEM') return allProducts.filter(p => p.benefits.some(b => b.toLowerCase().includes('stem')));
    return allProducts;
  }, [allProducts, activeFilter]);

  if (!category) return <div className="p-10 text-center">Category not found</div>;

  return (
    <div className="pb-[72px] md:pb-0">
      {/* HERO */}
      <div className="relative overflow-hidden flex items-center min-h-[300px] py-16 px-5"
        style={{ background: theme.bg }}>
        <HeroDecorations catId={categoryId} />
        {theme.dark && <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)' }} />}
        <div className="max-w-7xl mx-auto relative z-10 w-full" style={{ color: theme.dark ? '#fff' : '#2D3436' }}>
          <button onClick={() => navigate('/categories')}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mb-4 text-xs font-bold cursor-pointer border"
            style={{ ...H, background: theme.dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)', backdropFilter: 'blur(8px)', color: theme.dark ? '#fff' : '#2D3436', borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}>
            ← Back
          </button>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={H}>{category.icon} {category.name}</h1>
          <p className="text-sm opacity-85 max-w-md leading-relaxed">{category.count} curated products for little explorers</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 overflow-x-auto px-4 py-4 hide-scrollbar">
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className="flex-shrink-0 px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all"
            style={{ ...H, background: activeFilter === f ? '#FF6B6B' : '#fff', color: activeFilter === f ? '#fff' : '#636E72', borderColor: activeFilter === f ? '#FF6B6B' : '#F0E6D3' }}>
            {f}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 px-4 pb-6">
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-extrabold mb-2" style={H}>No products found</h3>
            <p className="text-sm" style={{ color: '#636E72' }}>Try a different filter</p>
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
