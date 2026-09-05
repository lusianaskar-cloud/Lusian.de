import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A section's name, said quietly.
 *
 * It used to be a tracked-out monospace capital with a hairline tick in front
 * of it, repeated at the head of every section on the site — the single most
 * recognisable tic in the old design, and the thing that made each page read
 * as a template rather than as a page. It is now VOICE at small size in
 * sentence case: still subordinate, but a phrase a person wrote rather than a
 * label a system generated.
 *
 * `label-mono` survives only where small capitals mean something — codes,
 * booking references, timestamps.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("type-voice block text-[0.9375rem] text-tone-muted", className)}>
      {children}
    </span>
  );
}
