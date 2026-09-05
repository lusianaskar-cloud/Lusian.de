"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { insightCategories, type Insight } from "@/lib/content/insights";
import { useContent } from "@/lib/i18n/context";
import { TransitionLink } from "@/components/primitives/TransitionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { Arrow } from "@/components/primitives/Arrow";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** The filter's "everything" state, as a value rather than a translated label. */
const ALL = "all";

function DemoTag({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-current/25 px-3 py-1 type-voice text-[0.8125rem] text-accent",
        className,
      )}
    >
      <span aria-hidden className="block size-1 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function InsightsIndex({ insights }: { insights: Insight[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const reduced = useSafeReducedMotion();
  const content = useContent();
  const copy = content.insights;

  const filtered = useMemo(
    () => (category === ALL ? insights : insights.filter((i) => i.category === category)),
    [category, insights],
  );

  const [featured, ...rest] = filtered;

  return (
    <>
      <Reveal wide>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 border-y border-ink/12 py-5">
          <span className="type-voice me-4 text-[0.8125rem] text-ink/35">{copy.filter}</span>
          {[ALL, ...insightCategories].map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={selected}
                className={cn(
                  "label-ui rounded-full border px-4 py-2 transition-colors duration-500",
                  selected
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/20 text-ink/55 hover:border-ink/50 hover:text-ink",
                )}
              >
                {item === ALL ? copy.all : copy.categories[item]}
              </button>
            );
          })}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: reduced ? 0 : 0.55, ease: EASE.expo }}
        >
          {featured ? (
            <TransitionLink
              href={`/insights/${featured.slug}`}
              transitionLabel={copy.categories[featured.category]}
              className="group mt-14 block border-b border-ink/12 pb-14 lg:mt-20 lg:pb-20"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="flex items-start gap-4 lg:col-span-4">
                  <span className="type-voice text-[0.8125rem] text-brass">
                    {copy.categories[featured.category]}
                  </span>
                  <DemoTag label={content.ui.demo} />
                </div>
                <div className="lg:col-span-7 lg:col-start-6">
                  <h3 className="type-structure text-[calc(clamp(1.9rem,4.2vw,3.5rem)*var(--ar-struct))]">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat rtl:bg-right-bottom transition-[background-size] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1px]">
                      {copy.entries[featured.slug].title}
                    </span>
                  </h3>
                  <p className="mt-6 max-w-2xl type-voice text-[clamp(1rem,1.25vw,1.15rem)] text-tone-muted">
                    {copy.entries[featured.slug].standfirst}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-3 type-voice text-[0.8125rem] tabular-nums text-ink/45">
                    {copy.entries[featured.slug].readingTime}
                    <Arrow className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:rtl:-translate-x-2" />
                  </span>
                </div>
              </div>
            </TransitionLink>
          ) : null}

          <div className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((insight) => (
              <TransitionLink
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                transitionLabel={copy.categories[insight.category]}
                className="group relative flex flex-col bg-ivory p-8 transition-colors duration-700 hover:bg-paper lg:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="type-voice text-[0.8125rem] text-brass">
                    {copy.categories[insight.category]}
                  </span>
                  <DemoTag label={content.ui.demo} />
                </div>

                <h3 className="mt-10 lg:mt-14 type-structure text-[calc(1.6rem*var(--ar-struct))]">
                  {copy.entries[insight.slug].title}
                </h3>
                <p className="mt-4 flex-1 type-voice text-[0.9375rem] text-tone-muted">
                  {copy.entries[insight.slug].standfirst}
                </p>

                <span className="mt-10 flex items-center justify-between type-voice text-[0.8125rem] tabular-nums text-ink/40">
                  {copy.entries[insight.slug].readingTime}
                  <Arrow className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:rtl:-translate-x-2" />
                </span>
              </TransitionLink>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="py-20 text-center text-tone-muted type-structure text-[calc(clamp(1.4rem,2.4vw,1.9rem)*var(--ar-struct))]">
              {copy.empty}
            </p>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
