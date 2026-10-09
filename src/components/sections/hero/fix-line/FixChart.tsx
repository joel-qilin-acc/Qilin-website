import {
  afterShape,
  areaPath,
  chartHeight,
  chartWidth,
  linePath,
} from "./points";

const gridLines = [0.2, 0.4, 0.6, 0.8];
const finalShape = afterShape();

// The static chart. The final (fixed) shape is drawn first so the hero is correct even before any script runs.
export function FixChart() {
  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      preserveAspectRatio="none"
      className="size-full overflow-visible"
      aria-hidden
    >
      <defs>
        <clipPath id="fix-reveal">
          <rect
            data-clip
            x="0"
            y="-40"
            width="1500"
            height={chartHeight + 80}
          />
        </clipPath>
        <linearGradient id="fix-fill-slow" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0"
            style={{ stopColor: "var(--color-slow)", stopOpacity: 0.3 }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--color-slow)", stopOpacity: 0 }}
          />
        </linearGradient>
        <linearGradient id="fix-fill-fast" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0"
            style={{ stopColor: "var(--color-accent)", stopOpacity: 0.26 }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--color-accent)", stopOpacity: 0 }}
          />
        </linearGradient>
      </defs>
      {gridLines.map((line) => (
        <line
          key={line}
          x1="0"
          x2={chartWidth}
          y1={line * chartHeight}
          y2={line * chartHeight}
          className="stroke-line"
          strokeDasharray="2 8"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <g data-tint clipPath="url(#fix-reveal)" className="text-accent">
        <path
          data-area-slow
          d={areaPath(finalShape)}
          fill="url(#fix-fill-slow)"
          opacity="0"
        />
        <path
          data-area-fast
          d={areaPath(finalShape)}
          fill="url(#fix-fill-fast)"
        />
        <path
          data-line
          d={linePath(finalShape)}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}
