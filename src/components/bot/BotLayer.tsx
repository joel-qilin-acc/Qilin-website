"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { readColors, shouldUseStatic, whenReady } from "@/lib/bot/boot";
import { iconChannel } from "@/lib/bot/bus";
import type { BotIcon } from "@/lib/bot/types";
import { cn } from "@/lib/cn";
import { BotChip } from "./BotChip";
import { BotFallback } from "./BotFallback";

type Mode = "pending" | "webgl" | "static";

const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

async function startBot(canvas: HTMLCanvasElement, chip: HTMLElement | null) {
  // The 3D code is loaded only now, after the page is interactive.
  const [{ createBotStage }, { createDirector }] = await Promise.all([
    import("@/lib/bot/stage"),
    import("@/lib/bot/director"),
  ]);
  const stage = createBotStage({ canvas, colors: readColors(canvas), maxPixelRatio: isMobile() ? 1.25 : 1.75 });
  const director = createDirector({ isMobile, chip });
  const frameGap = isMobile() || navigator.hardwareConcurrency <= 4 ? 1 / 30 : 0;
  let last = 0;
  const frame = (seconds: number) => {
    if (document.hidden || seconds - last < frameGap) return;
    last = seconds;
    stage.render(director.update(), seconds);
  };
  gsap.ticker.add(frame);
  window.addEventListener("resize", stage.resize);

  return () => {
    gsap.ticker.remove(frame);
    window.removeEventListener("resize", stage.resize);
    director.dispose();
    stage.dispose();
  };
}

export function BotLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("pending");
  const [icon, setIcon] = useState<BotIcon | null>(null);

  useEffect(() => iconChannel.subscribe(setIcon), []);

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;

    const start = async () => {
      const canvas = canvasRef.current;
      if (!canvas || shouldUseStatic()) {
        setMode("static");
        return;
      }
      const stop = await startBot(canvas, chipRef.current);
      if (cancelled) stop();
      else {
        dispose = stop;
        setMode("webgl");
      }
    };

    const cancelSchedule = whenReady(() => void start());
    return () => {
      cancelled = true;
      cancelSchedule();
      dispose?.();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-0 z-[35] size-full transition-opacity duration-700",
          mode === "webgl" ? "opacity-100" : "opacity-0",
        )}
      />
      <BotChip ref={chipRef} icon={mode === "webgl" ? icon : null} />
      {mode === "static" ? <BotFallback /> : null}
    </>
  );
}
