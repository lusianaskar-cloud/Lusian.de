"use client";

import { useReducedMotion } from "motion/react";
import { useIsClient } from "./useIsClient";

/**
 * `prefers-reduced-motion`, without a hydration mismatch.
 *
 * The server cannot read the media query, so Motion's `useReducedMotion`
 * returns false there and true on the client — and anything that renders a
 * different tree, or even a different `initial` style, then fails to hydrate.
 *
 * This reports false until the client has mounted, so the server render and
 * the hydration render always agree; the reduced layout takes over on the
 * commit immediately after. Use this anywhere the preference changes what is
 * rendered. Reading Motion's hook directly is still fine inside effects and
 * event handlers, which never run during hydration.
 */
export function useSafeReducedMotion(): boolean {
  const mounted = useIsClient();
  const prefers = useReducedMotion();
  return mounted && Boolean(prefers);
}
