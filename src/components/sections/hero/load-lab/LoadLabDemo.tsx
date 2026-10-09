import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoadLabConsole } from "./LoadLabConsole";
import { LoadLabProvider } from "./LoadLabProvider";
import { LoadLabStage } from "./LoadLabStage";

export function LoadLabDemo() {
  return (
    <Section tone="subtle" trace={false} className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Watch one overloaded server recover."
          body="Same server, same visitors. Switch on each fix and see the load come down. No machines were added."
          className="mb-12"
        />
        <LoadLabProvider>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <LoadLabConsole />
            <LoadLabStage />
          </div>
        </LoadLabProvider>
      </Container>
    </Section>
  );
}
