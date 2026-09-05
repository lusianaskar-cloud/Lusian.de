"use client";

import { monthGrid, monthLabel, formatLongDate, weekdayLabels } from "./time";
import { Arrow } from "@/components/primitives/Arrow";
import { useContent, useIntlLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/**
 * A month grid where only days with real availability are selectable.
 *
 * `availableDays` comes from the scheduling provider. A day is never shown as
 * open because the calendar felt empty.
 */
export function Calendar({
  year,
  month,
  availableDays,
  selected,
  onSelect,
  onStep,
  canStepBack,
  loading,
}: {
  year: number;
  month: number;
  availableDays: Set<string>;
  selected: string | null;
  onSelect: (day: string) => void;
  onStep: (delta: number) => void;
  canStepBack: boolean;
  loading: boolean;
}) {
  const { ui } = useContent();
  const locale = useIntlLocale();
  const cells = monthGrid(year, month);
  const weekdays = weekdayLabels(locale);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-b border-current/15 pb-5">
        <h3 className="font-display text-[1.5rem] tracking-tight" aria-live="polite">
          {monthLabel(year, month, locale)}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onStep(-1)}
            disabled={canStepBack === false}
            aria-label={ui.previousMonth}
            className="grid size-11 place-items-center rounded-full transition-opacity duration-300 hover:bg-current/5 disabled:pointer-events-none disabled:opacity-25"
          >
            <Arrow className="w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label={ui.nextMonth}
            className="grid size-11 place-items-center rounded-full transition-opacity duration-300 hover:bg-current/5"
          >
            <Arrow className="w-4" />
          </button>
        </div>
      </div>

      <div aria-hidden className="mt-6 grid grid-cols-7 gap-1">
        {weekdays.map((label, i) => (
          <span key={i} className="label-mono grid h-8 place-items-center text-tone-muted">
            {label}
          </span>
        ))}
      </div>

      <div className={cn("mt-1 grid grid-cols-7 gap-1", loading && "opacity-40")}>
        {cells.map((cell) => {
          if (!cell.inMonth) return <span key={cell.key} aria-hidden />;
          const available = availableDays.has(cell.key);
          const isSelected = selected === cell.key;

          return (
            <button
              key={cell.key}
              type="button"
              disabled={!available}
              aria-pressed={isSelected}
              aria-label={formatLongDate(`${cell.key}T12:00:00Z`, "UTC", locale)}
              onClick={() => onSelect(cell.key)}
              className={cn(
                "relative grid h-12 place-items-center text-[0.9375rem] tabular-nums transition-colors duration-300 sm:h-11",
                available
                  ? "cursor-pointer hover:bg-current/8"
                  : "cursor-default text-current/25",
                isSelected &&
                  "bg-[color:var(--tone-fg)] text-[color:var(--tone-bg)] hover:bg-[color:var(--tone-fg)]",
              )}
            >
              {cell.day}
              {available && !isSelected ? (
                <span
                  aria-hidden
                  className="absolute bottom-2 block size-1 rounded-full bg-[color:var(--tone-accent)]"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
