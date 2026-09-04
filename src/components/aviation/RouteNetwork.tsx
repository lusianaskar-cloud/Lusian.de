"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Node = { x: number; y: number; hub?: boolean };

/**
 * An abstract route network — not a map, and deliberately not a real one.
 * Arcs draw themselves in sequence, then carry a slow traffic pulse.
 *
 * Rendered on canvas so twenty-odd animated arcs cost one paint, and paused
 * entirely when off-screen or under reduced motion.
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
  { x: 0.94, y: 0.36 },
  { x: 0.965, y: 0.74 },
];

const EDGES: [number, number][] = [
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 5],
  [3, 6],
  [3, 4],
  [5, 8],
  [6, 8],
  [7, 8],
  [8, 9],
  [8, 10],
  [8, 11],
  [10, 12],
  [11, 12],
  [11, 13],
  [9, 13],
  [2, 5],
  [0, 1],
  [12, 13],
  [4, 6],
];

const DRAW_MS = 2400;

function curve(a: Node, b: Node) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  // Bow every arc the same way relative to its direction — reads as a great circle.
  const lift = Math.min(0.16, len * 0.28);
  return { cx: mx - dy * lift * 1.6, cy: my + dx * lift * 1.6 };
}

function pointOnCurve(a: Node, c: { cx: number; cy: number }, b: Node, t: number) {
  const it = 1 - t;
  return {
    x: it * it * a.x + 2 * it * t * c.cx + t * t * b.x,
    y: it * it * a.y + 2 * it * t * c.cy + t * t * b.y,
  };
}

export function RouteNetwork({
  className,
  color = "#A0B8C2",
  accent = "#C6AD82",
  opacity = 0.6,
  graticule = false,
}: {
  className?: string;
  color?: string;
  accent?: string;
  opacity?: number;
  /** Draws the schematic grid behind the network — used on light grounds. */
  graticule?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let startedAt = 0;
    let visible = false;

    const curves = EDGES.map(([i, j]) => ({
      a: NODES[i],
      b: NODES[j],
      c: curve(NODES[i], NODES[j]),
      delay: Math.random() * 0.55,
      speed: 0.16 + Math.random() * 0.12,
      offset: Math.random(),
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const px = (n: Node | { x: number; y: number }) => ({
      x: n.x * width,
      y: n.y * height,
    });

    const draw = (now: number) => {
      const elapsed = startedAt ? now - startedAt : DRAW_MS;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      if (graticule) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = opacity * 0.12;
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

      curves.forEach((edge) => {
        const local = Math.max(
          0,
          Math.min(1, (elapsed / DRAW_MS - edge.delay * 0.5) / (1 - edge.delay * 0.5)),
        );
        if (local <= 0) return;
        const eased = 1 - Math.pow(1 - local, 3);

        const a = px(edge.a);

        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity * 0.5;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);

        // Partial quadratic by sampling — gives the arc a drawn-in feel.
        const steps = 26;
        for (let s = 1; s <= steps; s += 1) {
          const t = (s / steps) * eased;
          const p = pointOnCurve(edge.a, edge.c, edge.b, t);
          ctx.lineTo(p.x * width, p.y * height);
        }
        ctx.stroke();

        if (reduced || local < 1) return;

        // Traffic: a short bright segment travelling the arc.
        const travel = ((now / 1000) * edge.speed + edge.offset) % 1;
        const tail = 0.09;
        ctx.globalAlpha = opacity * 0.85;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.15;
        ctx.beginPath();
        for (let s = 0; s <= 10; s += 1) {
          const t = Math.max(0, travel - tail + (s / 10) * tail);
          const p = pointOnCurve(edge.a, edge.c, edge.b, t);
          const pt = { x: p.x * width, y: p.y * height };
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      });

      NODES.forEach((node, i) => {
        const appear = Math.max(0, Math.min(1, elapsed / DRAW_MS - i * 0.02));
        if (appear <= 0) return;
        const p = px(node);

        // Survey tick — the detail that makes it read as a drawing, not a doodle.
        ctx.globalAlpha = opacity * 0.45 * appear;
        ctx.strokeStyle = node.hub ? accent : color;
        ctx.lineWidth = 1;
        const tick = node.hub ? 7 : 4;
        ctx.beginPath();
        ctx.moveTo(p.x - tick, p.y);
        ctx.lineTo(p.x + tick, p.y);
        ctx.moveTo(p.x, p.y - tick);
        ctx.lineTo(p.x, p.y + tick);
        ctx.stroke();

        ctx.globalAlpha = opacity * (node.hub ? 1 : 0.75) * appear;
        ctx.fillStyle = node.hub ? accent : color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, node.hub ? 3 : 1.8, 0, Math.PI * 2);
        ctx.fill();

        if (node.hub) {
          ctx.globalAlpha = opacity * 0.4 * appear;
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.beginPath();
          const pulse = reduced ? 11 : 11 + Math.sin(now / 1100 + i) * 3.5;
          ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (!startedAt) startedAt = now;
      draw(now);
      if (reduced && now - startedAt > DRAW_MS) return;
      frame = requestAnimationFrame(loop);
    };

    resize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          startedAt = 0;
          frame = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    const onResize = () => {
      resize();
      draw(performance.now());
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [accent, color, graticule, opacity, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("h-full w-full", className)}
    />
  );
}
