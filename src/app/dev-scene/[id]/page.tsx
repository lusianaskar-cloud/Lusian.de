import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Scene01Horizon } from "@/components/scenes/Scene01Horizon";
import { Scene02TwoWorlds } from "@/components/scenes/Scene02TwoWorlds";
import { Scene03Aviation } from "@/components/scenes/Scene03Aviation";
import { Scene04Turn } from "@/components/scenes/Scene04Turn";
import { Scene05Arrival } from "@/components/scenes/Scene05Arrival";
import { Scene06Sequence } from "@/components/scenes/Scene06Sequence";
import { Scene07Markets } from "@/components/scenes/Scene07Markets";
import { Scene08Closing } from "@/components/scenes/Scene08Closing";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * Development-only scene harness — one scene, alone, for reviewing its
 * choreography without scrolling the whole homepage. Returns 404 in
 * production and is excluded from the sitemap.
 */
const SCENES: Record<string, () => React.ReactElement> = {
  "1": Scene01Horizon,
  "2": Scene02TwoWorlds,
  "3": Scene03Aviation,
  "4": Scene04Turn,
  "5": Scene05Arrival,
  "6": Scene06Sequence,
  "7": Scene07Markets,
  "8": Scene08Closing,
};

export default async function SceneHarness({ params }: { params: Promise<{ id: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { id } = await params;
  const Component = SCENES[id];
  if (!Component) notFound();
  return <Component />;
}
