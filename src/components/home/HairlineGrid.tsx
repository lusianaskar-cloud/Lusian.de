import { cn } from "@/lib/utils";

/**
 * The structural grid, drawn. Rendered identically in both hero layers so the
 * lines continue across the horizon and simply change colour where the ink
 * panel crosses them.
 */
export function HairlineGrid({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="container-editorial h-full">
        <div className="grid h-full grid-cols-4 lg:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "block h-full border-l border-current/[0.07]",
                i >= 4 && "hidden lg:block",
                i === 0 && "border-l-0",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
