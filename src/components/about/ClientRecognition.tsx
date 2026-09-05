"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useContent } from "@/lib/i18n/context";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Who each practice is for.
 *
 * Not a grid of fourteen cards. Two columns of plain names at display scale,
 * where attending to one recedes the rest — the reader picks their own line
 * out of the list, which is the only job this section has. Nothing is hidden
 * behind the interaction; it only changes emphasis.
 */
export function ClientRecognition() {
  const [held, setHeld] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const { recognition } = useContent().about;

  const columns = [
    { key: "aviation", label: recognition.aviationLabel, items: recognition.aviation },
    { key: "private", label: recognition.privateLabel, items: recognition.privateAdvisory },
  ];

  return (
    <div>
      <Reveal>
        <Eyebrow>{recognition.eyebrow}</Eyebrow>
      </Reveal>
      <h2 className="mt-8 max-w-[18ch] font-display text-title">
        <LineReveal lines={[<span key="1">{recognition.headline}</span>]} />
      </h2>

      <div
        className="mt-16 grid gap-x-16 gap-y-14 lg:mt-24 lg:grid-cols-2"
        onMouseLeave={() => setHeld(null)}
      >
        {columns.map((column) => (
          <div key={column.key}>
            <Reveal>
              <span className="label-mono text-tone-muted">{column.label}</span>
            </Reveal>
            <ul className="mt-8">
              {column.items.map((item) => (
                <li key={item}>
                  <motion.p
                    onMouseEnter={() => setHeld(item)}
                    onFocus={() => setHeld(item)}
                    onBlur={() => setHeld(null)}
                    tabIndex={0}
                    animate={{
                      opacity: reduced ? 1 : held && held !== item ? 0.3 : 1,
                    }}
                    transition={{ duration: 0.45, ease: EASE.soft }}
                    className={cn(
                      "cursor-default py-2 font-display text-[clamp(1.3rem,2.5vw,2rem)] leading-snug tracking-tight",
                      "outline-none focus-visible:text-accent",
                    )}
                  >
                    {item}
                  </motion.p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
