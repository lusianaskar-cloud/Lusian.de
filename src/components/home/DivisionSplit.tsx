"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { divisions } from "@/lib/content/site";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal, LineReveal } from "@/components/primitives/Reveal";
import { TransitionLink } from "@/components/primitives/TransitionLink";
import { Arrow } from "@/components/primitives/Arrow";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * SIGNATURE MOMENT — the divide.
 *
 * Two plates, one hairline between them. Attention given to either side is
 * answered physically: the attended plate takes space from the other on a
 * spring, its ground warms or cools, and its detail settles in.
 *
 * Both plates are dark by design — the shift between the divisions is one of
 * temperature, not brightness. Aviation runs cool and technical; the private
 * practice runs warm and closed. Nothing here depends on hover: on touch both
 * plates are simply presented at rest.
 */
export function DivisionSplit() {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();

  return (
    <Section tone="dark" className="bg-obsidian" aria-labelledby="divisions-heading">
      <Container className="pb-14 pt-24 lg:pb-20 lg:pt-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Two divisions</Eyebrow>
            </Reveal>
            <h2
              id="divisions-heading"
              className="mt-8 font-display text-heading lg:text-title"
            >
              <LineReveal
                lines={[
                  <span key="1">One firm, working at</span>,
                  <span key="2">two different altitudes.</span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
              The disciplines rarely meet in public. They share a method: hold the
              sequence, name the specialist, stay to the end.
            </p>
          </Reveal>
        </div>
      </Container>

      <div className="flex min-h-[76lvh] flex-col lg:h-[86lvh] lg:min-h-[38rem] lg:flex-row">
        {divisions.map((division) => {
          const isActive = active === division.id;
          const isDimmed = active !== null && !isActive;
          const aviation = division.id === "aviation";

          return (
            <motion.div
              key={division.id}
              className={cn(
                "group relative isolate flex min-h-[64lvh] flex-1 flex-col overflow-hidden lg:min-h-0",
                aviation
                  ? "bg-petrol lg:border-r lg:border-ivory/10"
                  : "bg-umber border-t border-ivory/10 lg:border-t-0",
              )}
              onHoverStart={() => setActive(division.id)}
              onHoverEnd={() => setActive(null)}
              animate={{ flexGrow: reduced ? 1 : isActive ? 1.34 : isDimmed ? 0.66 : 1 }}
              transition={{ type: "spring", stiffness: 110, damping: 24, mass: 0.9 }}
            >
              {/* Ground */}
              {aviation ? (
                <motion.div
                  className="absolute inset-0 -z-10"
                  animate={{ opacity: isActive ? 0.9 : 0.5 }}
                  transition={{ duration: 0.9, ease: EASE.soft }}
                >
                  <RouteNetwork color="#A0B8C2" accent="#8FB6C7" opacity={0.55} />
                </motion.div>
              ) : (
                <motion.div
                  aria-hidden
                  className="absolute inset-0 -z-10"
                  animate={{ opacity: isActive ? 1 : 0.6 }}
                  transition={{ duration: 0.9, ease: EASE.soft }}
                >
                  <div
                    className="absolute -bottom-1/3 left-1/2 h-[85%] w-[120%] -translate-x-1/2 rounded-[50%] blur-3xl"
                    style={{
                      background:
                        "radial-gradient(closest-side, color-mix(in oklab, var(--color-champagne) 26%, transparent), transparent)",
                    }}
                  />
                  <svg
                    viewBox="0 0 600 400"
                    preserveAspectRatio="xMidYMax slice"
                    className="absolute inset-0 h-full w-full text-champagne/20"
                  >
                    {[0, 1, 2, 3, 4].map((i) => (
                      <path
                        key={i}
                        d={`M -40 ${400 - i * 34} Q 300 ${300 - i * 52} 640 ${400 - i * 34}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                  </svg>
                </motion.div>
              )}

              <motion.div
                aria-hidden
                className="absolute inset-0 -z-10 bg-obsidian"
                animate={{ opacity: isDimmed ? 0.45 : 0 }}
                transition={{ duration: 0.8, ease: EASE.soft }}
              />

              <TransitionLink
                href={division.href}
                transitionLabel={division.label}
                data-cursor="label"
                data-cursor-label="Enter"
                className="flex flex-1 flex-col justify-between gap-16 p-(--spacing-gutter) py-12 lg:gap-20 lg:py-14"
              >
                <div className="flex items-start justify-between gap-6">
                  <span
                    className={cn(
                      "label-mono",
                      aviation ? "text-ice/60" : "text-champagne/60",
                    )}
                  >
                    {division.index} — {division.label}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 block size-1.5 rounded-full transition-transform duration-700",
                      aviation ? "bg-ice" : "bg-champagne",
                      isActive ? "scale-150" : "scale-100",
                    )}
                  />
                </div>

                <div>
                  <h3 className="max-w-[13ch] font-display text-[clamp(2.1rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.028em]">
                    {division.line}
                  </h3>

                  <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/55">
                    {division.summary}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                    {division.keywords.map((keyword) => (
                      <li
                        key={keyword}
                        className={cn(
                          "label-mono",
                          aviation ? "text-ice/45" : "text-champagne/45",
                        )}
                      >
                        {keyword}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-10 inline-flex items-center gap-3 label-mono text-ivory/80">
                    <span className="relative">
                      {division.cta}
                      <span
                        aria-hidden
                        className="absolute -bottom-1 left-0 block h-px w-full origin-left scale-x-0 bg-current transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      />
                    </span>
                    <Arrow className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" />
                  </span>
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute right-(--spacing-gutter) top-1/2 hidden -translate-y-1/2 font-display text-[10rem] leading-none text-ivory/[0.04] lg:block"
                >
                  {division.index}
                </span>
              </TransitionLink>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
