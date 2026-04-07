import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const H = { fontFamily: "'Nunito', sans-serif" };

const items = [
  { path: '/', icon: '🏠', label: 'Home' },
  { path: '/categories', icon: '🧩', label: 'Explore' },
  { path: '/birthday', icon: '🎂', label: 'Birthday' },
  { path: '/wishlist', icon: '❤️', label: 'Wishlist' },
  { path: '/cart', icon: '🛒', label: 'Cart' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useStore();
  const count = getCartCount();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[999] h-[72px] grid grid-cols-5 px-2 md:hidden"
      style={{ background: 'rgba(255,251,245,0.98)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderTop: '1.5px solid #F0E6D3', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {items.map(item => {
        const active = location.pathname === item.path || (item.path === '/categories' && location.pathname.startsWith('/category/'));
        return (
          <button key={item.path} onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center gap-[3px] rounded-2xl transition-all relative p-2">
            <span className="text-xl transition-transform" style={{ transform: active ? 'scale(1.2)' : 'scale(1)' }}>{item.icon}</span>
            <span className="text-[0.65rem] font-bold transition-colors" style={{ ...H, color: active ? '#FF6B6B' : '#636E72' }}>{item.label}</span>
            {item.path === '/cart' && count > 0 && (
              <span className="absolute top-1.5 right-[20%] w-[7px] h-[7px] rounded-full border-2" style={{ background: '#FF6B6B', borderColor: '#FFFBF5' }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
