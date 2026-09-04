"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "peer w-full border-0 border-b border-current/20 bg-transparent pb-3 pt-2 text-[1.0625rem] " +
  "placeholder:text-current/30 focus:border-current/60 focus:outline-none focus:ring-0 " +
  "transition-colors duration-500";

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
      <label htmlFor={htmlFor} className="label-mono block text-tone-muted">
        {label}
      </label>
      <div className="mt-3">{children}</div>
      {hint ? (
        <p className="mt-2 text-[0.75rem] leading-relaxed text-tone-muted">{hint}</p>
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
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <FieldShell label={required ? label : `${label} (optional)`} htmlFor={id} className={className}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={control}
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
  return (
    <FieldShell label={required ? label : `${label} (optional)`} htmlFor={id} className={className}>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue=""
          className={cn(control, "appearance-none pr-8")}
        >
          <option value="" disabled>
            Select
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
          className="pointer-events-none absolute right-0 top-1/2 h-2 w-3 -translate-y-1/2 opacity-45"
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
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <FieldShell label={required ? label : `${label} (optional)`} htmlFor={id}>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={cn(control, "resize-none")}
      />
    </FieldShell>
  );
}
