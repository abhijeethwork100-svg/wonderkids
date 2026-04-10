import type { Metadata } from "next";
import PlayPageClient from "./PlayPageClient";

export const metadata: Metadata = {
  title: "Play Zone — WonderKids",
  description:
    "DIY crafts, toy demos, printables, games, and learning activities for every age. Fun never stops at WonderKids!",
};

export default function PlayPage() {
  return <PlayPageClient />;
}
