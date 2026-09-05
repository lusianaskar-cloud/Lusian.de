"use client";

import { useContent } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/**
 * A reserved slot for factual content the firm must supply.
 *
 * Deliberately visible: it is honest about what is not yet known, and it is
 * trivial to find and delete. Every instance is also listed in
 * docs/CONTENT-TODO.md — and it stays outstanding in all three languages,
 * because a fact that is missing in English is missing everywhere.
 */
export function PlaceholderBlock({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  const { ui } = useContent();

  return (
    <div
      className={cn(
        "relative flex h-full flex-col border border-current/15 p-7 lg:p-9",
        className,
      )}
    >
      <span className="type-voice inline-flex items-center gap-2.5 text-[0.8125rem] text-accent">
        <span aria-hidden className="block size-1.5 bg-current" />
        {ui.toBeSupplied}
      </span>
      <h3 className="type-structure mt-6 text-[calc(clamp(1.2rem,1.6vw,1.45rem)*var(--ar-struct))]">
        {title}
      </h3>
      <p className="type-voice mt-4 text-[0.875rem] text-tone-muted">{description}</p>
    </div>
  );
}
