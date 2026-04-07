import { useStore } from '../context/StoreContext';

export default function Toast() {
  const { toast } = useStore();
  return (
    <div className={`fixed bottom-[88px] md:bottom-6 left-1/2 -translate-x-1/2 z-[4000] px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}
      style={{ background: '#1A1A2E', color: '#fff', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.85rem' }}>
      {toast.message}
    </div>
  );
}
