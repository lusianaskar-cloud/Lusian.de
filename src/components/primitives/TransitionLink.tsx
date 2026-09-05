"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useTransitionNavigate } from "@/components/chrome/TransitionProvider";
import { useLocalePath } from "@/lib/i18n/context";

type TransitionLinkProps = ComponentProps<typeof Link> & {
  /** Shown inside the curtain while the destination loads. */
  transitionLabel?: string;
};

/**
 * A normal anchor for crawlers, keyboards and modified clicks — but a plain
 * left-click hands navigation to the curtain.
 *
 * It is also where the locale prefix is applied. Every internal href in this
 * codebase is written without one (`/aviation`, not `/de/aviation`), and this
 * component is what every internal link ultimately renders through, so the
 * language a reader is in survives navigation without any caller having to
 * remember it — and without a round trip through the proxy's redirect.
 */
export function TransitionLink({
  href,
  onClick,
  transitionLabel,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = useTransitionNavigate();
  const withLocale = useLocalePath();

  const raw = typeof href === "string" ? href : (href.pathname ?? "");
  const internal = raw.startsWith("/");
  const target = internal ? withLocale(raw) : raw;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }
    if (!internal) return;

    event.preventDefault();
    navigate(target, transitionLabel);
  }

  return <Link href={internal ? target : href} onClick={handleClick} {...rest} />;
}
