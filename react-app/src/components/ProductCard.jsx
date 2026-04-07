import { useStore } from '../context/StoreContext';
import { getCategoryById } from '../data/products';

const H = { fontFamily: "'Nunito', sans-serif" };

export default function ProductCard({ product, onClick }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const cat = getCategoryById(product.cat);
  const stars = '⭐'.repeat(Math.min(product.rating, 5));

  return (
    <div className="rounded-[20px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.97] relative"
      style={{ background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', minWidth: 200, maxWidth: 260 }}
      onClick={() => onClick?.(product)}>

      {/* Image Area */}
      <div className="w-full aspect-square overflow-hidden relative">
        <div className="w-full h-full flex items-center justify-center text-5xl"
          style={{ background: `linear-gradient(135deg, ${cat?.color || '#FF6B6B'}22, ${cat?.color || '#FF6B6B'}44)` }}>
          {product.emoji}
        </div>

        {/* Wishlist */}
        <button className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md transition-transform hover:scale-110"
          style={{ background: wished ? '#FFE4E1' : '#fff' }}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}>
          {wished ? '❤️' : '🤍'}
        </button>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.7rem] font-extrabold"
              style={{ ...H, background: '#FFE66D', color: '#1A1A2E' }}>
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 pb-4">
        <div className="text-[0.68rem] font-bold uppercase tracking-wider mb-1" style={{ color: '#FF6B6B' }}>{product.tag}</div>
        <h4 className="text-[0.88rem] font-extrabold leading-tight mb-1.5" style={{ ...H, color: '#1A1A2E' }}>{product.name}</h4>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-[0.65rem]">{stars}</span>
          <span className="text-[0.68rem]" style={{ color: '#636E72' }}>({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base font-black" style={{ ...H, color: '#1A1A2E' }}>₹{product.price.toLocaleString()}</span>
          {product.old && <span className="text-[0.78rem] line-through" style={{ color: '#636E72' }}>₹{product.old.toLocaleString()}</span>}
        </div>
        <button className="w-full py-2.5 rounded-xl text-[0.82rem] font-extrabold transition-all hover:opacity-90 active:scale-[0.97]"
          style={{ ...H, background: '#FF6B6B', color: '#fff' }}
          onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}>
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}
