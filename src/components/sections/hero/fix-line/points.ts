export const pointCount = 96;
export const chartWidth = 1440;
export const chartHeight = 360;

// Heights are fractions of the chart, 0 at the top. Higher on the chart means a longer wait for the customer.
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

const bumps = [
  { at: 0.07, size: 0.12 },
  { at: 0.2, size: 0.3 },
  { at: 0.35, size: 0.14 },
  { at: 0.5, size: 0.34 },
  { at: 0.65, size: 0.16 },
  { at: 0.8, size: 0.3 },
  { at: 0.94, size: 0.12 },
];

// The chips sit on the three tallest bumps.
export const spikeIndexes = [0.2, 0.5, 0.8].map((at) =>
  Math.round(at * (pointCount - 1)),
);

// Soft, uneven waits: a gentle swell with a few rounded peaks, not a zigzag.
export function beforeShape() {
  const next = seeded(11);
  return Array.from({ length: pointCount }, (_, index) => {
    const t = index / (pointCount - 1);
    const swell = 0.5 + 0.05 * Math.sin(t * 7);
    const peaks = bumps.reduce(
      (total, bump) =>
        total +
        bump.size *
          Math.exp(-(((index - bump.at * (pointCount - 1)) / 3.4) ** 2)),
      0,
    );
    return clamp(swell - peaks + 0.03 * (next() - 0.5), 0.06, 0.9);
  });
}

export function afterShape() {
  return Array.from(
    { length: pointCount },
    (_, index) => 0.68 + 0.022 * Math.sin(index * 0.45),
  );
}

export const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

export function linePath(heights: number[]) {
  return heights
    .map((height, index) => {
      const x = (index / (pointCount - 1)) * chartWidth;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${(height * chartHeight).toFixed(1)}`;
    })
    .join(" ");
}

export function areaPath(heights: number[]) {
  return `${linePath(heights)} L${chartWidth} ${chartHeight} L0 ${chartHeight} Z`;
}
