import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/products';

const H = { fontFamily: "'Nunito', sans-serif" };

export default function NavDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const go = (path) => { navigate(path); onClose(); };

  const extra = [
    { path: '/quiz', icon: '🎯', label: 'Find My Toy Quiz', bg: '#EDE7F6' },
    { path: '/wishlist', icon: '❤️', label: 'Wishlist', bg: '#FCE4EC' },
    { path: '/cart', icon: '🛒', label: 'Cart', bg: '#E3F2FD' },
  ];

  return (
    <>
      {/* Overlay */}
      <div className={`fixed inset-0 z-[1999] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }} onClick={onClose} />

      {/* Drawer */}
      <div className={`fixed top-0 w-80 h-full z-[2000] overflow-y-auto p-6 transition-all duration-350 ${open ? 'right-0' : '-right-80'}`}
        style={{ background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.15)' }}>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8C42)' }}>🧸</div>
          <strong className="text-lg" style={H}>WonderKids</strong>
          <button onClick={onClose} className="ml-auto w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: '#FFF5E6' }}>✕</button>
        </div>

        {/* Home */}
        <button onClick={() => go('/')} className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl mb-1 w-full text-left font-bold hover:bg-[rgba(255,107,107,0.08)] transition-all" style={{ ...H, color: '#2D3436' }}>
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg" style={{ background: '#FFF0F0' }}>🏠</div>Home
        </button>

        {/* Categories */}
        {CATEGORIES.map(c => {
          const path = ['birthday', 'custom'].includes(c.id) ? `/${c.id}` : `/category/${c.id}`;
          return (
            <button key={c.id} onClick={() => go(path)} className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl mb-1 w-full text-left font-bold hover:bg-[rgba(255,107,107,0.08)] transition-all" style={{ ...H, color: '#2D3436' }}>
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg" style={{ background: `${c.color}15` }}>{c.icon}</div>
              {c.name}
            </button>
          );
        })}

        {/* Extra Links */}
        <div className="mt-4 pt-4" style={{ borderTop: '1.5px solid #F0E6D3' }}>
          {extra.map(e => (
            <button key={e.path} onClick={() => go(e.path)} className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl mb-1 w-full text-left font-bold hover:bg-[rgba(255,107,107,0.08)] transition-all" style={{ ...H, color: '#2D3436' }}>
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg" style={{ background: e.bg }}>{e.icon}</div>
              {e.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
