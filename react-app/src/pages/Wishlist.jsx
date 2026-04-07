import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { getProductById } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const H = { fontFamily: "'Nunito', sans-serif" };

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist } = useStore();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const items = wishlist.map(getProductById).filter(Boolean);

  return (
    <div className="pb-[72px] md:pb-0 px-4 py-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-extrabold" style={H}>❤️ My Wishlist</h2>
        <span className="text-sm font-bold" style={{ ...H, color: '#636E72' }}>{items.length} items</span>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {items.map(p => (
            <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">❤️</div>
          <h3 className="text-xl font-extrabold mb-2" style={H}>Your wishlist is empty</h3>
          <p className="text-sm mb-6" style={{ color: '#636E72' }}>Save items you love by tapping the heart icon</p>
          <button onClick={() => navigate('/categories')} className="px-7 py-3 rounded-full font-extrabold text-white transition-all active:scale-[0.97]"
            style={{ ...H, background: '#FF6B6B', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}>
            Explore Products →
          </button>
        </div>
      )}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
