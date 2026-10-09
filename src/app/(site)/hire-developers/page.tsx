import type { Metadata } from "next";
import { hireIncluded, hirePricing, hireRoles, hireSteps } from "@/content/hire";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { CheckList } from "@/components/page/CheckList";
import { LinkRows } from "@/components/page/LinkRows";
import { PageHero } from "@/components/page/PageHero";
import { PageSection } from "@/components/page/PageSection";
import { PricingRows } from "@/components/page/PricingRows";
import { CtaBand } from "@/components/sections/cta-band/CtaBand";
import { Faq } from "@/components/sections/faq/Faq";
import { Process } from "@/components/sections/process/Process";

export const metadata: Metadata = {
  title: "Hire developers",
  description: "Senior, vetted engineers from $1,500 a month. Shortlist in about 48 hours, 3-day risk-free trial.",
};

export default function HireDevelopersPage() {
  return (
    <>
      <PageHero
        title="Hire senior engineers from $1,500 a month."
        body="A shortlist of vetted engineers in about 48 hours. Month to month, with a 3-day risk-free trial and nothing to pay upfront."
        actions={
          <Magnetic>
            <ButtonLink href="/contact">Request developers</ButtonLink>
          </Magnetic>
        }
      />
      <PageSection title="Pricing, stated plainly.">
        <PricingRows rows={hirePricing} />
      </PageSection>
      <PageSection tone="subtle" title="Every placement includes.">
        <CheckList items={hireIncluded} />
      </PageSection>
      <Process title="From brief to first commit." steps={hireSteps} body="Most teams have an engineer working within a week." />
      <PageSection title="Choose your stack.">
        <LinkRows
          rows={hireRoles.map((role) => ({
            href: `/hire-developers/${role.slug}`,
            title: role.name,
            body: role.subheadline,
            meta: `from ${role.from} a month`,
          }))}
        />
      </PageSection>
      <Faq title="Hiring questions." items={hireRoles[5].faqs} />
      <CtaBand
        title="Request developers."
        body="Tell us what you are building. Get a shortlist of vetted senior developers and a clear quote in about 48 hours."
        submitLabel="Request developers"
      />
    </>
  );
}
