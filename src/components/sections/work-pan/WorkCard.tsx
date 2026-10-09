import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { clientLogoBase } from "@/content/clients";
import { MetricValue } from "@/components/case/MetricValue";
import type { CaseStudy } from "@/types/content";

type WorkCardProps = {
  study: CaseStudy;
};

export function WorkCard({ study }: WorkCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-[420px] w-[min(82vw,500px)] shrink-0 snap-start flex-col justify-between rounded-base border border-line bg-surface-subtle p-8 transition-[border-color,background-color] duration-300 hover:border-ink hover:bg-surface"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs text-muted">{study.industry}</p>
        {study.logo ? (
          <Image
            src={`${clientLogoBase}/${study.logo}`}
            alt=""
            width={96}
            height={40}
            className="h-10 w-24 object-contain opacity-70 grayscale"
          />
        ) : null}
      </div>
      <div>
        <MetricValue metric={study.metric} size="md" animate={false} />
        <p className="mt-2 font-mono text-sm text-muted">{study.metric.label}</p>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{study.client}</h3>
          <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-muted">{study.headline}</p>
        </div>
        <ArrowUpRight
          aria-hidden
          size={26}
          className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
