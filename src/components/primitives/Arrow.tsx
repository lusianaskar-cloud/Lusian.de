import { cn } from "@/lib/utils";

/** A long-shafted arrow. Thin, wide, and deliberately unlike a chevron. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 10"
      fill="none"
      aria-hidden
      className={cn("h-[10px] w-7 shrink-0", className)}
    >
      <path d="M0 5h26" stroke="currentColor" strokeWidth="1" />
      <path d="M21.5 1 26 5l-4.5 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
