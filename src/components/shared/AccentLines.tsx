import type { ReactNode } from "react";

import type { Line } from "@/lib/i18n/types";
import { splitAccent } from "@/lib/i18n/format";
import { cn } from "@/lib/utils";

/**
 * Renders translated headline lines, setting the accented word in italic.
 *
 * The accent is carried as a substring rather than a position, because the
 * emphasised word lands somewhere different in every language — "strategy",
 * "Strategie" and "الاستراتيجية" do not sit in the same place in their
 * sentences. A line whose accent has been rewritten away simply renders plain.
 */
export function accentLines(lines: Line[], accentClass: string): ReactNode[] {
  return lines.map((line, i) => {
    const part = splitAccent(line.text, line.accent);
    return (
      <span key={i}>
        {part.before}
        {part.accent ? (
          <em className={cn("font-normal", accentClass)}>{part.accent}</em>
        ) : null}
        {part.after}
      </span>
    );
  });
}

/** Plain headline lines, for the many headings with no accented word. */
export function plainLines(lines: string[]): ReactNode[] {
  return lines.map((line, i) => <span key={i}>{line}</span>);
}
