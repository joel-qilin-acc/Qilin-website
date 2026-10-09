"use client";

import { useLoadLab } from "@/hooks/loadLabContext";
import { LoadLabCanvas } from "./LoadLabCanvas";
import { LoadLabCostBar } from "./LoadLabCostBar";
import { LoadLabMeters } from "./LoadLabMeters";

export function LoadLabStage() {
  const { fixes, rps } = useLoadLab();

  return (
    <div>
      <div className="relative aspect-[4/3] w-full lg:aspect-[16/11]">
        <LoadLabCanvas fixes={fixes} rps={rps} />
      </div>
      <div className="mt-6">
        <LoadLabCostBar fixes={fixes} />
        <LoadLabMeters fixes={fixes} rps={rps} />
      </div>
    </div>
  );
}
