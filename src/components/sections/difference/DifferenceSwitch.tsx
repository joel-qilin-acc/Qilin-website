"use client";

import { useLoadLab } from "@/hooks/loadLabContext";
import { fixOrder } from "@/lib/load-lab/model";
import { cn } from "@/lib/cn";

const options = [
  { id: "without", label: "Without Qilin Lab" },
  { id: "with", label: "With Qilin Lab" },
] as const;

export function DifferenceSwitch() {
  const { fixes, applyAll, reset } = useLoadLab();
  const active = fixes.length === fixOrder.length ? "with" : "without";

  return (
    <div
      role="group"
      aria-label="Show the same server with or without Qilin Lab"
      className="grid grid-cols-2 rounded-base bg-surface-subtle p-1"
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={active === option.id}
          onClick={option.id === "with" ? applyAll : reset}
          className={cn(
            "h-11 whitespace-nowrap rounded-[9px] px-3 text-sm font-medium transition-[background-color,color,box-shadow] duration-200",
            active === option.id
              ? option.id === "with"
                ? "bg-accent text-on-accent shadow-[0_2px_8px_-2px_rgba(30,64,175,0.5)]"
                : "bg-surface text-danger shadow-[0_1px_3px_rgba(11,18,32,0.14)]"
              : "text-muted hover:text-ink",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
