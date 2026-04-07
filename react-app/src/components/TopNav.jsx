import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import NavDrawer from './NavDrawer';

const H = { fontFamily: "'Nunito', sans-serif" };

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const count = getCartCount();
  const path = location.pathname;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/categories', label: 'Categories' },
    { to: '/birthday', label: '🎂 Birthday' },
    { to: '/custom', label: '✨ Custom' },
    { to: '/quiz', label: '🎯 Quiz' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[1000] h-16 border-b" style={{ background: 'rgba(255,251,245,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderColor: '#F0E6D3' }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8C42)', boxShadow: '0 4px 12px rgba(255,107,107,0.4)' }}>🧸</div>
            <span className="text-xl font-black" style={{ ...H, color: '#1A1A2E' }}>Wonder<span style={{ color: '#FF6B6B' }}>Kids</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <button key={l.to} onClick={() => navigate(l.to)}
                className="px-3.5 py-2 rounded-full text-sm font-bold transition-all"
                style={{ ...H, color: path === l.to ? '#FF6B6B' : '#636E72', background: path === l.to ? 'rgba(255,107,107,0.08)' : 'transparent' }}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button onClick={() => navigate('/wishlist')} className="w-10 h-10 rounded-full flex items-center justify-center text-lg border transition-all hover:border-[#FF6B6B]" style={{ background: '#fff', borderColor: '#F0E6D3' }}>❤️</button>
            <button onClick={() => navigate('/cart')} className="w-10 h-10 rounded-full flex items-center justify-center text-lg border transition-all hover:border-[#FF6B6B] relative" style={{ background: '#fff', borderColor: '#F0E6D3' }}>
              🛒
              {count > 0 && <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full text-[0.65rem] font-extrabold flex items-center justify-center border-2" style={{ background: '#FF6B6B', color: '#fff', borderColor: '#FFFBF5' }}>{count}</span>}
            </button>
            <button onClick={() => setDrawerOpen(true)} className="md:hidden w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[5px] border" style={{ background: '#fff', borderColor: '#F0E6D3' }}>
              <span className="w-[18px] h-0.5 rounded-full" style={{ background: '#2D3436' }} />
              <span className="w-[18px] h-0.5 rounded-full" style={{ background: '#2D3436' }} />
              <span className="w-[18px] h-0.5 rounded-full" style={{ background: '#2D3436' }} />
            </button>
          </div>
        </div>
      </nav>
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
