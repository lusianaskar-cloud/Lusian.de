"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media queries as an external store rather than effect-driven state — the
 * subscription is the source of truth, so there is no render-then-correct.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
