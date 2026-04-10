import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANDS } from "@/data/brands";
import { getBrandBySlug } from "@/lib/utils";
import BrandPageClient from "./BrandPageClient";

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  const b = getBrandBySlug(brand);
  if (!b) return { title: "Brand Not Found — WonderKids" };
  return {
    title: `${b.name} Toys — WonderKids`,
    description: b.description,
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  const b = getBrandBySlug(brand);
  if (!b) notFound();

  return <BrandPageClient brand={b} />;
}
