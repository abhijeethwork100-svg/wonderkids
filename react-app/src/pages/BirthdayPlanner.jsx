import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const H = { fontFamily: "'Nunito', sans-serif" };

const themes = [
  { icon: '🚀', name: 'Space Adventure', desc: 'Rockets, stars & astronauts' },
  { icon: '🦁', name: 'Jungle Safari', desc: 'Wild animals & nature' },
  { icon: '🐠', name: 'Ocean Party', desc: 'Mermaids & sea creatures' },
  { icon: '🏰', name: 'Fantasy Kingdom', desc: 'Princesses, knights & magic' },
  { icon: '🎨', name: 'Art & Craft', desc: 'Creative & colourful' },
  { icon: '🚗', name: 'City Heroes', desc: 'Cars, trucks & builders' },
];

function generateKit(theme, budget) {
  const base = [
    { icon: '🎈', name: `${theme} Balloon Set (20pc)`, price: Math.round(budget * 0.08) },
    { icon: '🍽️', name: `${theme} Plates & Cups (20pc)`, price: Math.round(budget * 0.1) },
    { icon: '🎊', name: `${theme} Banner & Decorations`, price: Math.round(budget * 0.12) },
    { icon: '🎂', name: `${theme} Cake Topper Set`, price: Math.round(budget * 0.06) },
    { icon: '🎮', name: `${theme} Activity Kit (5 games)`, price: Math.round(budget * 0.2) },
    { icon: '🎁', name: `${theme} Return Gifts (20pc)`, price: Math.round(budget * 0.35) },
    { icon: '💌', name: 'Digital Invitations', price: 0 },
  ];
  if (budget >= 5000) base.push({ icon: '📸', name: 'Photo Booth Props Set', price: Math.round(budget * 0.09) });
  if (budget >= 10000) base.push({ icon: '🎪', name: 'Mini Stage Setup Kit', price: Math.round(budget * 0.15) });
  return base;
}

