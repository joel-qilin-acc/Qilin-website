"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { LoadSimulation } from "@/lib/load-lab/simulation";
import { drawScene } from "@/lib/load-lab/renderer";
import { readPalette } from "@/lib/load-lab/palette";
import type { FixId } from "@/lib/load-lab/model";

export function useLoadLabCanvas(fixes: FixId[], rps: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const redrawRef = useRef<() => void>(() => {});
  const [simulation] = useState(() => new LoadSimulation());

  useEffect(() => {
    simulation.setInputs(fixes, rps);
    redrawRef.current();
  }, [simulation, fixes, rps]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const palette = readPalette(canvas);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;

    const render = () => drawScene(context, simulation, palette);

    const redraw = () => {
      if (!reduceMotion) return;
      simulation.resize(simulation.width, simulation.height);
      simulation.settle(3);
      render();
    };
    redrawRef.current = redraw;

    const fit = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      simulation.resize(width, height);
      redraw();
    };

    const tick = (time: number, deltaMs: number) => {
      if (!visible || document.hidden) return;
      simulation.step(Math.min(deltaMs / 1000, 0.05));
      render();
    };

    fit();
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);
    if (!reduceMotion) gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [simulation]);

  return canvasRef;
}
