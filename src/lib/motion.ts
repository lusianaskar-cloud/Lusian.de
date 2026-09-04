import type { Transition, Variants } from "motion/react";

/**
 * Shared motion language.
 * Long, eased, intentional. Nothing bounces; nothing is faster than it needs
 * to be. Every consumer must also honour `useReducedMotion()`.
 */
export const EASE = {
  soft: [0.22, 1, 0.36, 1],
  expo: [0.16, 1, 0.3, 1],
  drape: [0.65, 0, 0.35, 1],
} as const;

export const DURATION = {
  quick: 0.4,
  base: 0.8,
  slow: 1.15,
  cinematic: 1.6,
} as const;

export const transitions = {
  reveal: { duration: DURATION.slow, ease: EASE.expo } satisfies Transition,
  soft: { duration: DURATION.base, ease: EASE.soft } satisfies Transition,
  curtain: { duration: DURATION.cinematic, ease: EASE.drape } satisfies Transition,
  spring: { type: "spring", stiffness: 120, damping: 22, mass: 0.9 } satisfies Transition,
  magnet: { type: "spring", stiffness: 180, damping: 18, mass: 0.5 } satisfies Transition,
};

/** Mask-and-rise: the primitive behind every text reveal on the site. */
export const riseVariants: Variants = {
  hidden: { y: "112%" },
  visible: (i: number = 0) => ({
    y: "0%",
    transition: { ...transitions.reveal, delay: i * 0.075 },
  }),
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.expo, delay: i * 0.08 },
  }),
};

export const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const VIEWPORT = { once: true, amount: 0.35, margin: "0px 0px -12% 0px" } as const;
export const VIEWPORT_WIDE = { once: true, amount: 0.15, margin: "0px 0px -8% 0px" } as const;
