import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/motion/SplitHeading";
import type { CaseStudy } from "@/types/content";

type CaseNarrativeProps = {
  study: CaseStudy;
};

export function CaseNarrative({ study }: CaseNarrativeProps) {
  return (
    <Section trace={false} className="py-16 md:py-24">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SplitHeading className="text-3xl font-semibold tracking-tight md:text-4xl">The problem</SplitHeading>
          <Reveal>
            <p className="mt-6 max-w-[48ch] text-xl leading-relaxed text-muted">{study.challenge}</p>
          </Reveal>
        </div>
        <div>
          <SplitHeading className="text-3xl font-semibold tracking-tight md:text-4xl">What we did</SplitHeading>
          <Reveal selector="li">
            <ul className="mt-6">
              {study.approach.map((step) => (
                <li key={step} className="border-t border-line py-5 text-lg leading-snug">
                  {step}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
