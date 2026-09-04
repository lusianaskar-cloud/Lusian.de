"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny store so the hero can wait for the opening curtain to part before it
 * begins, without prop-drilling through the server layout.
 */
let ready = false;
const listeners = new Set<() => void>();

export function markIntroReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useIntroReady() {
  return useSyncExternalStore(
    subscribe,
    () => ready,
    () => false,
  );
}
