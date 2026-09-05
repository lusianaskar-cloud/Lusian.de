"use client";

import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** A hairline that draws itself across when it enters the viewport. */
export function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduced = useSafeReducedMotion();

  return (
    <span className={cn("block h-px w-full overflow-hidden bg-current/15", className)}>
      <motion.span
        aria-hidden
        className="block h-px w-full origin-left rtl:origin-right rtl:origin-left bg-current/60"
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ duration: 1.4, ease: EASE.expo, delay }}
      />
    </span>
  );
}
