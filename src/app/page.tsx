import type { Metadata } from "next";

import { Scene01Horizon } from "@/components/scenes/Scene01Horizon";
import { Scene02TwoWorlds } from "@/components/scenes/Scene02TwoWorlds";
import { Scene03Aviation } from "@/components/scenes/Scene03Aviation";
import { Scene04Turn } from "@/components/scenes/Scene04Turn";
import { Scene05Arrival } from "@/components/scenes/Scene05Arrival";
import { Scene06Sequence } from "@/components/scenes/Scene06Sequence";
import { Scene07Markets } from "@/components/scenes/Scene07Markets";
import { Scene08Closing } from "@/components/scenes/Scene08Closing";
import { Argument } from "@/components/home/Argument";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.descriptor}`,
  description: site.metaDescription,
  alternates: { canonical: "/" },
};

/**
 * The homepage is a sequence of scenes, not a stack of sections.
 *
 * Seven are pinned: the viewport holds while the composition transforms with
 * scroll. One — the argument — deliberately is not, because after seven
 * pinned scenes the reader needs ground that does not move.
 */
export default function HomePage() {
  return (
    <>
      <Scene01Horizon />
      <Scene02TwoWorlds />
      <Scene03Aviation />
      <Scene04Turn />
      <Scene05Arrival />
      <Scene06Sequence />
      <Argument />
      <Scene07Markets />
      <Scene08Closing />
    </>
  );
}
