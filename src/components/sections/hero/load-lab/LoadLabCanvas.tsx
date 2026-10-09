"use client";

import { useLoadLabCanvas } from "@/hooks/useLoadLabCanvas";
import type { FixId } from "@/lib/load-lab/model";

type LoadLabCanvasProps = {
  fixes: FixId[];
  rps: number;
};

export function LoadLabCanvas({ fixes, rps }: LoadLabCanvasProps) {
  const canvasRef = useLoadLabCanvas(fixes, rps);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none block size-full"
    />
  );
}
