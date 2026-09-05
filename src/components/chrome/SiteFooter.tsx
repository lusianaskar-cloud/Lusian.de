"use client";

import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { contactChannels, site } from "@/lib/content/site";
import { useContent } from "@/lib/i18n/context";
import { TransitionLink } from "@/components/primitives/TransitionLink";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { EASE } from "@/lib/motion";
import { Mark } from "./Mark";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteFooter() {
  const reduced = useSafeReducedMotion();
  const { footer, legal } = useContent();

  return (
    <Section tone="dark" as="footer" grain className="overflow-hidden bg-ink">
      <Container className="pt-24 lg:pt-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Mark className="h-6 w-6 text-champagne" />
              {/* The wordmark is set in Latin in every language. */}
              <span lang="en" className="font-sans text-[0.95rem] font-medium tracking-[0.38em]">
                {site.wordmark}
              </span>
            </div>
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-tone-muted">
              {footer.tagline}
            </p>

            <div className="mt-10 space-y-3">
              <a
                href={`mailto:${contactChannels.email}`}
                dir="ltr"
                className="block text-lg tracking-tight text-ivory/85 underline-offset-8 transition-colors duration-500 hover:text-champagne hover:underline rtl:text-end"
              >
                {contactChannels.email}
              </a>
              {/* TODO(client): replace with the real enquiry line, or remove. */}
              <p dir="ltr" className="label-mono text-tone-muted rtl:text-end">
                {contactChannels.phone}
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 xl:grid-cols-4">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <Eyebrow tick={false} className="text-ivory/35">
                  {column.title}
                </Eyebrow>
                <ul className="mt-6 space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <TransitionLink
                        href={link.href}
                        transitionLabel={link.label}
                        className="group inline-flex text-[0.9375rem] text-ivory/70 transition-colors duration-500 hover:text-ivory"
                      >
                        <span className="relative">
                          {link.label}
                          <span
                            aria-hidden
                            className="absolute -bottom-0.5 start-0 block h-px w-full origin-[right] rtl:origin-[left] scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-[left] group-hover:rtl:origin-[right] group-hover:scale-x-100"
                          />
                        </span>
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-ivory/10 pt-8">
          <p className="max-w-4xl text-[0.8125rem] leading-relaxed text-ivory/40">
            {legal.notice}
          </p>
          <div className="mt-8 flex flex-col gap-5 label-mono text-ivory/35 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} <span lang="en">{site.wordmark}</span>
            </p>
            {/* TODO(client): company registration number, VAT ID and registered
                address must be supplied here and on /legal/imprint. */}
            <p>{footer.registration}</p>
            <LanguageSwitcher className="lg:hidden" />
          </div>
        </div>
      </Container>

      {/* Closing wordmark, cut by the page edge. */}
      <div aria-hidden className="relative mt-16 select-none overflow-hidden lg:mt-24">
        <motion.p
          lang="en"
          dir="ltr"
          className="translate-y-[18%] whitespace-nowrap text-center font-display text-[24vw] leading-[0.78] text-ivory/[0.07]"
          initial={reduced ? false : { opacity: 0, y: "34%" }}
          whileInView={{ opacity: 1, y: "18%" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.6, ease: EASE.expo }}
        >
          {site.wordmark}
        </motion.p>
        <span className="absolute inset-x-0 bottom-[26%] block h-px bg-ivory/[0.07]" />
      </div>
    </Section>
  );
}
