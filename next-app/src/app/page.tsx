import Hero from "@/components/home/Hero";
import PromoTicker from "@/components/home/PromoTicker";
import CategoryGrid from "@/components/home/CategoryGrid";
import AgeStrip from "@/components/home/AgeStrip";
import TrendingProducts from "@/components/home/TrendingProducts";
import BrandStrip from "@/components/home/BrandStrip";
import BirthdayBanner from "@/components/home/BirthdayBanner";
import QuizBanner from "@/components/home/QuizBanner";
import NewArrivals from "@/components/home/NewArrivals";
import TrustSection from "@/components/home/TrustSection";
import FloatingElements from "@/components/ui/FloatingElements";

export default function HomePage() {
  return (
    <div className="relative">
      <FloatingElements density="light" />
      <Hero />
      <PromoTicker />
      <CategoryGrid />
      <AgeStrip />
      <TrendingProducts />
      <BrandStrip />
      <BirthdayBanner />
      <QuizBanner />
      <NewArrivals />
      <TrustSection />
    </div>
  );
}
