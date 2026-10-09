import { faqItems } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import type { FaqItem as FaqItemContent } from "@/types/content";
import { FaqItem } from "./FaqItem";

type FaqProps = {
  title?: string;
  items?: FaqItemContent[];
};

export function Faq({ title = "Questions people ask before they call.", items = faqItems }: FaqProps) {
  return (
    <Section bot="faq">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <SectionHeading title={title} />
        <Reveal selector="details" target className="border-b border-line">
          {items.map((item) => (
            <FaqItem key={item.question} item={item} />
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
