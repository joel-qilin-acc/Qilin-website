import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { featuredCases } from "@/content/case-studies";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkTrack } from "./WorkTrack";

export function WorkPan() {
  return (
    <Section
      id="results"
      bot="results"
      spacing="none"
      className="work-pan-tall z-20 overflow-x-clip bg-surface"
      style={{ "--cards": featuredCases.length } as React.CSSProperties}
    >
      <div className="py-20 lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:min-h-[720px] lg:flex-col lg:py-0 lg:pb-20 lg:pt-24">
        <Container className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            className="max-w-none"
            balance={false}
            title="Scale it. Secure it. Keep it running."
            mark="Keep it running."
            body="Real systems, real clients, real numbers. Open any of them to see what we did."
          />
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-[15px] font-medium underline decoration-line underline-offset-[6px] hover:decoration-accent"
          >
            All 14 case studies
            <ArrowRight
              aria-hidden
              size={16}
              weight="bold"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Container>
        <WorkTrack cases={featuredCases} />
      </div>
    </Section>
  );
}
