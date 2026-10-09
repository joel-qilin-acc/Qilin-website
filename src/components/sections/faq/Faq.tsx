import { faqItems } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { FaqItem as FaqItemContent } from "@/types/content";
import { FaqBoard } from "./FaqBoard";

type FaqProps = {
  title?: string;
  items?: FaqItemContent[];
};

const defaultTitle = "Questions people ask before they call.";

export function Faq({ title = defaultTitle, items = faqItems }: FaqProps) {
  return (
    <Section bot="faq">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <FaqBoard
          title={title}
          mark={title === defaultTitle ? "before they call." : undefined}
          items={items}
        />
      </Container>
    </Section>
  );
}
