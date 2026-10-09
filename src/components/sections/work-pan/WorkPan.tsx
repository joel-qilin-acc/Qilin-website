import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { featuredCases } from "@/content/case-studies";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkCard } from "./WorkCard";
import { WorkPanTrack } from "./WorkPanTrack";

export function WorkPan() {
  return (
    <Section id="results" bot="results" spacing="none" className="z-20 overflow-x-clip bg-surface py-20 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-0">
      <Container className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading title="Systems we keep running." />
        <Link
          href="/case-studies"
          className="group inline-flex items-center gap-2 text-[15px] font-medium underline decoration-line underline-offset-[6px] hover:decoration-accent"
        >
          All 14 case studies
          <ArrowRight aria-hidden size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Container>
      <WorkPanTrack>
        {featuredCases.map((study) => (
          <WorkCard key={study.slug} study={study} />
        ))}
      </WorkPanTrack>
    </Section>
  );
}
