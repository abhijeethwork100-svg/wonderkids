import type { Metadata } from "next";
import { Nunito, Inter, Baloo_2 } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Toast from "@/components/Toast";
import PromoBar from "@/components/layout/PromoBar";
import Header from "@/components/layout/Header";
import Newsletter from "@/components/layout/Newsletter";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

const nunito = Nunito({
  variable: "--font-heading-var",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const baloo2 = Baloo_2({
  variable: "--font-accent-var",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "WonderKids — India's Most Magical Toy Store",
  description:
    "Premium toys, magical birthday experiences, and curated adventures for kids aged 0-13. Safe, eco-friendly, and endlessly fun. Free delivery across India on orders above ₹999.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${inter.variable} ${baloo2.variable} h-full antialiased`}
    >
      <body className="bg-cream text-body min-h-full flex flex-col font-body">
        <StoreProvider>
          <PromoBar />
          <Header />
          <main className="min-h-screen pb-[72px] md:pb-0">{children}</main>
          <Newsletter />
          <Footer />
          <BottomNav />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
