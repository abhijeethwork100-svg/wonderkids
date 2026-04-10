import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { getCategoryBySlug } from "@/lib/utils";
import CategoryPageClient from "./CategoryPageClient";

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Category Not Found — WonderKids" };
  return {
    title: `${cat.name} — WonderKids`,
    description: `Browse ${cat.name} toys at WonderKids. Shop from ${cat.subcategories.join(", ")} and more.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  return <CategoryPageClient category={cat} />;
}
