import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { offers } from "@/content/offers";
import { OfferCard } from "./OfferCard";

// Right after the hero: the lowest-risk way to start, before the visitor has to trust anything.
export function Offer() {
  return (
    <Section id="free" trace={false} className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Start with something free."
          mark="free."
          body="Two ways to see what you could save before you spend anything."
        />
        <Reveal
          stagger
          className="mt-12 grid gap-4 lg:grid-cols-[1.15fr_1fr]"
        >
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} lead={index === 0} />
          ))}
        </Reveal>
        <a
          href="#difference"
          className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-accent underline decoration-accent/30 underline-offset-[6px] hover:decoration-accent"
        >
          Not ready to talk? Try the interactive demo first
          <ArrowDown aria-hidden size={16} weight="bold" />
        </a>
      </Container>
    </Section>
  );
}
