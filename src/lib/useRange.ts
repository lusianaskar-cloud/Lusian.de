"use client";

import { useTransform, type MotionValue } from "motion/react";

/**
 * Piecewise-linear mapping of a scroll progress value, evaluated in JavaScript.
 *
 * ── Why not `useTransform(value, input[], output[])` ────────────────────
 * Given an input/output array pair, Motion may hand a standalone animatable
 * property — `opacity` above all — to a native scroll-driven animation, using
 * the input array as keyframe offsets. Composite properties like `scale` and
 * `y` fold into `transform` and stay in JS. The two paths do not agree, so a
 * beat's opacity and its movement can end up reading different progress. A
 * function transformer is always evaluated in JS, which keeps every derived
 * value on one timeline.
 *
 * Numbers and single-unit strings ("38%", "-13%") are both supported; the unit
 * is taken from the output values and must be consistent.
 * ────────────────────────────────────────────────────────────────────────
 */
type Output = number | string;

function splitUnit(value: Output): [number, string] {
  if (typeof value === "number") return [value, ""];
  const match = /^(-?[\d.]+)(.*)$/.exec(value.trim());
  if (!match) return [0, ""];
  return [Number(match[1]), match[2]];
}

export function rangeMapper(input: number[], output: readonly Output[]) {
  const numbers = output.map((value) => splitUnit(value)[0]);
  const unit = splitUnit(output[0])[1];

  return (value: number) => {
    let result: number;
    if (value <= input[0]) {
      result = numbers[0];
    } else if (value >= input[input.length - 1]) {
      result = numbers[numbers.length - 1];
    } else {
      let i = 0;
      while (i < input.length - 2 && value > input[i + 1]) i += 1;
      const span = input[i + 1] - input[i];
      const t = span === 0 ? 0 : (value - input[i]) / span;
      result = numbers[i] + (numbers[i + 1] - numbers[i]) * t;
    }
    return unit ? `${result}${unit}` : result;
  };
}

/** Scroll-safe replacement for the array form of `useTransform`. */
export function useRange<O extends Output>(
  value: MotionValue<number>,
  input: number[],
  output: readonly O[],
): MotionValue<O extends string ? string : number> {
  return useTransform(value, rangeMapper(input, output)) as unknown as MotionValue<
    O extends string ? string : number
  >;
}
