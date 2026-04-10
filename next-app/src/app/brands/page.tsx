import Link from "next/link";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Brands — WonderKids",
  description:
    "Browse toys from trusted brands like LEGO, Hot Wheels, Barbie, Disney, and more at WonderKids.",
};

function getBrandProductCount(brandSlug: string) {
  return PRODUCTS.filter(
    (p) => p.brand.toLowerCase().replace(/\s+/g, "-") === brandSlug
  ).length;
}

export default function BrandsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-body mb-6">
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Brands</span>
      </nav>

      <SectionHeader title="Our Brands" subtitle="Trusted Worldwide" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {BRANDS.map((brand) => {
          const count = getBrandProductCount(brand.slug);
          return (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="bg-white rounded-[20px] p-6 border border-border-light text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-black text-white"
                style={{ backgroundColor: brand.color }}
              >
                {brand.name.charAt(0)}
              </div>
              <h3 className="text-sm font-extrabold font-heading mt-3 text-dark">
                {brand.name}
              </h3>
              <p className="text-xs text-body mt-1">
                {count} {count === 1 ? "product" : "products"}
              </p>
              <p className="text-xs text-body mt-2 line-clamp-2">
                {brand.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
