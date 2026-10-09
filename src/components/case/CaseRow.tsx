import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { clientLogoBase } from "@/content/clients";
import type { CaseStudy } from "@/types/content";
import { MetricValue } from "./MetricValue";

type CaseRowProps = {
  study: CaseStudy;
};

export function CaseRow({ study }: CaseRowProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group -mx-4 grid items-center gap-5 rounded-base border-t border-line px-4 py-9 transition-colors duration-300 hover:bg-surface-subtle md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-10"
    >
      <div>
        <MetricValue metric={study.metric} size="sm" animate={false} />
        <p className="mt-2 font-mono text-sm text-muted">{study.metric.label}</p>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold tracking-tight">{study.client}</h3>
          <span className="font-mono text-xs text-muted">{study.industry}</span>
        </div>
        <p className="mt-2 max-w-[52ch] leading-relaxed text-muted">{study.summary}</p>
      </div>
      <div className="hidden items-center gap-6 md:flex">
        {study.logo ? (
          <Image
            src={`${clientLogoBase}/${study.logo}`}
            alt=""
            width={80}
            height={40}
            className="h-10 w-20 object-contain opacity-60 grayscale"
          />
        ) : null}
        <ArrowUpRight
          aria-hidden
          size={26}
          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
