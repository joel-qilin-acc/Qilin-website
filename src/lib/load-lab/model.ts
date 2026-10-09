export type FixId = "queries" | "caching" | "async" | "pooling";

export type CostSegment = {
  id: FixId;
  label: string;
  fix: string;
  hint: string;
  tech: string;
  before: number;
  after: number;
};

// Real figures from the ICS Mobile migration: one server saturated at 500 TPS, 20,000 TPS after optimisation.
export const baseCapacity = 500;
export const coreCost = 1;
export const minRps = 500;
export const maxRps = 20000;

// Illustrative split of the effort a server spends per visitor. The fixes shrink each slice, they do not add machines.
export const costSegments: CostSegment[] = [
  {
    id: "queries",
    label: "Slow lookups",
    fix: "Faster data lookups",
    hint: "Pages stop waiting on the database",
    tech: "Query and index tuning",
    before: 45,
    after: 0.54,
  },
  {
    id: "caching",
    label: "Repeated work",
    fix: "Remember common answers",
    hint: "No rebuilding the same page for every visitor",
    tech: "Caching and edge delivery",
    before: 28,
    after: 0.42,
  },
  {
    id: "async",
    label: "Slow jobs",
    fix: "Do slow jobs in the background",
    hint: "Emails and reports stop holding up customers",
    tech: "Event-driven pipelines",
    before: 18,
    after: 0.3,
  },
  {
    id: "pooling",
    label: "Wasted effort",
    fix: "Lighter, leaner requests",
    hint: "Less data and fewer handshakes per visit",
    tech: "Connection and payload tuning",
    before: 8,
    after: 0.24,
  },
];

export const fixOrder: FixId[] = costSegments.map((segment) => segment.id);

export type Level = "critical" | "warning" | "healthy";

export const statusLabels: Record<Level, string> = {
  critical: "Overloaded",
  warning: "Struggling",
  healthy: "Running well",
};

export function segmentCost(segment: CostSegment, fixes: FixId[]) {
  return fixes.includes(segment.id) ? segment.after : segment.before;
}

export function costPerRequest(fixes: FixId[]) {
  const segments = costSegments.reduce((total, segment) => total + segmentCost(segment, fixes), 0);
  return (coreCost + segments) / 100;
}

export function capacityFor(fixes: FixId[]) {
  return baseCapacity / costPerRequest(fixes);
}

export function utilizationFor(fixes: FixId[], rps: number) {
  return Math.min(1, rps / capacityFor(fixes));
}

export function levelFor(utilization: number): Level {
  if (utilization >= 0.95) return "critical";
  if (utilization >= 0.75) return "warning";
  return "healthy";
}

export function metersFor(fixes: FixId[], rps: number) {
  const capacity = capacityFor(fixes);
  const utilization = utilizationFor(fixes, rps);
  const delivered = Math.min(rps, capacity);
  const latency = utilization >= 0.97 ? null : Math.round(60 / (1 - utilization));
  return { utilization, delivered, dropped: Math.round(rps - delivered), latency, level: levelFor(utilization) };
}
