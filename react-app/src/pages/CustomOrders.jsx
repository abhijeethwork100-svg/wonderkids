import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const H = { fontFamily: "'Nunito', sans-serif" };

const types = [
  { id: 'puzzle', icon: '🧩', name: 'Name Puzzle' },
  { id: 'plush', icon: '🧸', name: 'Custom Plush' },
  { id: 'clothing', icon: '👕', name: 'Printed Clothing' },
  { id: 'gift', icon: '🎁', name: 'Gift Box' },
];

export default function CustomOrders() {
  const navigate = useNavigate();
  const { showToast } = useStore();
  const [selectedType, setSelectedType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('✨ Custom order submitted! We\'ll contact you soon.');
  };

  return (
    <div className="pb-[72px] md:pb-0 px-4 py-4">
      {/* Hero */}
      <div className="rounded-[32px] p-8 mb-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F5F7FA, #C3CFE2)' }}>
        <div>
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mb-3 text-xs font-bold cursor-pointer"
            style={{ ...H, background: 'rgba(0,0,0,0.06)', color: '#2D3436' }}>← Back</button>
          <h2 className="text-2xl font-extrabold mb-2" style={H}>✨ Custom Orders</h2>
          <p className="text-sm" style={{ color: '#636E72' }}>Personalized toys & gifts crafted with love — your vision, our craftsmanship.</p>
        </div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-4xl opacity-25">🎨🪆🧩</div>
      </div>

      {/* Type Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {types.map(t => (
          <button key={t.id} onClick={() => setSelectedType(t.id)}
            className="bg-white rounded-[20px] p-4 text-center border-2 transition-all cursor-pointer"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)', borderColor: selectedType === t.id ? '#FF6B6B' : 'transparent' }}>
            <div className="text-3xl mb-2">{t.icon}</div>
            <div className="text-sm font-extrabold" style={H}>{t.name}</div>
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-bold mb-1.5 block" style={{ ...H, color: '#1A1A2E' }}>Child's Name</label>
            <input type="text" placeholder="e.g. Arya" required className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors focus:border-[#FF6B6B]" style={{ borderColor: '#F0E6D3', background: '#fff' }} />
          </div>
          <div>
            <label className="text-sm font-bold mb-1.5 block" style={{ ...H, color: '#1A1A2E' }}>Age</label>
            <select className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors focus:border-[#FF6B6B]" style={{ borderColor: '#F0E6D3', background: '#fff' }}>
              {[2,3,4,5,6,7,8].map(a => <option key={a}>{a} years</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-bold mb-1.5 block" style={{ ...H, color: '#1A1A2E' }}>Personalization Details</label>
          <textarea placeholder="Describe what you'd like — e.g. Name 'Arya', space theme, blue colors, include a rocket..."
            className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none resize-y min-h-[100px] transition-colors focus:border-[#FF6B6B]"
            style={{ borderColor: '#F0E6D3', background: '#fff' }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-bold mb-1.5 block" style={{ ...H, color: '#1A1A2E' }}>Quantity</label>
            <input type="number" min="1" defaultValue="1" className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors focus:border-[#FF6B6B]" style={{ borderColor: '#F0E6D3', background: '#fff' }} />
          </div>
          <div>
            <label className="text-sm font-bold mb-1.5 block" style={{ ...H, color: '#1A1A2E' }}>Occasion</label>
            <select className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors focus:border-[#FF6B6B]" style={{ borderColor: '#F0E6D3', background: '#fff' }}>
              {['Birthday', 'Festival Gift', 'Baby Shower', 'School Event', 'Just Because!'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-bold mb-1.5 block" style={{ ...H, color: '#1A1A2E' }}>Upload Reference Image (optional)</label>
          <div className="border-2 border-dashed rounded-[20px] p-8 text-center cursor-pointer transition-colors hover:border-[#FF6B6B]" style={{ borderColor: '#F0E6D3', background: '#FFF5E6' }}>
            <div className="text-3xl mb-2">📸</div>
            <p className="text-xs" style={{ color: '#636E72' }}>Tap to upload a photo or sketch</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-bold mb-1.5 block" style={{ ...H, color: '#1A1A2E' }}>Contact Name</label>
            <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors focus:border-[#FF6B6B]" style={{ borderColor: '#F0E6D3', background: '#fff' }} />
          </div>
          <div>
            <label className="text-sm font-bold mb-1.5 block" style={{ ...H, color: '#1A1A2E' }}>Phone / WhatsApp</label>
            <input type="tel" placeholder="+91 xxxxxxxxxx" className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors focus:border-[#FF6B6B]" style={{ borderColor: '#F0E6D3', background: '#fff' }} />
          </div>
        </div>
        <button type="submit" className="w-full py-3.5 rounded-full font-extrabold text-white transition-all active:scale-[0.97]"
          style={{ ...H, background: '#FF6B6B', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}>
          ✨ Submit Custom Order
        </button>
      </form>
    </div>
  );
}
