import type { Metadata } from "next";
import { contact } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/page/PageHero";
import { Faq } from "@/components/sections/faq/Faq";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project. A senior engineer replies within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let’s talk."
        body="Tell us where you are: a product idea, a scaling bottleneck, an upcoming audit. We will tell you honestly whether we can help."
      />
      <Section id="book" trace={false} className="pb-24 pt-0 md:pb-32 md:pt-0">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-20">
          <Reveal stagger>
            <div>
              <p className="font-mono text-xs text-muted">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-2 block text-2xl font-semibold tracking-tight underline decoration-line underline-offset-[6px] hover:decoration-accent"
              >
                {contact.email}
              </a>
            </div>
            <div className="mt-10">
              <p className="font-mono text-xs text-muted">Based in</p>
              <p className="mt-2 text-xl">{contact.location}</p>
            </div>
            <div className="mt-10">
              <p className="font-mono text-xs text-muted">Reply time</p>
              <p className="mt-2 text-xl">We reply {contact.response}.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-base border border-line bg-surface p-6 shadow-[0_30px_60px_-34px_rgba(15,18,24,0.3)] sm:p-8">
              <LeadForm variant="contact" submitLabel="Send message" />
            </div>
          </Reveal>
        </Container>
      </Section>
      <Faq />
    </>
  );
}
