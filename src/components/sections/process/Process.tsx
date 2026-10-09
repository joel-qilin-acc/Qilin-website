import { processSteps } from "@/content/process";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProcessStep } from "@/types/content";
import { ProcessSteps } from "./ProcessSteps";

type ProcessProps = {
  title?: string;
  body?: string;
  steps?: ProcessStep[];
  tone?: "plain" | "subtle";
};

export function Process({
  title = "How we work with you.",
  body = "Four steps, each with something you can review before the next one starts.",
  steps = processSteps,
  tone = "plain",
}: ProcessProps) {
  return (
    <Section tone={tone} bot="process">
      <Container>
        <SectionHeading title={title} body={body} />
        <ProcessSteps steps={steps} />
      </Container>
    </Section>
  );
}
