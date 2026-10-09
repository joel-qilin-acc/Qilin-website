import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { CaseStudy } from "@/types/content";

type CardDetailsProps = {
  study: CaseStudy;
};

// What opens inside a card: what we did, what changed, and the way into the full story.
export function CardDetails({ study }: CardDetailsProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-[22px] border border-white/80 bg-surface p-5 shadow-[0_18px_40px_-26px_rgba(11,18,32,0.35)]">
      <div>
        <p className="hidden text-[15px] leading-relaxed text-muted sm:block [@media(max-height:820px)]:hidden">
          {study.summary}
        </p>
        <ul className="mt-0 space-y-2 sm:mt-4 [@media(max-height:820px)]:mt-0">
          {study.results.slice(0, 3).map((result) => (
            <li
              key={result}
              className="flex items-start gap-2.5 text-sm leading-snug text-ink"
            >
              <CheckCircle
                aria-hidden
                size={18}
                weight="fill"
                className="mt-px shrink-0 text-accent"
              />
              {result}
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={`/case-studies/${study.slug}`}
        className="mt-4 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-accent px-5 text-[15px] font-medium text-on-accent transition-colors hover:bg-accent-hover"
      >
        Read the case study
        <ArrowRight aria-hidden size={16} weight="bold" />
      </Link>
    </div>
  );
}
