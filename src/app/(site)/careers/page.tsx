import type { Metadata } from "next";
import { careerPerks, companyFacts, contact, openRoles } from "@/content/company";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { CapabilityList } from "@/components/page/CapabilityList";
import { CheckList } from "@/components/page/CheckList";
import { FactRow } from "@/components/page/FactRow";
import { PageHero } from "@/components/page/PageHero";
import { PageSection } from "@/components/page/PageSection";

export const metadata: Metadata = {
  title: "Careers",
  description: "A boutique team. Work that matters. Open roles in engineering, DevOps, security, design, product and sales.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="A boutique team. Work that matters."
        body="A small senior engineering team shipping production software for fintechs, educators and energy operators across six countries."
        actions={
          <Magnetic>
            <ButtonLink href={`mailto:${contact.hiring}`}>Send your CV</ButtonLink>
          </Magnetic>
        }
      />
      <PageSection>
        <FactRow facts={companyFacts} />
      </PageSection>
      <PageSection tone="subtle" title="Why people stay.">
        <CheckList items={careerPerks} />
      </PageSection>
      <PageSection title="Where we are hiring.">
        <CapabilityList items={openRoles.map((role) => ({ title: role.title, body: role.stack }))} />
      </PageSection>
      <PageSection tone="subtle" id="book" title="How to apply.">
        <p className="max-w-[56ch] text-lg leading-relaxed text-muted">
          Send your CV and a short summary of something you recently shipped to{" "}
          <a
            href={`mailto:${contact.hiring}`}
            className="font-medium text-ink underline decoration-line underline-offset-[6px] hover:decoration-accent"
          >
            {contact.hiring}
          </a>
          . If you are an employer looking to hire developers, use the hiring page instead.
        </p>
      </PageSection>
    </>
  );
}
