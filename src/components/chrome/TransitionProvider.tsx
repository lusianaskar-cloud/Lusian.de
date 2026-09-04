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

type Phase = "idle" | "cover" | "uncover";

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

const COVER_MS = 720;
/** If a route somehow never arrives, lift the curtain anyway. */
const SAFETY_MS = 2600;

/**
 * SIGNATURE MOMENT — the curtain.
 *
 * Two plates sweep upward across the viewport, a beat apart, carrying the
 * destination's name. The route is only pushed once the screen is fully
 * covered, so the incoming page is never glimpsed climbing in behind the
 * plate; because every route is prerendered and prefetched, the swap happens
 * inside the hold and the length reads as intent rather than latency.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const pendingHref = useRef<string | null>(null);
  const safety = useRef<number | null>(null);

  const lift = useCallback(() => {
    if (safety.current) {
      window.clearTimeout(safety.current);
      safety.current = null;
    }
    pendingHref.current = null;
    setPhase("uncover");
  }, []);

  const navigate = useCallback(
    (href: string, nextLabel = "") => {
      if (href === pathname || pendingHref.current) return;

      if (reduced) {
        router.push(href);
        return;
      }

      setLabel(nextLabel);
      pendingHref.current = href;
      setPhase("cover");
    },
    [pathname, reduced, router],
  );

  // Push only once the screen is covered.
  const onCovered = useCallback(() => {
    const href = pendingHref.current;
    if (!href) return;
    scrollToTopImmediate();
    router.push(href);
    safety.current = window.setTimeout(lift, SAFETY_MS);
  }, [lift, router]);

  useEffect(() => {
    if (pendingHref.current && pathname === pendingHref.current) {
      scrollToTopImmediate();
      lift();
    }
  }, [pathname, lift]);

  useEffect(() => () => {
    if (safety.current) window.clearTimeout(safety.current);
  }, []);

  const value = useMemo(
    () => ({ navigate, isTransitioning: phase !== "idle" }),
    [navigate, phase],
  );

  const covering = phase === "cover";

  return (
    <TransitionContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {phase !== "idle" ? (
          <motion.div
            key="curtain"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[120]"
          >
            {/* Trailing plate — a beat behind, so the sweep reads as layered. */}
            <motion.div
              className="absolute inset-0 bg-brass/30"
              initial={{ y: "100%" }}
              animate={{ y: covering ? "0%" : "-100%" }}
              transition={{ duration: COVER_MS / 1000, ease: EASE.drape, delay: 0.07 }}
            />

            <motion.div
              className="grain absolute inset-0 bg-ink"
              initial={{ y: "100%" }}
              animate={{ y: covering ? "0%" : "-100%" }}
              transition={{ duration: COVER_MS / 1000, ease: EASE.drape }}
              onAnimationComplete={() => {
                if (covering) onCovered();
                else setPhase("idle");
              }}
            >
              <span className="grain-layer" />
            </motion.div>

            {/* Held at the centre of the viewport rather than carried by the
                plate, so the name is actually readable while it holds. */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="label-mono text-ivory/70"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: covering ? 1 : 0,
                  y: covering ? 0 : -10,
                }}
                transition={{
                  duration: 0.45,
                  ease: EASE.soft,
                  delay: covering ? 0.42 : 0,
                }}
              >
                {label || "Lusian"}
              </motion.span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
