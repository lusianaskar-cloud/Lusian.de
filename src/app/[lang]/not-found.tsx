import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { ActionLink, TextLink } from "@/components/primitives/ActionLink";
import { Mark } from "@/components/chrome/Mark";
import { site } from "@/lib/content/site";
import { getContent } from "@/lib/i18n/dictionary";

export default async function NotFound() {
  const content = await getContent();
  const copy = content.notFound;
  const [aviation, privateAdvisory] = content.nav;

  return (
    <Section tone="dark" grain className="overflow-hidden bg-ink">
      <Mark className="pointer-events-none absolute -end-[10%] top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 text-ivory/[0.045]" />

      <Container className="relative flex min-h-[82lvh] flex-col justify-center py-32">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h1 className="mt-10 max-w-[14ch] font-display text-[clamp(2.4rem,6.4vw,5.5rem)] leading-[1.03] tracking-[-0.028em]">
          {copy.headline}
        </h1>
        <p className="mt-8 max-w-md text-lead text-tone-muted">{copy.body}</p>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
          <ActionLink href="/" transitionLabel={site.name}>
            {copy.home}
          </ActionLink>
          <TextLink href={aviation.href} transitionLabel={aviation.label}>
            {aviation.label}
          </TextLink>
          <TextLink href={privateAdvisory.href} transitionLabel={privateAdvisory.label}>
            {privateAdvisory.label}
          </TextLink>
        </div>
      </Container>
    </Section>
  );
}
