"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Depth without drama. Translates a layer against the scroll by a small
 * distance while it crosses the viewport.
 */
export function Parallax({
  children,
  className,
  distance = 60,
  scale = false,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const s = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y, scale: scale ? s : undefined }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
