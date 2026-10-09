import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { PageSection } from "@/components/page/PageSection";
import type { CaseStudy } from "@/types/content";

type CaseQuoteProps = {
  study: CaseStudy;
  next: CaseStudy;
};

export function CaseQuote({ study, next }: CaseQuoteProps) {
  return (
    <PageSection>
      <Reveal>
        <figure className="max-w-4xl">
          <blockquote className="text-3xl font-semibold leading-[1.18] tracking-tight text-balance md:text-5xl">
            “{study.quote.text}”
          </blockquote>
          <figcaption className="mt-8 text-muted">{study.quote.by}</figcaption>
        </figure>
      </Reveal>
      <Link
        href={`/case-studies/${next.slug}`}
        className="group mt-20 flex items-center justify-between gap-6 border-t border-line pt-8"
      >
        <span>
          <span className="block font-mono text-xs text-muted">Next case study</span>
          <span className="mt-2 block text-2xl font-semibold tracking-tight md:text-3xl">{next.client}</span>
        </span>
        <ArrowRight
          aria-hidden
          size={32}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-2"
        />
      </Link>
    </PageSection>
  );
}
