import { formatCount } from "@/lib/format";
import { metersFor, type FixId } from "@/lib/load-lab/model";
import { LoadLabMeter } from "./LoadLabMeter";

type LoadLabMetersProps = {
  fixes: FixId[];
  rps: number;
};


function formatWait(latency: number | null) {
  if (latency === null) return "Fails";
  return `${(latency / 1000).toFixed(2)} s`;
}

export function LoadLabMeters({ fixes, rps }: LoadLabMetersProps) {
  const { utilization, dropped, latency, level } = metersFor(fixes, rps);
  const loadTone =
    level === "critical" ? "danger" : level === "warning" ? "warn" : "accent";

  return (
    <dl className="mt-6 flex justify-between gap-6 lg:justify-start lg:gap-14">
      <LoadLabMeter
        label="Server load"
        value={`${Math.round(utilization * 100)}%`}
        unit="how hard it is working"
        tone={loadTone}
      />
      <LoadLabMeter
        label="Customers dropping off"
        value={formatCount(dropped)}
        unit="lost every second"
        tone={dropped > 0 ? "danger" : "quiet"}
      />
      <LoadLabMeter
        label="Page load time"
        value={formatWait(latency)}
        unit="for your visitors"
        tone={latency === null ? "danger" : latency > 600 ? "warn" : "accent"}
      />
    </dl>
  );
}