export default function BirthdayPlanner() {
  const navigate = useNavigate();
  const { addToCart, showToast } = useStore();
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState('');
  const [budget, setBudget] = useState(5000);
  const [age, setAge] = useState('');
  const [kidsCount, setKidsCount] = useState(20);

  const kit = generateKit(theme || 'Party', budget);
  const kitTotal = kit.reduce((s, i) => s + i.price, 0);

  const goNext = () => { if (step < 4) setStep(step + 1); };
  const goBack = () => { if (step > 1) setStep(step - 1); };

  const addKitToCart = () => {
    // Add party kit (id 22) to cart
    addToCart(22);
    showToast('🎉 Party Kit added to cart!');
  };

  return (
    <div className="pb-[72px] md:pb-0">
      {/* Hero */}
      <div className="relative overflow-hidden px-5 py-8 pb-10" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' }}>
        <div className="absolute -top-2 left-0 right-0 text-2xl tracking-[15px] opacity-15 text-center pointer-events-none">🎉🎈🎂🎁🎊</div>
        <div className="relative z-10 text-white">
          <button onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mb-4 text-xs font-bold cursor-pointer border"
            style={{ ...H, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
            ← Back
          </button>
          <h1 className="text-3xl font-extrabold mb-2" style={H}>🎂 Birthday Planner</h1>
          <p className="text-sm opacity-85">Create the most magical birthday party ever in 4 easy steps!</p>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Progress */}
        <div className="flex items-center mb-8">
          {[1, 2, 3, 4].map((s, i) => (
            <div key={s} className="contents">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0 border-[2.5px] relative z-10 transition-all"
                style={{
                  ...H,
                  borderColor: s <= step ? '#FF6B6B' : '#F0E6D3',
                  color: s < step ? '#fff' : s === step ? '#FF6B6B' : '#636E72',
                  background: s < step ? '#FF6B6B' : s === step ? 'rgba(255,107,107,0.08)' : '#fff'
                }}>
                {s < step ? '✓' : s}
              </div>
              {i < 3 && <div className="flex-1 h-0.5 transition-all" style={{ background: s < step ? '#FF6B6B' : '#F0E6D3' }} />}
            </div>
          ))}
        </div>

        {/* Step 1: Theme */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-extrabold mb-1.5" style={H}>🎨 Choose a Theme</h3>
            <p className="text-sm mb-6" style={{ color: '#636E72' }}>What kind of party does your little one dream of?</p>
            <div className="grid grid-cols-2 gap-3">
              {themes.map(t => (
                <button key={t.name} onClick={() => setTheme(t.name)}
                  className="border-[2.5px] rounded-[20px] p-4 text-center transition-all cursor-pointer"
                  style={{ borderColor: theme === t.name ? '#FF6B6B' : '#F0E6D3', background: theme === t.name ? 'rgba(255,107,107,0.05)' : '#fff' }}>
                  <div className="text-4xl mb-2">{t.icon}</div>
                  <h4 className="text-sm font-extrabold mb-1" style={H}>{t.name}</h4>
                  <p className="text-[0.72rem]" style={{ color: '#636E72' }}>{t.desc}</p>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button onClick={goNext} className="w-full py-3.5 rounded-full font-extrabold text-white transition-all active:scale-[0.97]"
                style={{ ...H, background: '#FF6B6B', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}>
                Next: Set Budget →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Budget */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-extrabold mb-1.5" style={H}>💰 Set Your Budget</h3>
            <p className="text-sm mb-6" style={{ color: '#636E72' }}>Slide to set your total party budget — we'll suggest the best packages!</p>
            <div className="mb-8">
              <div className="text-center text-3xl font-black mb-3" style={{ ...H, color: '#FF6B6B' }}>₹{budget.toLocaleString()}</div>
              <input type="range" min="1000" max="20000" step="500" value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none outline-none cursor-pointer"
                style={{ background: '#F0E6D3', accentColor: '#FF6B6B' }} />
              <div className="flex justify-between mt-1.5 text-xs font-bold" style={{ ...H, color: '#636E72' }}>
                <span>₹1,000</span><span>₹20,000</span>
              </div>
            </div>
            <p className="text-xs mb-4" style={{ color: '#636E72' }}>Budget includes: Decorations, cake, return gifts & activity kits</p>
            <div className="flex gap-3">
              <button onClick={goBack} className="px-5 py-3.5 rounded-full font-extrabold border transition-all"
                style={{ ...H, color: '#636E72', borderColor: '#F0E6D3', background: 'transparent' }}>← Back</button>
              <button onClick={goNext} className="flex-1 py-3.5 rounded-full font-extrabold text-white transition-all active:scale-[0.97]"
                style={{ ...H, background: '#FF6B6B', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}>
                Next: Kids' Age →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Age */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-extrabold mb-1.5" style={H}>👶 Kids' Age Group</h3>
            <p className="text-sm mb-6" style={{ color: '#636E72' }}>How old is the birthday star? We'll tailor activities & gifts perfectly.</p>
            <div className="flex gap-2.5 flex-wrap mb-6">
              {['2–3 yrs', '3–4 yrs', '4–5 yrs', '5–6 yrs', '6–7 yrs', '7–8 yrs', 'Mixed ages'].map(a => (
                <button key={a} onClick={() => setAge(a)}
                  className="px-5 py-2.5 rounded-full border-2 text-sm font-bold transition-all"
                  style={{ ...H, background: age === a ? '#4ECDC4' : '#fff', borderColor: age === a ? '#4ECDC4' : '#F0E6D3', color: age === a ? '#fff' : '#636E72' }}>
                  {a}
                </button>
              ))}
            </div>
            <div className="mb-6">
              <label className="text-sm font-bold mb-1.5 block" style={{ ...H, color: '#1A1A2E' }}>Number of kids attending</label>
              <input type="number" min="5" max="200" value={kidsCount} onChange={(e) => setKidsCount(Number(e.target.value))}
                placeholder="e.g. 20"
                className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors focus:border-[#FF6B6B]"
                style={{ borderColor: '#F0E6D3', background: '#fff', color: '#2D3436' }} />
            </div>
            <div className="flex gap-3">
              <button onClick={goBack} className="px-5 py-3.5 rounded-full font-extrabold border transition-all"
                style={{ ...H, color: '#636E72', borderColor: '#F0E6D3', background: 'transparent' }}>← Back</button>
              <button onClick={goNext} className="flex-1 py-3.5 rounded-full font-extrabold text-white transition-all active:scale-[0.97]"
                style={{ ...H, background: '#FF6B6B', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}>
                See My Party Kit 🎉
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Kit Output */}
        {step === 4 && (
          <div>
            <h3 className="text-xl font-extrabold mb-1.5" style={H}>🎉 Your Party Kit is Ready!</h3>
            <p className="text-sm mb-4" style={{ color: '#636E72' }}>Based on your choices, here's everything you need for the perfect birthday!</p>
            <div className="rounded-[20px] p-6" style={{ background: 'linear-gradient(135deg, #FFF5F5, #FFF9E6)' }}>
              <h3 className="text-lg font-extrabold mb-4" style={{ ...H, color: '#FF6B6B' }}>🎁 {theme || 'Custom'} Party Package</h3>
              <div className="grid gap-2.5">
                {kit.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="flex-1 text-sm font-bold" style={{ ...H }}>{item.name}</span>
                    <span className="text-sm font-extrabold" style={{ ...H, color: '#FF6B6B' }}>
                      {item.price === 0 ? 'FREE' : `₹${item.price.toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 flex justify-between items-center" style={{ borderTop: '1.5px solid #F0E6D3' }}>
                <div>
                  <div className="text-xs" style={{ color: '#636E72' }}>Total Estimate</div>
                  <div className="text-2xl font-black" style={{ ...H, color: '#FF6B6B' }}>₹{kitTotal.toLocaleString()}</div>
                </div>
                <button onClick={addKitToCart} className="px-6 py-3 rounded-full font-extrabold text-white transition-all active:scale-[0.97]"
                  style={{ ...H, background: '#FF6B6B', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}>
                  Add All to Cart 🛒
                </button>
              </div>
            </div>
            <button onClick={goBack} className="w-full mt-5 py-3.5 rounded-full font-extrabold border transition-all"
              style={{ ...H, color: '#636E72', borderColor: '#F0E6D3', background: 'transparent' }}>
              ← Adjust Choices
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
