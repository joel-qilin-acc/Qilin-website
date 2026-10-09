import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/cn";
import type { CaseMetric } from "@/types/content";

type NumberMetric = Extract<CaseMetric, { kind: "number" }>;

type MetricValueProps = {
  metric: CaseMetric;
  size?: "sm" | "md" | "xl";
  animate?: boolean;
  className?: string;
};

const sizes = {
  sm: "text-5xl md:text-6xl",
  md: "text-6xl md:text-7xl",
  xl: "text-7xl sm:text-8xl lg:text-[9rem]",
};

// Big counts are shown short: 20000 reads as "20k". Smaller numbers keep their full digits.
function display(metric: NumberMetric) {
  const compact = metric.value >= 10000;
  const scale = compact ? 1000 : 1;
  return {
    value: metric.value / scale,
    from: metric.from === undefined ? undefined : metric.from / scale,
    decimals: compact ? 0 : metric.decimals ?? 0,
    suffix: `${compact ? "k" : ""}${metric.suffix ?? ""}`,
  };
}

export function MetricValue({ metric, size = "md", animate = true, className }: MetricValueProps) {
  const styles = cn("font-figure leading-none", sizes[size], className);

  if (metric.kind === "text") return <p className={styles}>{metric.text}</p>;

  const shown = display(metric);

  if (!animate) {
    const text = shown.value.toLocaleString("en-US", {
      minimumFractionDigits: shown.decimals,
      maximumFractionDigits: shown.decimals,
    });
    return (
      <p className={styles}>
        {metric.prefix}
        {text}
        {shown.suffix}
      </p>
    );
  }

  return (
    <p className={styles}>
      <CountUp
        value={shown.value}
        from={shown.from}
        decimals={shown.decimals}
        prefix={metric.prefix}
        suffix={shown.suffix}
      />
    </p>
  );
}
