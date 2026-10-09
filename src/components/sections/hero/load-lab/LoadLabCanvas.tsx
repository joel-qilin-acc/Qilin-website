"use client";

import { useLoadLabCanvas } from "@/hooks/useLoadLabCanvas";
import type { FixId } from "@/lib/load-lab/model";

type LoadLabCanvasProps = {
  fixes: FixId[];
  rps: number;
  paused: boolean;
};

export function LoadLabCanvas({ fixes, rps, paused }: LoadLabCanvasProps) {
  const canvasRef = useLoadLabCanvas(fixes, rps, paused);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none block size-full"
    />
  );
}
