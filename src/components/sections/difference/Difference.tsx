import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { DifferenceDemo } from "./DifferenceDemo";

export function Difference() {
  return (
    <Section id="difference" tone="subtle" bot="start">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <SplitHeading
            as="h2"
            mark="A very different day."
            className="text-3xl font-bold leading-[1.06] tracking-[-0.035em] text-balance md:text-5xl lg:text-[3.25rem]"
          >
            Same server. Same visitors. A very different day.
          </SplitHeading>
          <Reveal>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">
              Watch a busy app struggle, then watch it recover once we fix what
              is slowing it down. No extra servers, no bigger bill. This is how
              a real project went from 500 to 20k+ visitors a second.
            </p>
            <div className="mt-8">
              <ButtonLink href="/case-studies/ics-mobile">
                Read how we did it
                <ArrowRight aria-hidden size={18} weight="bold" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <Reveal y={60}>
          <DifferenceDemo />
        </Reveal>
      </Container>
    </Section>
  );
}
