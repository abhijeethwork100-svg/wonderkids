import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '../data/products';

const H = { fontFamily: "'Nunito', sans-serif" };

const questions = [
  { q: '1. How old is your child?', opts: [
    { icon: '👶', text: '2–3 years old', val: '2-3' },
    { icon: '🧒', text: '3–5 years old', val: '3-5' },
    { icon: '👦', text: '5–6 years old', val: '5-6' },
    { icon: '🧑', text: '6–8 years old', val: '6-8' },
  ]},
  { q: "2. What's your child's favourite activity?", opts: [
    { icon: '🏃', text: 'Running, jumping, being active', val: 'active' },
    { icon: '🎨', text: 'Drawing, painting, crafting', val: 'creative' },
    { icon: '🌟', text: 'Pretend play & storytelling', val: 'imaginative' },
    { icon: '🧩', text: 'Puzzles & building things', val: 'learning' },
  ]},
  { q: '3. What world excites them most?', opts: [
    { icon: '🚀', text: 'Outer Space & Science', val: 'space' },
    { icon: '🦁', text: 'Animals & Nature', val: 'jungle' },
    { icon: '🏰', text: 'Magic & Fantasy Worlds', val: 'fantasy' },
    { icon: '🚗', text: 'Cars, Trains & Cities', val: 'city' },
  ]},
  { q: "4. What's your budget?", opts: [
    { icon: '💚', text: 'Under ₹500', val: 'low' },
    { icon: '💛', text: '₹500 – ₹1,500', val: 'mid' },
    { icon: '🧡', text: '₹1,500 – ₹3,000', val: 'high' },
    { icon: '💎', text: '₹3,000+', val: 'premium' },
  ]},
  { q: '5. Is this a gift?', opts: [
    { icon: '🎁', text: "Yes — it's a gift!", val: 'gift' },
    { icon: '🎂', text: 'Yes — birthday gift!', val: 'birthday' },
    { icon: '🏠', text: "No, it's for everyday play", val: 'everyday' },
    { icon: '🎉', text: "It's a surprise!", val: 'surprise' },
  ]},
];

const catMap = { space: 'space', jungle: 'jungle', fantasy: 'fantasy', city: 'city' };
const catIcons = { space: '🚀', jungle: '🦁', fantasy: '🏰', city: '🚗' };
const catNames = { space: 'Space Adventure', jungle: 'Jungle Safari', fantasy: 'Fantasy Kingdom', city: 'City & Vehicles' };

export default function GiftQuiz() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const select = (qIdx, val) => {
    const newAnswers = { ...answers, [qIdx]: val };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (qIdx < questions.length - 1) {
        setCurrent(qIdx + 1);
      } else {
        setDone(true);
      }
    }, 300);
  };

  const matchedCat = answers[2] || 'space';
  const recs = getProductsByCategory(catMap[matchedCat] || 'space').slice(0, 3);
  const progress = done ? 100 : ((current + 1) / questions.length) * 100;

  const restart = () => { setCurrent(0); setAnswers({}); setDone(false); };

  return (
    <div className="pb-[72px] md:pb-0">
      {/* Hero */}
      <div className="text-center px-4 py-8 pb-10 text-white" style={{ background: 'linear-gradient(135deg, #667EEA, #764BA2)', borderRadius: '0 0 32px 32px' }}>
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mb-3 text-xs font-bold cursor-pointer"
          style={{ ...H, background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
          ← Back
        </button>
        <h1 className="text-3xl font-extrabold mb-2" style={H}>🎯 Find My Perfect Toy</h1>
        <p className="text-sm opacity-85">Answer 5 quick questions — we'll match your child with the ideal toy!</p>
      </div>

      <div className="px-4 py-6">
        {/* Progress */}
        <div className="h-1.5 rounded-full overflow-hidden mb-6" style={{ background: '#F0E6D3' }}>
          <div className="h-full rounded-full transition-all duration-400" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #9B59B6, #FF6B6B)' }} />
        </div>

        {/* Questions */}
        {!done && (
          <div>
            <h3 className="text-lg font-extrabold mb-5" style={H}>{questions[current].q}</h3>
            <div className="grid gap-2.5">
              {questions[current].opts.map(opt => (
                <button key={opt.val} onClick={() => select(current, opt.val)}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl border-2 text-left font-bold text-sm transition-all"
                  style={{
                    ...H,
                    borderColor: answers[current] === opt.val ? '#9B59B6' : '#F0E6D3',
                    background: answers[current] === opt.val ? 'rgba(155,89,182,0.08)' : '#fff',
                    color: answers[current] === opt.val ? '#9B59B6' : '#2D3436'
                  }}>
                  <span className="text-xl">{opt.icon}</span>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {done && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">{catIcons[matchedCat] || '🚀'}</div>
            <h2 className="text-2xl font-extrabold mb-2" style={H}>Perfect Match Found!</h2>
            <p className="text-sm mb-6" style={{ color: '#636E72' }}>Based on your answers, we recommend the <strong>{catNames[matchedCat]}</strong> collection!</p>

            <div className="rounded-[20px] p-5 mb-6 text-left" style={{ background: '#FFF5E6' }}>
              {recs.map(p => (
                <div key={p.id} className="flex items-center gap-3 py-3 border-b last:border-b-0" style={{ borderColor: '#F0E6D3' }}>
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="flex-1">
                    <div className="text-sm font-extrabold" style={H}>{p.name}</div>
                    <div className="text-xs" style={{ color: '#636E72' }}>⭐ {p.rating} · {p.reviews} reviews</div>
                  </div>
                  <span className="font-extrabold text-sm" style={{ ...H, color: '#FF6B6B' }}>₹{p.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <button onClick={() => navigate(`/category/${matchedCat}`)}
              className="w-full py-3.5 rounded-full font-extrabold text-white mb-3 transition-all active:scale-[0.97]"
              style={{ ...H, background: '#FF6B6B', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}>
              Explore {catNames[matchedCat]} →
            </button>
            <button onClick={restart}
              className="w-full py-3.5 rounded-full font-extrabold border transition-all"
              style={{ ...H, color: '#636E72', borderColor: '#F0E6D3', background: 'transparent' }}>
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
