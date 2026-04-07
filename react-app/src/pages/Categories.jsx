import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import CategoryCard from '../components/CategoryCard';

const H = { fontFamily: "'Nunito', sans-serif" };

export default function Categories() {
  const navigate = useNavigate();
  return (
    <div className="pb-[72px] md:pb-0">
      <div className="px-4 pt-5">
        <button onClick={() => navigate('/')} className="px-4 py-2 rounded-full text-xs font-extrabold border mb-4 transition-all hover:-translate-y-0.5"
          style={{ ...H, color: '#636E72', borderColor: '#F0E6D3', background: 'transparent' }}>
          ← Home
        </button>
        <div className="text-xs font-extrabold tracking-[2px] uppercase mb-2" style={{ ...H, color: '#FF6B6B' }}>All Worlds</div>
        <h2 className="text-2xl font-extrabold mb-5" style={H}>Choose Your Adventure</h2>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 md:gap-5">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.id} category={c} large={[3, 6].includes(i)} />
          ))}
        </div>
      </div>
      <div className="h-8" />
    </div>
  );
}
