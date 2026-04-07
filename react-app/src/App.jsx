import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import BirthdayPlanner from './pages/BirthdayPlanner';
import GiftQuiz from './pages/GiftQuiz';
import CustomOrders from './pages/CustomOrders';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#FFFBF5' }}>
      <ScrollToTop />
      <TopNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/birthday" element={<BirthdayPlanner />} />
          <Route path="/quiz" element={<GiftQuiz />} />
          <Route path="/custom" element={<CustomOrders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <BottomNav />
      <Toast />
    </div>
  );
}
