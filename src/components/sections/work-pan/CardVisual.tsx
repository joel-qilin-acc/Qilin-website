import Image from "next/image";
import { clientLogoBase } from "@/content/clients";
import { MetricValue } from "@/components/case/MetricValue";
import type { CaseStudy } from "@/types/content";
import { sparkPath } from "./spark";

type CardVisualProps = {
  study: CaseStudy;
  seed: number;
};

// The mini dashboard at the bottom of a card: the real headline number, a rising line and the client's logo.
export function CardVisual({ study, seed }: CardVisualProps) {
  return (
    <div className="rounded-[22px] border border-white/80 bg-white/55 p-2.5 shadow-[0_18px_40px_-26px_rgba(11,18,32,0.35)] backdrop-blur-sm">
      <div className="rounded-2xl bg-surface p-4 shadow-[0_1px_0_rgba(11,18,32,0.04)]">
        <div className="flex items-start justify-between gap-3">
          <p className="max-w-[18ch] text-xs font-semibold leading-snug text-muted">
            {study.metric.label}
          </p>
          {study.logo ? (
            <Image
              src={`${clientLogoBase}/${study.logo}`}
              alt=""
              width={72}
              height={28}
              className="h-6 w-auto max-w-[72px] shrink-0 object-contain"
            />
          ) : null}
        </div>
        <MetricValue
          metric={study.metric}
          size="sm"
          animate={false}
          className="mt-3 !text-[2.6rem] text-accent md:!text-[3rem]"
        />
        <svg
          viewBox="0 0 220 56"
          className="mt-3 h-12 w-full"
          aria-hidden
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`spark-${seed}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--color-accent)" />
              <stop offset="1" stopColor="var(--color-neon)" />
            </linearGradient>
          </defs>
          <path
            d={sparkPath(seed)}
            fill="none"
            stroke={`url(#spark-${seed})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
