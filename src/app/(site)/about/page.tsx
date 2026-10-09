import type { Metadata } from "next";
import { companyFacts, compliance, principles } from "@/content/company";
import { CapabilityList } from "@/components/page/CapabilityList";
import { CheckList } from "@/components/page/CheckList";
import { FactRow } from "@/components/page/FactRow";
import { PageHero } from "@/components/page/PageHero";
import { PageSection } from "@/components/page/PageSection";
import { Founder } from "@/components/sections/founder/Founder";

export const metadata: Metadata = {
  title: "About",
  description: "A boutique engineering firm in Bengaluru. 35+ engineers across development, DevOps, security and FinOps.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="A boutique team that owns the result."
        body="We started with one belief: businesses deserve technology partners who think like owners, not vendors. Today 35+ engineers in Bengaluru ship production software for clients in six countries."
      />
      <PageSection>
        <FactRow facts={companyFacts} />
      </PageSection>
      <Founder />
      <PageSection title="How we work.">
        <CapabilityList items={principles} />
      </PageSection>
      <PageSection tone="subtle" title="Security and compliance.">
        <CheckList items={compliance} />
      </PageSection>
    </>
  );
}
