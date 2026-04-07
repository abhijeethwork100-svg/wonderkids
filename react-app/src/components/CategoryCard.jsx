import { useNavigate } from 'react-router-dom';

const H = { fontFamily: "'Nunito', sans-serif" };

export default function CategoryCard({ category, large = false }) {
  const navigate = useNavigate();
  const path = ['birthday', 'custom'].includes(category.id) ? `/${category.id}` : `/category/${category.id}`;

  return (
    <div className={`relative rounded-[32px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.97] ${large ? 'col-span-2 md:col-span-1' : ''}`}
      style={{ aspectRatio: large ? '2.2' : '1.1', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      onClick={() => navigate(path)}>

      {/* Background */}
      <div className="absolute inset-0 transition-transform duration-500 hover:scale-[1.07]" style={{ background: category.gradient }} />

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 100%)' }} />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2" style={{ background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          {category.icon}
        </div>
        <h3 className={`text-white font-extrabold mb-0.5 ${large ? 'text-lg' : 'text-[0.95rem]'}`} style={{ ...H, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
          {category.name}
        </h3>
        <div className="text-[0.72rem] font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>{category.count} products</div>
      </div>
    </div>
  );
}
