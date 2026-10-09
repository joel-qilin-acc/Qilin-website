import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PageSectionProps = {
  title?: string;
  body?: string;
  tone?: "plain" | "subtle" | "dark";
  id?: string;
  children: React.ReactNode;
};

export function PageSection({ title, body, tone = "plain", id, children }: PageSectionProps) {
  return (
    <Section id={id} tone={tone} trace={false} className="py-16 md:py-24">
      <Container>
        {title ? <SectionHeading title={title} body={body} className="mb-12" /> : null}
        {children}
      </Container>
    </Section>
  );
}
