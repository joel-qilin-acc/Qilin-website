import { MetricValue } from "./MetricValue";
import type { CaseStudy } from "@/types/content";

type CaseHeroAsideProps = {
  study: CaseStudy;
};

export function CaseHeroAside({ study }: CaseHeroAsideProps) {
  return (
    <div className="lg:pb-2">
      <MetricValue metric={study.metric} size="xl" />
      <p className="mt-4 font-mono text-sm text-muted">{study.metric.label}</p>
      <p className="mt-6 font-mono text-xs text-muted">
        {study.client}, {study.industry}
      </p>
    </div>
  );
}
