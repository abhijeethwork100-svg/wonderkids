import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AGE_GROUPS } from "@/data/ages";
import { getAgeGroupBySlug } from "@/lib/utils";
import AgeGroupPageClient from "./AgeGroupPageClient";

export function generateStaticParams() {
  return AGE_GROUPS.map((ag) => ({ ageGroup: ag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ageGroup: string }>;
}): Promise<Metadata> {
  const { ageGroup } = await params;
  const ag = getAgeGroupBySlug(ageGroup);
  if (!ag) return { title: "Age Group Not Found — WonderKids" };
  return {
    title: `${ag.label} (${ag.subtitle}) — WonderKids`,
    description: ag.description,
  };
}

export default async function AgeGroupPage({
  params,
}: {
  params: Promise<{ ageGroup: string }>;
}) {
  const { ageGroup } = await params;
  const ag = getAgeGroupBySlug(ageGroup);
  if (!ag) notFound();

  return <AgeGroupPageClient ageGroup={ag} />;
}
