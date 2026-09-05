"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type Node = { x: number; y: number; hub?: boolean; late?: boolean };

/**
 * The aviation instrument.
 *
 * Three modes, one canvas:
 *
 * · **Autonomous** — no `progress` given: the network draws itself once when
 *   it enters view, then carries traffic. Used on the aviation page hero and
 *   the schematic plate.
 * · **Scrubbed** — `progress` given: the draw is tied directly to scroll, so
 *   scrolling literally builds the network. Used in Scenes 02 and 03.
 * · **Morphing** — `morph` given: node positions ease toward horizon bands,
 *   arcs flatten, the palette warms and the routes resolve into architectural
 *   contour. This is Scene 04, and it is one continuous geometry rather than
 *   two graphics cross-fading.
 *
 * MotionValues are read through refs inside the rAF loop, so scrubbing never
 * triggers a React render. The loop is suspended entirely when the canvas
 * leaves the viewport, and under reduced motion it paints one final frame and
 * stops.
 */
const NODES: Node[] = [
  { x: 0.06, y: 0.34 },
  { x: 0.15, y: 0.72 },
  { x: 0.235, y: 0.18 },
  { x: 0.31, y: 0.52, hub: true },
  { x: 0.4, y: 0.83 },
  { x: 0.455, y: 0.29 },
  { x: 0.54, y: 0.62 },
  { x: 0.6, y: 0.13 },
  { x: 0.655, y: 0.44, hub: true },
  { x: 0.73, y: 0.78 },
  { x: 0.79, y: 0.24 },
  { x: 0.86, y: 0.57 },
  { x: 0.94, y: 0.36, late: true },
  { x: 0.965, y: 0.74, late: true },
  { x: 0.035, y: 0.58, late: true },
  { x: 0.5, y: 0.05, late: true },
];

const EDGES: [number, number][] = [
  [0, 3], [1, 3], [2, 3], [3, 5], [3, 6], [3, 4],
  [5, 8], [6, 8], [7, 8], [8, 9], [8, 10], [8, 11],
  [10, 12], [11, 12], [11, 13], [9, 13], [2, 5],
  [0, 1], [12, 13], [4, 6], [14, 0], [14, 1], [15, 7], [15, 2],
];

/** Horizon bands the network resolves into when it morphs. */
const BANDS = [0.32, 0.45, 0.56, 0.67, 0.79];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/** Triangular falloff — 1 at `centre`, 0 a full step away. */
const bump = (x: number, centre: number) => Math.max(0, 1 - Math.abs(x - centre));

function toRgb(hex: string) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ] as const;
}

function mixRgb(a: readonly number[], b: readonly number[], t: number) {
  return `${Math.round(mix(a[0], b[0], t))},${Math.round(mix(a[1], b[1], t))},${Math.round(
    mix(a[2], b[2], t),
  )}`;
}

