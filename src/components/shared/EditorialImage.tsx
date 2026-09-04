"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Plate } from "@/lib/content/plates";
import { cn } from "@/lib/utils";

/**
 * A photographic slot that is finished whether or not a photograph exists.
 *
 * With `plate.src` set it renders the image with a slow crossing parallax and
 * a tonal wash that keeps it inside the palette. Without one it renders a
 * reserved frame carrying the brief for the shot — deliberately designed, so
 * the page reads as complete rather than broken.
 */
export function EditorialImage({
  plate,
  className,
  ratio = "aspect-[21/9]",
  tone = "dark",
  priority = false,
}: {
  plate: Plate;
  className?: string;
  ratio?: string;
  tone?: "dark" | "light";
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div
      ref={ref}
      className={cn(
        "grain relative w-full overflow-hidden",
        ratio,
        tone === "dark" ? "bg-petrol" : "bg-dune",
        className,
      )}
    >
      {plate.src ? (
        <motion.div className="absolute inset-x-0 -top-[7%] h-[114%]" style={{ y: reduced ? 0 : y }}>
          <Image
            src={plate.src}
            alt={plate.alt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ) : (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0",
            tone === "dark" ? "text-ivory" : "text-ink",
          )}
        >
          {/* Reserved frame: crop marks, plate number, and the brief itself. */}
          <span
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 14px)",
            }}
          />
          {(
            [
              "left-5 top-5 border-l border-t",
              "right-5 top-5 border-r border-t",
              "left-5 bottom-5 border-l border-b",
              "right-5 bottom-5 border-r border-b",
            ] as const
          ).map((corner) => (
            <span
              key={corner}
              className={cn("absolute size-6 border-current/40", corner)}
            />
          ))}

          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <span className="label-mono text-current/45">
              Plate {plate.id} — photography to be supplied
            </span>
            <p className="mt-5 max-w-lg text-[0.875rem] leading-relaxed text-current/60">
              {plate.brief}
            </p>
          </div>
        </div>
      )}

      <span aria-hidden className="grain-layer" />

      {plate.src ? (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0",
            tone === "dark"
              ? "bg-gradient-to-t from-ink/70 via-ink/20 to-ink/40"
              : "bg-gradient-to-t from-ivory/50 via-transparent to-ivory/30",
          )}
        />
      ) : null}

      <span
        className={cn(
          "label-mono absolute bottom-[1.4rem] left-14",
          tone === "dark" ? "text-ivory/45" : "text-ink/45",
        )}
      >
        {plate.caption}
      </span>
    </div>
  );
}
