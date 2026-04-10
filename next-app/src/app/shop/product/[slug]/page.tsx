import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import {
  getProductBySlug,
  getCategoryBySlug,
  formatPrice,
} from "@/lib/utils";
import { CATEGORIES } from "@/data/categories";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — WonderKids" };
  return {
    title: `${product.name} — ${formatPrice(product.price)} — WonderKids`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.id === product.categoryId);

  return (
    <ProductDetailClient
      product={product}
      category={category ?? null}
    />
  );
}
