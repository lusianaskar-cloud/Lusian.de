"use client";

import { motion } from "motion/react";
import { TransitionLink } from "./TransitionLink";
import { Arrow } from "./Arrow";
import { useMagnetic } from "./useMagnetic";

import { cn } from "@/lib/utils";

/**
 * Shared surface for every primary action on the site.
 *
 * Hairline pill · magnetic on fine pointers · fill sweeps in from the left
 * while the label crosses to the inverse tone · the arrow leaves to the right
 * as its twin arrives from the left.
 *
 * Colour comes from the tone variables set by the enclosing <Section>, so the
 * same component is correct on ivory and on ink without a variant prop.
 */
const shell =
  "group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-current/25 " +
  "px-7 py-4 sm:px-9 sm:py-[1.15rem] label-mono " +
  "text-[color:var(--tone-fg,currentColor)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:text-[color:var(--tone-bg,var(--color-ivory))] focus-visible:text-[color:var(--tone-bg,var(--color-ivory))]";

function Fill() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 origin-left scale-x-0 bg-[color:var(--tone-fg,currentColor)] transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
    />
  );
}

function SwapArrow() {
  return (
    <span className="relative z-10 block h-[10px] w-7 overflow-hidden">
      <span className="absolute inset-0 flex items-center transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%] group-focus-visible:translate-x-[150%]">
        <Arrow />
      </span>
      <span className="absolute inset-0 flex -translate-x-[150%] items-center transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0">
        <Arrow />
      </span>
    </span>
  );
}

export function ActionLink({
  href,
  children,
  className,
  transitionLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  transitionLabel?: string;
}) {
  const { ref, x, y } = useMagnetic<HTMLDivElement>(0.22);

  return (
    <motion.div ref={ref} style={{ x, y }} className={cn("inline-block", className)}>
      <TransitionLink href={href} transitionLabel={transitionLabel} data-cursor="hide" className={shell}>
        <Fill />
        <span className="relative z-10">{children}</span>
        <SwapArrow />
      </TransitionLink>
    </motion.div>
  );
}

export function ActionButton({
  children,
  className,
  disabled,
  type = "submit",
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "button";
}) {
  const { ref, x, y } = useMagnetic<HTMLDivElement>(0.2);

  return (
    <motion.div ref={ref} style={{ x, y }} className={cn("inline-block", className)}>
      <button
        type={type}
        disabled={disabled}
        data-cursor="hide"
        className={cn(shell, "disabled:cursor-not-allowed disabled:opacity-40")}
      >
        {disabled ? null : <Fill />}
        <span className="relative z-10">{children}</span>
        <SwapArrow />
      </button>
    </motion.div>
  );
}

/** Secondary action. A rule retracts to the right and re-enters from the left. */
export function TextLink({
  href,
  children,
  className,
  transitionLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  transitionLabel?: string;
}) {
  return (
    <TransitionLink
      href={href}
      transitionLabel={transitionLabel}
      className={cn(
        "group inline-flex items-center gap-3 label-mono text-[color:var(--tone-fg,currentColor)]",
        className,
      )}
    >
      <span className="relative py-1">
        {children}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 block h-px w-full origin-right bg-current transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-0 group-focus-visible:origin-left group-focus-visible:scale-x-0"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 block h-px w-full origin-left scale-x-0 bg-current transition-transform delay-[200ms] duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
      <Arrow className="w-5 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5" />
    </TransitionLink>
  );
}

