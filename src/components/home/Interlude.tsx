"use client";

import { Section } from "@/components/primitives/Section";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { plates } from "@/lib/content/plates";

/** The hinge between the two practices — warm dark above, light below. */
export function Interlude() {
  return (
    <Section tone="dark" className="bg-umber">
      <EditorialImage
        plate={plates.interlude}
        ratio="aspect-[3/4] sm:aspect-[16/9] lg:aspect-[21/9]"
        tone="dark"
        className="bg-umber"
      />
    </Section>
  );
}
