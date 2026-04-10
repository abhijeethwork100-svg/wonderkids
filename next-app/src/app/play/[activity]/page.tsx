import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ACTIVITIES } from "@/data/activities";
import ActivityDetailClient from "./ActivityDetailClient";

export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ activity: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ activity: string }>;
}): Promise<Metadata> {
  const { activity } = await params;
  const act = ACTIVITIES.find((a) => a.slug === activity);
  if (!act) return { title: "Activity Not Found — WonderKids" };
  return {
    title: `${act.title} — Play Zone — WonderKids`,
    description: act.description,
  };
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ activity: string }>;
}) {
  const { activity } = await params;
  const act = ACTIVITIES.find((a) => a.slug === activity);
  if (!act) notFound();

  const related = ACTIVITIES.filter(
    (a) => a.type === act.type && a.id !== act.id
  ).slice(0, 3);

  return <ActivityDetailClient activity={act} related={related} />;
}
