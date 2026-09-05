import type { Metadata } from "next";

import { Scene01Horizon } from "@/components/scenes/Scene01Horizon";
import { Scene02TwoWorlds } from "@/components/scenes/Scene02TwoWorlds";
import { Scene03Aviation } from "@/components/scenes/Scene03Aviation";
import { Scene04Turn } from "@/components/scenes/Scene04Turn";
import { Scene05Arrival } from "@/components/scenes/Scene05Arrival";
import { Scene06Close } from "@/components/scenes/Scene06Close";
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
 * The homepage is six experiences, not a stack of sections.
 *
 * I    Horizon        one sentence, and the light that decides how it reads
 * II   Two Worlds     one system changing character, not two panels
 * III  The Operation  the aviation practice, on a floor, at scale
 * IV   The Turn       the transformation between the two divisions
 * V    Arrival        the private practice; the slowest thing on the page
 * VI   The Close      the instrument resolves to a point, and the invitation
 *
 * Between V and VI the argument sits on ground that does not move. After five
 * pinned scenes the reader has earned something to stand on, and the four
 * commitments are the one place on the site that wants to be read rather than
 * experienced.
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
      <Argument />
      <Scene06Close />
    </>
  );
}
