import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { BRANDS } from "@/data/brands";
import { AGE_GROUPS } from "@/data/ages";
import { ACTIVITIES } from "@/data/activities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wonderkids.in";

  // Static pages
  const staticPages = [
    "",
    "/shop",
    "/brands",
    "/play",
    "/quiz",
    "/birthday",
    "/cart",
    "/wishlist",
  ];

  // Dynamic pages
  const categoryPages = CATEGORIES.map((c) => `/shop/${c.slug}`);
  const productPages = PRODUCTS.map((p) => `/shop/product/${p.slug}`);
  const brandPages = BRANDS.map((b) => `/brands/${b.slug}`);
  const agePages = AGE_GROUPS.map((a) => `/age/${a.slug}`);
  const activityPages = ACTIVITIES.map((a) => `/play/${a.slug}`);

  const allPages = [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...brandPages,
    ...agePages,
    ...activityPages,
  ];

  return allPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
    priority: path === "" ? 1 : path.includes("product") ? 0.8 : 0.6,
  }));
}
