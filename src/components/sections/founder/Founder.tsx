import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollDepth } from "@/components/motion/ScrollDepth";
import { FounderQuote } from "./FounderQuote";

export function Founder() {
  return (
    <Section tone="subtle" bot="founder">
      <Container className="lg:grid lg:grid-cols-12 lg:items-end">
        <Reveal className="relative max-w-[440px] lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:max-w-none">
          <ScrollDepth fromY={5} toY={-5} className="relative aspect-[4/5] overflow-hidden rounded-base bg-surface-tint">
            <Image
              src="https://qilinlab.com/team/aditya-agarwal.jpg"
              alt="Aditya Agarwal, CEO of Qilin Lab"
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </ScrollDepth>
        </Reveal>
        <ScrollDepth fromY={-9} toY={9} className="lg:relative lg:z-10 lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:mb-14">
          <FounderQuote />
        </ScrollDepth>
      </Container>
    </Section>
  );
}
