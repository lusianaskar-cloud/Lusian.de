"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, site } from "@/lib/content/site";
import { TransitionLink } from "@/components/primitives/TransitionLink";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Mark } from "./Mark";
import { MobileMenu } from "./MobileMenu";
import { useHeaderTone } from "./useHeaderTone";

export function SiteHeader() {
  const pathname = usePathname();
  const tone = useHeaderTone();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setLifted(y > 24);
        const delta = y - lastY.current;
        if (y > 520 && delta > 4) setHidden(true);
        else if (delta < -6 || y < 240) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = open || tone === "dark";

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-colors duration-700",
          dark ? "text-ivory" : "text-ink",
        )}
        initial={false}
        animate={{ y: hidden && !open ? "-102%" : "0%" }}
        transition={{ duration: reduced ? 0 : 0.75, ease: EASE.expo }}
      >
        {/* Tonal band appears only once the page has moved. */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 border-b backdrop-blur-xl transition-all duration-700",
            lifted && !open ? "opacity-100" : "opacity-0",
            dark ? "border-ivory/10 bg-ink/70" : "border-ink/10 bg-ivory/70",
          )}
        />

        <div className="container-editorial">
          <div className="flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5.25rem]">
            <TransitionLink
              href="/"
              transitionLabel="Lusian"
              aria-label={`${site.name} — home`}
              className="group flex shrink-0 items-center gap-3"
            >
              <Mark className="h-[1.35rem] w-[1.35rem] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180" />
              <span className="text-[0.9rem] font-medium tracking-[0.38em] sm:text-[0.95rem]">
                {site.wordmark}
              </span>
            </TransitionLink>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {nav.map((item) => {
                  const active =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <TransitionLink
                        href={item.href}
                        transitionLabel={item.label}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative block py-2 text-[0.8125rem] tracking-[0.01em] transition-opacity duration-500",
                          active ? "opacity-100" : "opacity-55 hover:opacity-100",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute -bottom-0.5 left-0 block h-px w-full origin-left bg-current transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                          )}
                        />
                      </TransitionLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <TransitionLink
                href="/contact"
                transitionLabel="Private consultation"
                className={cn(
                  "group relative hidden items-center gap-2.5 overflow-hidden rounded-full border border-current/25 px-5 py-2.5 label-mono lg:inline-flex",
                  "transition-colors duration-500",
                  dark ? "hover:text-ink" : "hover:text-ivory",
                )}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-current transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <span aria-hidden className="relative z-10 block size-1 rounded-full bg-current" />
                <span className="relative z-10">Enquire</span>
              </TransitionLink>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="relative -mr-2 flex size-11 items-center justify-center lg:hidden"
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <span aria-hidden className="relative block h-3 w-6">
                  <motion.span
                    className="absolute left-0 block h-px w-full bg-current"
                    animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                    transition={{ duration: reduced ? 0 : 0.5, ease: EASE.soft }}
                  />
                  <motion.span
                    className="absolute left-0 block h-px w-full bg-current"
                    animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                    transition={{ duration: reduced ? 0 : 0.5, ease: EASE.soft }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? <MobileMenu onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
