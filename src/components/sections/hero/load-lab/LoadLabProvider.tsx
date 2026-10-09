"use client";

import { useEffect, useMemo, useState } from "react";
import { LoadLabContext, type LoadLabState } from "@/hooks/loadLabContext";
import { announceDemo } from "@/lib/bot/bus";
import { fixOrder, type FixId } from "@/lib/load-lab/model";

type LoadLabProviderProps = {
  children: React.ReactNode;
  demoStartMs?: number;
  demoStepMs?: number;
  armed?: boolean;
  // When set, the page (for example scroll position) decides how many fixes are on, until the visitor takes over.
  fixCount?: number;
};

export function LoadLabProvider({
  children,
  demoStartMs = 2600,
  demoStepMs = 1300,
  armed = true,
  fixCount,
}: LoadLabProviderProps) {
  const [timed, setTimed] = useState<FixId[]>([]);
  const [manual, setManual] = useState<FixId[] | null>(null);
  const [rps, setRps] = useState(12000);
  const [paused, setPaused] = useState(false);
  const fixes =
    manual ?? (fixCount === undefined ? timed : fixOrder.slice(0, fixCount));

  useEffect(() => {
    if (!armed || fixCount !== undefined) return undefined;
    // Storytelling: let the server burn red first, then apply the fixes one by one on their own.
    const timers = fixOrder.map((id, index) =>
      window.setTimeout(
        () => setTimed(fixOrder.slice(0, index + 1)),
        demoStartMs + index * demoStepMs,
      ),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [armed, fixCount, demoStartMs, demoStepMs]);

  useEffect(() => {
    announceDemo(fixes.length === fixOrder.length ? "with" : "without");
  }, [fixes]);

  const value = useMemo<LoadLabState>(
    () => ({
      fixes,
      rps,
      paused,
      toggleFix: (id) =>
        setManual((current) => {
          const base = current ?? fixes;
          return base.includes(id)
            ? base.filter((fix) => fix !== id)
            : [...base, id];
        }),
      applyAll: () => setManual(fixOrder),
      reset: () => setManual([]),
      changeRps: (next) => setRps(next),
      togglePause: () => setPaused((current) => !current),
    }),
    [fixes, rps, paused],
  );

  return (
    <LoadLabContext.Provider value={value}>{children}</LoadLabContext.Provider>
  );
}
