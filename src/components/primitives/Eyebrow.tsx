import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small mono label with a leading tick — the site's section signature. */
export function Eyebrow({
  children,
  className,
  tick = true,
}: {
  children: ReactNode;
  className?: string;
  tick?: boolean;
}) {
  return (
    <span className={cn("label-mono inline-flex items-center gap-3 text-tone-muted", className)}>
      {tick ? (
        <span aria-hidden className="inline-block h-px w-6 bg-current opacity-50" />
      ) : null}
      {children}
    </span>
  );
}
