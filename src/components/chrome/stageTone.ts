"use client";

import { useSyncExternalStore } from "react";

type Tone = "light" | "dark";

/**
 * A pinned scene occupies the viewport while its own tonality changes — the
 * opening scene starts on ivory and ends on ink without the section ever
 * moving. Measuring `[data-tone]` by document position cannot see that, so a
 * scene can declare what is currently under the header and the header
 * prefers that declaration while it is set.
 */
let override: Tone | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function setStageTone(tone: Tone | null) {
  if (override === tone) return;
  override = tone;
  emit();
}

export function useStageTone() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => override,
    () => null,
  );
}
