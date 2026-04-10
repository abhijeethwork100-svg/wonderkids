import { PRODUCTS, type Product } from "@/data/products";
import { CATEGORIES, type Category } from "@/data/categories";
import { BRANDS, type Brand } from "@/data/brands";
import { AGE_GROUPS, type AgeGroup } from "@/data/ages";

export type { Product, Category, Brand, AgeGroup };

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.categoryId === categoryId);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return PRODUCTS.filter(
    (p) => p.brand.toLowerCase().replace(/\s+/g, "-") === brandSlug
  );
}

export function getProductsByAge(ageMin: number, ageMax: number): Product[] {
  return PRODUCTS.filter((p) => {
    const [pMin, pMax] = p.ageRange.split("-").map(Number);
    // Product's age range overlaps with the requested range
    return pMin <= ageMax && pMax >= ageMin;
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export function getAgeGroupBySlug(slug: string): AgeGroup | undefined {
  return AGE_GROUPS.find((a) => a.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.badge !== "");
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.badge === "New");
}

export function getTrendingProducts(): Product[] {
  return PRODUCTS.filter(
    (p) => p.badge === "Best Seller" || p.badge === "Top Rated"
  );
}

export function formatPrice(price: number): string {
  return `\u20B9${price.toLocaleString("en-IN")}`;
}

export function cn(
  ...classes: (string | undefined | false | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
