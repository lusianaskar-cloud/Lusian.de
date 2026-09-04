import { cn } from "@/lib/utils";

/**
 * The Lusian mark: an inscribed horizon.
 * Read one way it is an attitude indicator; read the other, a desert horizon.
 * One glyph for both divisions.
 */
export function Mark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("h-6 w-6", className)}
    >
      <circle
        cx="12"
        cy="12"
        r="10.5"
        stroke="currentColor"
        strokeWidth="1"
        className={animated ? "origin-center [stroke-dasharray:66] [stroke-dashoffset:66] animate-[markdraw_1.4s_cubic-bezier(0.16,1,0.3,1)_forwards]" : undefined}
      />
      <path
        d="M2.3 14.55h19.4"
        stroke="currentColor"
        strokeWidth="1"
        className={animated ? "origin-center [stroke-dasharray:20] [stroke-dashoffset:20] animate-[markdraw_1s_cubic-bezier(0.16,1,0.3,1)_0.55s_forwards]" : undefined}
      />
    </svg>
  );
}
