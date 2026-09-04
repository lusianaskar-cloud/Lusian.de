"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { scrollToTopImmediate } from "./SmoothScroll";

type Phase = "idle" | "cover" | "hold" | "uncover";

type TransitionContextValue = {
  navigate: (href: string, label?: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
});

export function useTransitionNavigate() {
  return useContext(TransitionContext);
}

/**
 * A curtain that sweeps upward across the viewport, holds the destination's
 * name, then continues off the top. Two panels travel with a small offset so
 * the sweep reads as layered rather than flat.
 *
 * The route push is issued as the curtain closes, so data loads behind it and
 * the transition length is felt as intent rather than latency.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const pendingHref = useRef<string | null>(null);
  const coverDone = useRef(false);
  const arrived = useRef(false);

  const finishIfReady = useCallback(() => {
    if (coverDone.current && arrived.current) {
      coverDone.current = false;
      arrived.current = false;
      pendingHref.current = null;
      setPhase("uncover");
    }
  }, []);

  const navigate = useCallback(
    (href: string, nextLabel = "") => {
      if (href === pathname) return;

      if (reduced) {
        router.push(href);
        return;
      }

      setLabel(nextLabel);
      pendingHref.current = href;
      coverDone.current = false;
      arrived.current = false;
      setPhase("cover");
      // Start the fetch immediately; the curtain covers the wait.
      router.push(href);
    },
    [pathname, reduced, router],
  );

  useEffect(() => {
    if (pendingHref.current && pathname === pendingHref.current) {
      scrollToTopImmediate();
      arrived.current = true;
      finishIfReady();
    }
  }, [pathname, finishIfReady]);

  const value = useMemo(
    () => ({ navigate, isTransitioning: phase !== "idle" }),
    [navigate, phase],
  );

  const active = phase === "cover" || phase === "uncover";

  return (
    <TransitionContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {active ? (
          <motion.div
            key="curtain"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[120]"
          >
            {/* Trailing panel — a beat behind, for depth. */}
            <motion.div
              className="absolute inset-0 bg-brass/25"
              initial={{ y: "100%" }}
              animate={{ y: phase === "cover" ? "0%" : "-100%" }}
              transition={{ duration: 0.78, ease: EASE.drape, delay: 0.06 }}
            />
            <motion.div
              className="grain absolute inset-0 bg-ink"
              initial={{ y: "100%" }}
              animate={{ y: phase === "cover" ? "0%" : "-100%" }}
              transition={{ duration: 0.78, ease: EASE.drape }}
              onAnimationComplete={() => {
                if (phase === "cover") {
                  coverDone.current = true;
                  finishIfReady();
                } else {
                  setPhase("idle");
                }
              }}
            >
              <span className="grain-layer" />
              <div className="relative flex h-full items-center justify-center">
                <motion.span
                  className="label-mono text-ivory/70"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: phase === "cover" ? 1 : 0,
                    y: phase === "cover" ? 0 : -12,
                  }}
                  transition={{ duration: 0.5, ease: EASE.soft, delay: phase === "cover" ? 0.34 : 0 }}
                >
                  {label || "Lusian"}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
