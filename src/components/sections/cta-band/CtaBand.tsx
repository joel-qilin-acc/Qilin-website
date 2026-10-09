import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import type { LeadVariant } from "@/lib/schemas/lead";

type CtaBandProps = {
  title?: string;
  body?: string;
  variant?: LeadVariant;
  submitLabel?: string;
};

const defaultTitle = "Tell us what you are scaling.";
const defaultBody =
  "Two minutes to describe it. A senior engineer replies within 24 hours, not a sales script.";

// Only the security audit page has its own short form, because that request needs a website to look at.
// Everything else sends the visitor to the contact page.
export function CtaBand({
  title = defaultTitle,
  body = defaultBody,
  variant = "default",
  submitLabel,
}: CtaBandProps) {
  return (
    <Section id="book" tone="subtle" bot="book">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <SplitHeading className="text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance md:text-6xl">
            {title}
          </SplitHeading>
          <Reveal>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">{body}</p>
          </Reveal>
        </div>
        <Reveal>
          <div data-bot-target className="rounded-base border border-line bg-surface p-6 shadow-[0_30px_60px_-34px_rgba(15,18,24,0.3)] sm:p-8">
            <LeadForm variant={variant} submitLabel={submitLabel} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
