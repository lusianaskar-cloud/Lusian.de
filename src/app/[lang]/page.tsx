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
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    title: content.seo.home.title,
    description: content.seo.home.description,
    alternates: alternatesFor(locale, "/"),
  };
}

/**
 * The homepage is a sequence of scenes, not a stack of sections.
 *
 * Seven are pinned: the viewport holds while the composition transforms with
 * scroll. One — the argument — deliberately is not, because after seven
 * pinned scenes the reader needs ground that does not move.
 *
 * Every scene reads its copy from the active locale through the provider, so
 * the choreography is identical in all three languages and only the words and
 * the reading direction change.
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
