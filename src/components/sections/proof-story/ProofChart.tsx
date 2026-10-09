import type { RefObject } from "react";
import { formatFull, formatReach } from "@/lib/format";
import { proof } from "@/content/proof";

type ProofChartProps = {
  numberRef: RefObject<HTMLParagraphElement | null>;
  lineRef: RefObject<SVGPathElement | null>;
  afterRef: RefObject<SVGGElement | null>;
};

export function ProofChart({ numberRef, lineRef, afterRef }: ProofChartProps) {
  return (
    <div data-bot-target>
      <p className="font-mono text-sm text-surface/75">
        Messages handled every second
      </p>
      <p
        ref={numberRef}
        className="mt-3 font-figure text-[5.5rem] leading-none sm:text-[8rem] lg:text-[9.5rem]"
      >
        {formatReach(proof.after, proof.after)}
      </p>
      <svg
        viewBox="0 0 480 190"
        className="mt-8 h-auto w-full"
        role="img"
        aria-label="Messages per second rising from 500 to 20,000+"
      >
        <line
          x1="0"
          y1="176"
          x2="480"
          y2="176"
          className="stroke-surface/25"
          strokeWidth="1"
        />
        <path
          ref={lineRef}
          d="M0 150 H130 C 190 150, 190 32, 250 32 H466"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          fill="none"
          className="stroke-neon"
          style={{ filter: "drop-shadow(0 0 8px var(--color-neon))" }}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text x="0" y="140" className="fill-surface/85 font-mono text-[11px]">
          Before: {formatFull(proof.before)} a second
        </text>
        <g ref={afterRef}>
          <circle
            cx="466"
            cy="32"
            r="6"
            className="fill-neon"
            style={{ filter: "drop-shadow(0 0 10px var(--color-neon))" }}
          />
          <text
            x="466"
            y="16"
            textAnchor="end"
            className="fill-surface font-mono text-[11px]"
          >
            After: {formatReach(proof.after, proof.after)} a second
          </text>
        </g>
      </svg>
      <blockquote className="mt-8">
        <p className="max-w-[48ch] text-[17px] leading-relaxed">
          “{proof.quote}”
        </p>
        <footer className="mt-2 text-sm text-surface/75">
          {proof.quoteBy}
        </footer>
      </blockquote>
    </div>
  );
}
