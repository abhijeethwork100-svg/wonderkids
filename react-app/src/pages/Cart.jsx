import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { getProductById } from '../data/products';

const H = { fontFamily: "'Nunito', sans-serif" };

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, getCartTotal, getCartCount, showToast } = useStore();
  const total = getCartTotal();
  const count = getCartCount();

  return (
    <div className="pb-[72px] md:pb-0 px-4 py-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-extrabold" style={H}>🛒 My Cart</h2>
        <span className="text-sm font-bold" style={{ ...H, color: '#636E72' }}>{count} items</span>
      </div>

      {cart.length > 0 ? (
        <>
          {cart.map(item => {
            const p = getProductById(item.productId);
            if (!p) return null;
            return (
              <div key={item.productId} className="flex gap-3.5 rounded-[20px] p-3.5 mb-3" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                {/* Image */}
                <div className="w-[72px] h-[72px] rounded-xl flex-shrink-0 flex items-center justify-center text-3xl" style={{ background: '#FFF5E6' }}>
                  {p.emoji}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-extrabold mb-1 truncate" style={{ ...H, color: '#1A1A2E' }}>{p.name}</h4>
                  <div className="text-[0.72rem] mb-2" style={{ color: '#636E72' }}>{p.tag}</div>
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => updateQty(item.productId, item.qty - 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-base font-extrabold"
                      style={{ ...H, background: '#FFF5E6', color: '#1A1A2E' }}>−</button>
                    <span className="text-sm font-extrabold min-w-[20px] text-center" style={H}>{item.qty}</span>
                    <button onClick={() => updateQty(item.productId, item.qty + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-base font-extrabold"
                      style={{ ...H, background: '#FFF5E6', color: '#1A1A2E' }}>+</button>
                  </div>
                </div>
                {/* Price + Remove */}
                <div className="flex flex-col items-end justify-between">
                  <span className="text-sm font-black" style={{ ...H }}>₹{(p.price * item.qty).toLocaleString()}</span>
                  <button onClick={() => removeFromCart(item.productId)} className="text-xs" style={{ color: '#636E72' }}>Remove</button>
                </div>
              </div>
            );
          })}

          {/* Summary */}
          <div className="rounded-[20px] p-5 mt-4" style={{ background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <div className="flex justify-between mb-2.5 text-sm"><span>Subtotal</span><span className="font-bold">₹{total.toLocaleString()}</span></div>
            <div className="flex justify-between mb-2.5 text-sm"><span>Delivery</span><span className="font-bold" style={{ color: '#2ECC71' }}>FREE</span></div>
            <div className="flex justify-between pt-2.5 text-lg font-black" style={{ ...H, borderTop: '1.5px solid #F0E6D3' }}>
              <span>Total</span><span style={{ color: '#FF6B6B' }}>₹{total.toLocaleString()}</span>
            </div>
            <button onClick={() => showToast('🎉 Checkout coming soon!')} className="w-full mt-4 py-3.5 rounded-full font-extrabold text-white transition-all active:scale-[0.97]"
              style={{ ...H, background: '#FF6B6B', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}>
              Proceed to Checkout →
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-extrabold mb-2" style={H}>Your cart is empty</h3>
          <p className="text-sm mb-6" style={{ color: '#636E72' }}>Add some magical toys to get started!</p>
          <button onClick={() => navigate('/categories')} className="px-7 py-3 rounded-full font-extrabold text-white transition-all active:scale-[0.97]"
            style={{ ...H, background: '#FF6B6B', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}>
            Shop Now →
          </button>
        </div>
      )}
    </div>
  );
}
