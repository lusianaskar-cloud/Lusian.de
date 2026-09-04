import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 01, 02, 03 … used for editorial section numbering. */
export function ordinal(index: number) {
  return String(index + 1).padStart(2, "0");
}
