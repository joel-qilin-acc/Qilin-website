import type { Metadata } from "next";
import { auditFacts, auditIncludes } from "@/content/company";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { CheckList } from "@/components/page/CheckList";
import { FactRow } from "@/components/page/FactRow";
import { PageHero } from "@/components/page/PageHero";
import { PageSection } from "@/components/page/PageSection";
import { CtaBand } from "@/components/sections/cta-band/CtaBand";
import { Faq } from "@/components/sections/faq/Faq";
import { Process } from "@/components/sections/process/Process";

export const metadata: Metadata = {
  title: "Security audit for $97",
  description: "A manual security audit of your web app, APIs and cloud setup, with a ranked report and a call. $97, delivered in 7 business days.",
};

const auditSteps = [
  { title: "Request", body: "Send your name, email and the website to audit." },
  { title: "Scope", body: "We confirm what is in scope and what we need from you." },
  { title: "Test", body: "A senior engineer tests it by hand, not just with scanners." },
  { title: "Report", body: "A ranked report and a 30-minute call, within 7 business days." },
];

const auditFaq = [
  { question: "What is included for $97?", answer: "A manual audit of your web app, APIs and cloud setup, a 15 to 25 page report ranked by severity, and a 30-minute call with a senior engineer." },
  { question: "How long does it take?", answer: "You receive the report within 7 business days of scoping." },
  { question: "What if it does not help?", answer: "You get a full refund. We have never been asked for one." },
];

export default function AuditPage() {
  return (
    <>
      <PageHero
        title="A senior security audit for $97."
        body="Traditional penetration tests cost thousands. This one is manual, scoped for startups, and delivered in 7 business days with a full refund if it does not help."
        actions={
          <Magnetic>
            <ButtonLink href="#book">Get the audit</ButtonLink>
          </Magnetic>
        }
      />
      <PageSection>
        <FactRow facts={auditFacts} />
      </PageSection>
      <PageSection tone="subtle" title="What you get.">
        <CheckList items={auditIncludes} />
      </PageSection>
      <Process title="How it works." steps={auditSteps} body="Four steps from request to report." />
      <Faq title="Audit questions." items={auditFaq} />
      <CtaBand
        title="Get your security audit."
        body="Three fields. We reply within 24 hours to confirm scope."
        variant="audit"
        submitLabel="Get the audit"
      />
    </>
  );
}
