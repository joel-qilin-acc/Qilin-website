"use client";

import { useLoadLab } from "@/hooks/loadLabContext";
import { LoadLabCanvas } from "@/components/sections/hero/load-lab/LoadLabCanvas";
import { LoadLabMeters } from "@/components/sections/hero/load-lab/LoadLabMeters";
import { LoadLabProvider } from "@/components/sections/hero/load-lab/LoadLabProvider";
import { DifferenceSwitch } from "./DifferenceSwitch";
import { DropOffBanner } from "./DropOffBanner";

function DifferenceScene() {
  const { fixes, rps, paused } = useLoadLab();

  return (
    <div className="rounded-base border border-line bg-surface p-4 shadow-[0_30px_70px_-36px_rgba(11,18,32,0.35)] sm:p-6">
      <DifferenceSwitch />
      <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-base bg-surface-subtle">
        <LoadLabCanvas fixes={fixes} rps={rps} paused={paused} />
      </div>
      <DropOffBanner fixes={fixes} rps={rps} />
      <LoadLabMeters fixes={fixes} rps={rps} />
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Same server, same visitors. Based on a real project that went from 500 to 3,000 visitors a second without adding
        servers.
      </p>
    </div>
  );
}

// It opens on "Without Qilin Lab" and stays there until the visitor picks a tab themselves.
export function DifferenceDemo() {
  return (
    <LoadLabProvider armed={false}>
      <DifferenceScene />
    </LoadLabProvider>
  );
}
