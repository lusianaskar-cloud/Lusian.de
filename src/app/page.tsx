import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { DivisionSplit } from "@/components/home/DivisionSplit";
import { AviationFeature } from "@/components/home/AviationFeature";
import { GulfFeature } from "@/components/home/GulfFeature";
import { Interlude } from "@/components/home/Interlude";
import { WhyUs } from "@/components/home/WhyUs";
import { Reach } from "@/components/home/Reach";
import { Engagement } from "@/components/home/Engagement";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.descriptor}`,
  description: site.metaDescription,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <DivisionSplit />
      <AviationFeature />
      <GulfFeature />
      <Interlude />
      <WhyUs />
      <Reach />
      <Engagement />
      <ConsultCta
        lines={["Begin a", "conversation."]}
        body="Tell us what you are trying to achieve and by when. If we are not the right party, we will say so and point you to who is."
      />
    </>
  );
}
