"use client";

import type { ReactNode } from "react";
import { useContent } from "@/lib/i18n/context";
import { format } from "@/lib/i18n/format";
import { cn } from "@/lib/utils";

const control =
  "peer w-full border-0 border-b border-current/20 bg-transparent pb-3 pt-2 text-[1.0625rem] " +
  "placeholder:text-current/30 focus:border-current/60 focus:outline-none focus:ring-0 " +
  "transition-colors duration-500";

/**
 * "(optional)" is a translated pattern rather than an appended English word,
 * because where it sits relative to the label is a decision each language
 * makes for itself.
 */
function useOptionalLabel() {
  const { ui } = useContent();
  return (label: string, required?: boolean) =>
    required ? label : format(ui.optional, { label });
}

export function FieldShell({
  label,
  htmlFor,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={htmlFor} className="type-voice block text-[0.8125rem] text-tone-muted">
        {label}
      </label>
      <div className="mt-3">{children}</div>
      {hint ? (
        <p className="mt-2 type-voice text-[0.75rem] text-tone-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextField({
  id,
  name,
  label,
  type = "text",
  required,
  autoComplete,
  placeholder,
  className,
  value,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
  /** Supply both to control the field; omit both to leave it uncontrolled. */
  value?: string;
  onChange?: (value: string) => void;
}) {
  const withOptional = useOptionalLabel();

  return (
    <FieldShell label={withOptional(label, required)} htmlFor={id} className={className}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={control}
        {...(onChange
          ? { value: value ?? "", onChange: (e) => onChange(e.target.value) }
          : {})}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  name,
  label,
  options,
  required,
  className,
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  required?: boolean;
  className?: string;
}) {
  const { ui } = useContent();
  const withOptional = useOptionalLabel();

  return (
    <FieldShell label={withOptional(label, required)} htmlFor={id} className={className}>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue=""
          className={cn(control, "appearance-none pe-8")}
        >
          <option value="" disabled>
            {ui.select}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-ivory text-ink">
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 12 8"
          className="pointer-events-none absolute end-0 top-1/2 h-2 w-3 -translate-y-1/2 opacity-45"
        >
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </FieldShell>
  );
}

export function TextArea({
  id,
  name,
  label,
  required,
  rows = 4,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const withOptional = useOptionalLabel();

  return (
    <FieldShell label={withOptional(label, required)} htmlFor={id}>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={cn(control, "resize-none")}
        {...(onChange
          ? { value: value ?? "", onChange: (e) => onChange(e.target.value) }
          : {})}
      />
    </FieldShell>
  );
}
