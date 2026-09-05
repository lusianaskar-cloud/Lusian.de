import { cn } from "@/lib/utils";

/**
 * A long-shafted arrow. Thin, wide, and deliberately unlike a chevron.
 *
 * It mirrors itself in a right-to-left page, because an arrow means "onward"
 * and onward is leftward in Arabic. Callers that also travel the arrow on
 * hover pair their `translate-x` with an `rtl:` counterpart, so the glyph and
 * its motion agree.
 */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 10"
      fill="none"
      aria-hidden
      className={cn("h-[10px] w-7 shrink-0 rtl:-scale-x-100", className)}
    >
      <path d="M0 5h26" stroke="currentColor" strokeWidth="1" />
      <path d="M21.5 1 26 5l-4.5 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
