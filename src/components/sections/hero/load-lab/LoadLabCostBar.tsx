import { cn } from "@/lib/cn";
import {
  coreCost,
  costPerRequest,
  costSegments,
  segmentCost,
  type FixId,
} from "@/lib/load-lab/model";

type LoadLabCostBarProps = {
  fixes: FixId[];
};

export function LoadLabCostBar({ fixes }: LoadLabCostBarProps) {
  const saved = Math.round((1 - costPerRequest(fixes)) * 100);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-xs">
        <span className="text-muted">
          Effort your server spends on each visitor
        </span>
        <span className="font-figure text-base text-ink">
          {saved > 0 ? `${saved}% less` : "Today"}
        </span>
      </div>
      <div className="mt-2 flex h-3 w-full overflow-hidden rounded-full bg-line">
        <span
          className="h-full bg-ink/70 transition-[width] duration-700 ease-out"
          style={{ width: `${coreCost}%` }}
        />
        {costSegments.map((segment) => (
          <span
            key={segment.id}
            className={cn(
              "h-full transition-[width,background-color] duration-700 ease-out",
              fixes.includes(segment.id) ? "bg-accent" : "bg-danger/85",
            )}
            style={{ width: `${segmentCost(segment, fixes)}%` }}
          />
        ))}
      </div>
      <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-ink/70" />
          Core work
        </li>
        {costSegments.map((segment) => (
          <li key={segment.id} className="flex items-center gap-1.5">
            <span
              className={cn(
                "size-2 rounded-full",
                fixes.includes(segment.id) ? "bg-accent" : "bg-danger/85",
              )}
            />
            {segment.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
