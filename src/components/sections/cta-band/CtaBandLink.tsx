import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { contact } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

type CtaBandLinkProps = {
  title: string;
  body: string;
  label?: string;
};

// The closing invitation: no form to fill in here, just one clear step to the contact page.
export function CtaBandLink({ title, body, label = "Contact us" }: CtaBandLinkProps) {
  return (
    <Section id="contact-cta" tone="subtle" bot="book">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <SplitHeading className="text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance md:text-6xl">
            {title}
          </SplitHeading>
          <Reveal>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">{body}</p>
          </Reveal>
        </div>
        <Reveal>
          <div data-bot-target className="flex flex-col items-start gap-5">
            <ButtonLink href="/contact" className="neon-glow h-14 rounded-full px-8 text-base font-semibold">
              {label}
              <ArrowRight aria-hidden size={18} weight="bold" />
            </ButtonLink>
            <a
              href={`mailto:${contact.email}`}
              className="text-[15px] text-muted underline decoration-line underline-offset-[6px] hover:text-accent hover:decoration-accent"
            >
              or email {contact.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
