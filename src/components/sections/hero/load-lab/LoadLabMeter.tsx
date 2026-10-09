import { cn } from "@/lib/cn";

type LoadLabMeterProps = {
  label: string;
  value: string;
  unit: string;
  tone: "accent" | "danger" | "warn" | "quiet";
};

export function LoadLabMeter({ label, value, unit, tone }: LoadLabMeterProps) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd
        className={cn(
          "mt-1 font-figure text-3xl transition-colors duration-300 lg:text-4xl",
          tone === "accent" && "text-accent",
          tone === "danger" && "text-danger",
          tone === "warn" && "text-warn",
          tone === "quiet" && "text-muted",
        )}
      >
        {value}
      </dd>
      <dd className="text-[11px] text-muted">{unit}</dd>
    </div>
  );
}
