"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { nav, contactChannels } from "@/lib/content/site";
import { TransitionLink } from "@/components/primitives/TransitionLink";
import { EASE } from "@/lib/motion";
import { getLenis } from "./SmoothScroll";
import { ordinal } from "@/lib/utils";

const panel = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)" },
  exit: { clipPath: "inset(100% 0% 0% 0%)" },
};

/** Full-bleed menu. The panel unrolls downward; the list arrives behind it. */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !ref.current) return;

      const focusable = ref.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onClose);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onClose);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [onClose]);

  const duration = reduced ? 0 : 0.85;

  return (
    <motion.div
      id="mobile-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="grain fixed inset-0 z-[95] flex flex-col overflow-y-auto bg-ink tone-dark lg:hidden"
      variants={panel}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration, ease: EASE.drape }}
    >
      <span aria-hidden className="grain-layer" />

      <div className="relative z-10 flex min-h-full flex-col justify-between px-(--spacing-gutter) pb-12 pt-32">
        <nav aria-label="Primary">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-ivory/10">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={reduced ? false : { y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: reduced ? 0 : 0.9,
                      ease: EASE.expo,
                      delay: reduced ? 0 : 0.28 + i * 0.07,
                    }}
                  >
                    <TransitionLink
                      href={item.href}
                      transitionLabel={item.label}
                      onClick={onClose}
                      className="flex items-baseline gap-5 py-5"
                    >
                      <span className="label-mono text-ivory/35">{ordinal(i)}</span>
                      <span className="font-display text-[clamp(2.1rem,10vw,3.25rem)] leading-none">
                        {item.label}
                      </span>
                    </TransitionLink>
                  </motion.span>
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <motion.div
          className="mt-16 space-y-8"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.9, ease: EASE.expo, delay: reduced ? 0 : 0.62 }}
        >
          <TransitionLink
            href="/contact"
            transitionLabel="Private consultation"
            onClick={onClose}
            className="flex items-center justify-between gap-4 rounded-full border border-ivory/25 px-7 py-5 label-mono"
          >
            Request a private consultation
            <span aria-hidden className="block size-1.5 rounded-full bg-champagne" />
          </TransitionLink>

          <div className="space-y-2 label-mono text-ivory/45">
            <p>
              <a href={`mailto:${contactChannels.email}`} className="underline-offset-4 hover:underline">
                {contactChannels.email}
              </a>
            </p>
            <p>Enquiries are read by a principal.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
