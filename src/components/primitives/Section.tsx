import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /**
   * Declares the section's tonality. The site header reads `data-tone` from
   * whichever section sits beneath it and inverts itself to match.
   */
  tone?: Tone;
  id?: string;
  as?: ElementType;
  grain?: boolean;
  "aria-labelledby"?: string;
};

const toneClass: Record<Tone, string> = {
  light: "tone-light",
  dark: "tone-dark",
};

export function Section({
  children,
  className,
  tone = "light",
  id,
  as: Tag = "section",
  grain = false,
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-tone={tone}
      className={cn(toneClass[tone], grain && "grain", "relative", className)}
      {...rest}
    >
      {grain ? <span aria-hidden className="grain-layer" /> : null}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}

export function Container({
  children,
  className,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div className={cn(narrow ? "container-narrow" : "container-editorial", className)}>
      {children}
    </div>
  );
}