export function RouteNetwork({
  className,
  color = "#A0B8C2",
  accent = "#C6AD82",
  warm = "#C6AD82",
  opacity = 0.6,
  graticule = false,
  progress,
  morph,
  emphasis,
  traffic = true,
}: {
  className?: string;
  color?: string;
  accent?: string;
  /** Colour the network resolves to at full morph. */
  warm?: string;
  opacity?: number;
  graticule?: boolean;
  /** 0→1 draw progress. Omit for the autonomous one-shot draw. */
  progress?: MotionValue<number>;
  /** 0 = route network · 1 = horizon contour. */
  morph?: MotionValue<number>;
  /** 0–4. Shifts which part of the system is emphasised. */
  emphasis?: MotionValue<number>;
  traffic?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  // MotionValues read through refs so scrubbing never re-renders React.
  const pRef = useRef(progress ? progress.get() : 0);
  const mRef = useRef(morph ? morph.get() : 0);
  const eRef = useRef(emphasis ? emphasis.get() : -1);

  useEffect(() => {
    if (!progress) return;
    pRef.current = progress.get();
    return progress.on("change", (v) => {
      pRef.current = v;
    });
  }, [progress]);

  useEffect(() => {
    if (!morph) return;
    mRef.current = morph.get();
    return morph.on("change", (v) => {
      mRef.current = v;
    });
  }, [morph]);

  useEffect(() => {
    if (!emphasis) return;
    eRef.current = emphasis.get();
    return emphasis.on("change", (v) => {
      eRef.current = v;
    });
  }, [emphasis]);

  const scrubbed = Boolean(progress);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const cold = toRgb(color);
    const hot = toRgb(accent);
    const warmRgb = toRgb(warm);

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let firstSeenAt = 0;

    const edges = EDGES.map(([i, j], index) => {
      const a = NODES[i];
      const b = NODES[j];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      return {
        i,
        j,
        len,
        /** Normalised 0–1 across the edge set, for emphasis selection. */
        weight: Math.min(1, len / 0.55),
        stagger: (index % 7) / 7,
        speed: 0.14 + ((index * 37) % 11) / 90,
        offset: ((index * 53) % 97) / 97,
      };
    });

    // Where each node travels to when the network resolves into contour.
    const horizon = NODES.map((n, i) => ({
      x: mix(n.x, (i % 8) / 7, 0.55) * 1.06 - 0.03,
      y: BANDS[i % BANDS.length],
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const nodeAt = (index: number, m: number) => {
      const n = NODES[index];
      const h = horizon[index];
      const t = easeOut(m);
      return { x: mix(n.x, h.x, t) * width, y: mix(n.y, h.y, t) * height };
    };

    const draw = (now: number) => {
      if (width === 0 || height === 0) return;

      const m = clamp01(mRef.current);
      const em = eRef.current;
      const drawn = scrubbed
        ? clamp01(pRef.current)
        : clamp01((now - firstSeenAt) / 2400);

      const lineRgb = mixRgb(cold, warmRgb, m);
      const accentRgb = mixRgb(hot, warmRgb, m * 0.6);

      ctx.clearRect(0, 0, width, height);

      // Graticule — strengthens while regulation holds focus.
      if (graticule || em >= 0) {
        const strength = graticule ? 0.12 : 0;
        const boost = em >= 0 ? bump(em, 3) * 0.16 : 0;
        const alpha = (strength + boost) * (1 - m);
        if (alpha > 0.004) {
          ctx.strokeStyle = `rgba(${lineRgb},${alpha * opacity * 3})`;
          ctx.lineWidth = 1;
          for (let i = 1; i < 8; i += 1) {
            const gx = Math.round((width / 8) * i) + 0.5;
            ctx.beginPath();
            ctx.moveTo(gx, 0);
            ctx.lineTo(gx, height);
            ctx.stroke();
          }
          for (let i = 1; i < 5; i += 1) {
            const gy = Math.round((height / 5) * i) + 0.5;
            ctx.beginPath();
            ctx.moveTo(0, gy);
            ctx.lineTo(width, gy);
            ctx.stroke();
          }
        }
      }

      // Routes.
      const routeFade = 1 - clamp01((m - 0.15) / 0.55);
      edges.forEach((edge) => {
        const local = clamp01((drawn - edge.stagger * 0.42) / (1 - edge.stagger * 0.42));
        if (local <= 0) return;

        const lateEdge = NODES[edge.i].late || NODES[edge.j].late;
        // New nodes and their edges arrive while development holds focus.
        const lateGate = lateEdge ? (em >= 0 ? clamp01((em - 1.4) / 0.6) : 1) : 1;
        if (lateGate <= 0.01) return;

        const a = nodeAt(edge.i, m);
        const b = nodeAt(edge.j, m);

        // Bow relaxes to almost nothing as the network resolves to contour.
        const lift = mix(Math.min(0.16, edge.len * 0.28), 0.012, easeOut(m));
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const cx = (a.x + b.x) / 2 - dy * lift * 1.6;
        const cy = (a.y + b.y) / 2 + dx * lift * 1.6;

        let alpha = 0.5;
        if (em >= 0) {
          // Strategy favours the trunk routes; operations the short local ones.
          alpha =
            0.34 +
            bump(em, 0) * edge.weight * 0.62 +
            bump(em, 1) * (1 - edge.weight) * 0.62 +
            bump(em, 2) * 0.14;
        }

        ctx.strokeStyle = `rgba(${lineRgb},${alpha * opacity * routeFade * lateGate})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        const steps = 26;
        for (let s = 1; s <= steps; s += 1) {
          const t = (s / steps) * easeOut(local);
          const it = 1 - t;
          ctx.lineTo(
            it * it * a.x + 2 * it * t * cx + t * t * b.x,
            it * it * a.y + 2 * it * t * cy + t * t * b.y,
          );
        }
        ctx.stroke();

        // Traffic.
        if (!traffic || reduced || local < 1 || routeFade < 0.2) return;
        const rate = edge.speed * (em >= 0 ? 1 + bump(em, 4) * 2.6 : 1);
        const travel = ((now / 1000) * rate + edge.offset) % 1;
        const tail = 0.09;
        ctx.strokeStyle = `rgba(${accentRgb},${0.85 * opacity * routeFade * lateGate})`;
        ctx.lineWidth = 1.15;
        ctx.beginPath();
        for (let s = 0; s <= 10; s += 1) {
          const t = Math.max(0, travel - tail + (s / 10) * tail);
          const it = 1 - t;
          const px = it * it * a.x + 2 * it * t * cx + t * t * b.x;
          const py = it * it * a.y + 2 * it * t * cy + t * t * b.y;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });

      // Contour — the same nodes, read as a horizon.
      const contour = clamp01((m - 0.3) / 0.6);
      if (contour > 0.01) {
        ctx.lineWidth = 1;
        BANDS.forEach((_, band) => {
          const members = NODES.map((_, i) => i)
            .filter((i) => i % BANDS.length === band)
            .map((i) => nodeAt(i, m))
            .sort((p, q) => p.x - q.x);
          if (members.length < 2) return;

          ctx.strokeStyle = `rgba(${lineRgb},${contour * opacity * 0.78})`;
          ctx.beginPath();
          ctx.moveTo(-40, members[0].y);
          for (let i = 0; i < members.length - 1; i += 1) {
            const p = members[i];
            const q = members[i + 1];
            ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2);
          }
          const last = members[members.length - 1];
          ctx.quadraticCurveTo(last.x, last.y, width + 40, last.y);
          ctx.stroke();
        });
      }

      // Nodes — dissolve as the contour takes over.
      const nodeFade = 1 - clamp01((m - 0.1) / 0.5);
      if (nodeFade > 0.01) {
        NODES.forEach((node, i) => {
          const appear = clamp01(drawn * 1.4 - i * 0.02);
          if (appear <= 0) return;
          const lateGate = node.late ? (em >= 0 ? clamp01((em - 1.4) / 0.6) : 1) : 1;
          if (lateGate <= 0.01) return;

          const p = nodeAt(i, m);
          const a = appear * nodeFade * lateGate * opacity;
          const isHub = node.hub;

          ctx.strokeStyle = `rgba(${isHub ? accentRgb : lineRgb},${a * 0.45})`;
          ctx.lineWidth = 1;
          const tick = isHub ? 7 : 4;
          ctx.beginPath();
          ctx.moveTo(p.x - tick, p.y);
          ctx.lineTo(p.x + tick, p.y);
          ctx.moveTo(p.x, p.y - tick);
          ctx.lineTo(p.x, p.y + tick);
          ctx.stroke();

          ctx.fillStyle = `rgba(${isHub ? accentRgb : lineRgb},${a * (isHub ? 1 : 0.75)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, isHub ? 3 : 1.8, 0, Math.PI * 2);
          ctx.fill();

          if (isHub) {
            const pulse = reduced ? 11 : 11 + Math.sin(now / 1100 + i) * 3.5;
            ctx.strokeStyle = `rgba(${accentRgb},${a * 0.4})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2);
            ctx.stroke();
          }
        });
      }
    };

    const loop = (now: number) => {
      if (!firstSeenAt) firstSeenAt = now;
      draw(now);
      // Under reduced motion, settle on a final frame and stop.
      if (reduced && !scrubbed && now - firstSeenAt > 2400) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (!scrubbed) firstSeenAt = 0;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onResize = () => {
      resize();
      draw(performance.now());
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      stop();
      window.removeEventListener("resize", onResize);
    };
  }, [accent, color, graticule, opacity, reduced, scrubbed, traffic, warm]);

  return <canvas ref={canvasRef} aria-hidden className={cn("h-full w-full", className)} />;
}
