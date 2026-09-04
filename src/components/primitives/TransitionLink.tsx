"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useTransitionNavigate } from "@/components/chrome/TransitionProvider";

type TransitionLinkProps = ComponentProps<typeof Link> & {
  /** Shown inside the curtain while the destination loads. */
  transitionLabel?: string;
};

/**
 * A normal anchor for crawlers, keyboards and modified clicks — but a plain
 * left-click hands navigation to the curtain.
 */
export function TransitionLink({
  href,
  onClick,
  transitionLabel,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = useTransitionNavigate();
  const target = typeof href === "string" ? href : href.pathname ?? "";

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
    if (!target.startsWith("/")) return;

    event.preventDefault();
    navigate(target, transitionLabel);
  }

  return <Link href={href} onClick={handleClick} {...rest} />;
}
