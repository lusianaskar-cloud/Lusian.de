"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { insightCategories, type Insight } from "@/lib/content/insights";
import { TransitionLink } from "@/components/primitives/TransitionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { Arrow } from "@/components/primitives/Arrow";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ALL = "All";

function DemoTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-current/25 px-3 py-1 label-mono text-accent",
        className,
      )}
    >
      <span aria-hidden className="block size-1 rounded-full bg-current" />
      Demo
    </span>
  );
}

export function InsightsIndex({ insights }: { insights: Insight[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const reduced = useSafeReducedMotion();

  const filtered = useMemo(
    () => (category === ALL ? insights : insights.filter((i) => i.category === category)),
    [category, insights],
  );

  const [featured, ...rest] = filtered;

  return (
    <>
      <Reveal wide>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 border-y border-ink/12 py-5">
          <span className="label-mono mr-4 text-ink/35">Filter</span>
          {[ALL, ...insightCategories].map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={selected}
                className={cn(
                  "rounded-full border px-4 py-2 label-mono transition-colors duration-500",
                  selected
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/20 text-ink/55 hover:border-ink/50 hover:text-ink",
                )}
              >
                {item}
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
              transitionLabel={featured.category}
              className="group mt-14 block border-b border-ink/12 pb-14 lg:mt-20 lg:pb-20"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="flex items-start gap-4 lg:col-span-4">
                  <span className="label-mono text-brass">{featured.category}</span>
                  <DemoTag />
                </div>
                <div className="lg:col-span-7 lg:col-start-6">
                  <h3 className="font-display text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.06] tracking-[-0.026em]">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1px]">
                      {featured.title}
                    </span>
                  </h3>
                  <p className="mt-6 max-w-2xl text-lead text-tone-muted">
                    {featured.standfirst}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-3 label-mono text-ink/45">
                    {featured.readingTime}
                    <Arrow className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" />
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
                transitionLabel={insight.category}
                className="group relative flex flex-col bg-ivory p-8 transition-colors duration-700 hover:bg-paper lg:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="label-mono text-brass">{insight.category}</span>
                  <DemoTag />
                </div>

                <h3 className="mt-10 font-display text-[1.6rem] leading-tight tracking-tight lg:mt-14">
                  {insight.title}
                </h3>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-tone-muted">
                  {insight.standfirst}
                </p>

                <span className="mt-10 flex items-center justify-between label-mono text-ink/40">
                  {insight.readingTime}
                  <Arrow className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" />
                </span>
              </TransitionLink>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="py-20 text-center font-display text-heading text-tone-muted">
              Nothing published in this category yet.
            </p>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
