import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { ActionLink, TextLink } from "@/components/primitives/ActionLink";
import { Mark } from "@/components/chrome/Mark";

export default function NotFound() {
  return (
    <Section tone="dark" grain className="overflow-hidden bg-ink">
      <Mark className="pointer-events-none absolute -right-[10%] top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 text-ivory/[0.045]" />

      <Container className="relative flex min-h-[82lvh] flex-col justify-center py-32">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-10 max-w-[14ch] font-display text-[clamp(2.4rem,6.4vw,5.5rem)] leading-[1.03] tracking-[-0.028em]">
          This page is not
          <em className="font-normal text-champagne"> where it was</em>.
        </h1>
        <p className="mt-8 max-w-md text-lead text-tone-muted">
          The address may have changed, or it may never have existed. Either way, the
          two divisions are a click away.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
          <ActionLink href="/" transitionLabel="Lusian">
            Return home
          </ActionLink>
          <TextLink href="/aviation" transitionLabel="Aviation Advisory">
            Aviation
          </TextLink>
          <TextLink href="/private-advisory" transitionLabel="Gulf Private Advisory">
            Private Advisory
          </TextLink>
        </div>
      </Container>
    </Section>
  );
}
