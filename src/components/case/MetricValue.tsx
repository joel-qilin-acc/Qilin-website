import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/cn";
import type { CaseMetric } from "@/types/content";

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

export function MetricValue({ metric, size = "md", animate = true, className }: MetricValueProps) {
  const styles = cn("font-figure leading-none", sizes[size], className);

  if (metric.kind === "text") return <p className={styles}>{metric.text}</p>;

  const format = (value: number) =>
    value.toLocaleString("en-US", { minimumFractionDigits: metric.decimals ?? 0, maximumFractionDigits: metric.decimals ?? 0 });

  if (!animate) {
    return (
      <p className={styles}>
        {metric.prefix}
        {format(metric.value)}
        {metric.suffix}
      </p>
    );
  }

  return (
    <p className={styles}>
      <CountUp
        value={metric.value}
        from={metric.from}
        decimals={metric.decimals}
        prefix={metric.prefix}
        suffix={metric.suffix}
      />
    </p>
  );
}
