import type { Metadata } from "next";
import { CaseIndex } from "@/components/case/CaseIndex";
import { PageHero } from "@/components/page/PageHero";
import { PageSection } from "@/components/page/PageSection";
import { CtaBand } from "@/components/sections/cta-band/CtaBand";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Fourteen engagements across fintech, edtech, energy and enterprise, with the numbers.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        title="Systems that scaled, stayed up and saved money."
        body="Fourteen engagements across fintech, edtech, energy and enterprise. Each one with the problem, the work and the measured result."
      />
      <PageSection>
        <CaseIndex />
      </PageSection>
      <CtaBand />
    </>
  );
}
