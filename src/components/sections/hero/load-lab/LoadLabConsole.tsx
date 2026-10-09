"use client";

import { useLoadLab } from "@/hooks/loadLabContext";
import { fixOrder } from "@/lib/load-lab/model";
import { LoadLabFixToggles } from "./LoadLabFixToggles";
import { LoadLabSlider } from "./LoadLabSlider";

export function LoadLabConsole() {
  const { fixes, rps, toggleFix, applyAll, reset, changeRps } = useLoadLab();
  const allOn = fixes.length === fixOrder.length;

  return (
    <div className="max-w-[500px] space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">See what Qilin Lab fixes</p>
          <p className="mt-0.5 text-xs text-muted">
            Tap a fix and watch your server cool down.
          </p>
        </div>
        <button
          type="button"
          onClick={allOn ? reset : applyAll}
          className="text-sm font-medium text-accent underline decoration-accent/30 underline-offset-[5px] hover:decoration-accent"
        >
          {allOn ? "Start over" : "Fix everything"}
        </button>
      </div>
      <LoadLabFixToggles fixes={fixes} onToggle={toggleFix} />
      <LoadLabSlider rps={rps} onRpsChange={changeRps} />
      <p className="text-xs leading-relaxed text-muted">
        Illustrative, based on a real project: one server that struggled at 500
        visitors a second now handles 20k+. We did not add servers.
      </p>
    </div>
  );
}
