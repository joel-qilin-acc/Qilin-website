import { CheckList } from "@/components/page/CheckList";
import { PageSection } from "@/components/page/PageSection";
import { StackChips } from "@/components/page/StackChips";
import { SplitHeading } from "@/components/motion/SplitHeading";
import type { CaseStudy } from "@/types/content";

type CaseResultsProps = {
  study: CaseStudy;
};

export function CaseResults({ study }: CaseResultsProps) {
  return (
    <PageSection tone="dark">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SplitHeading className="text-3xl font-semibold tracking-tight md:text-4xl">The result</SplitHeading>
          <dl className="mt-10 space-y-5 text-surface/80">
            <div>
              <dt className="font-mono text-xs text-surface/60">Engagement</dt>
              <dd className="mt-1">{study.engagement}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-surface/60">Stack</dt>
              <dd className="mt-2 text-ink">
                <StackChips items={study.stack} />
              </dd>
            </div>
          </dl>
        </div>
        <CheckList items={study.results} onDark />
      </div>
    </PageSection>
  );
}
