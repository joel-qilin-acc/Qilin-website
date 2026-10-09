import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findHireRole, hireIncluded, hireRoles, hireSteps } from "@/content/hire";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { CheckList } from "@/components/page/CheckList";
import { PageHero } from "@/components/page/PageHero";
import { PageSection } from "@/components/page/PageSection";
import { StackChips } from "@/components/page/StackChips";
import { Faq } from "@/components/sections/faq/Faq";
import { Process } from "@/components/sections/process/Process";

export function generateStaticParams() {
  return hireRoles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: PageProps<"/hire-developers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const role = findHireRole(slug);
  return role ? { title: role.name, description: role.intro } : {};
}

export default async function HireRolePage({ params }: PageProps<"/hire-developers/[slug]">) {
  const { slug } = await params;
  const role = findHireRole(slug);
  if (!role) notFound();

  return (
    <>
      <PageHero
        title={role.headline}
        body={`${role.subheadline} ${role.intro}`}
        actions={
          <Magnetic>
            <ButtonLink href="/contact">Request developers</ButtonLink>
          </Magnetic>
        }
        aside={
          <div>
            <p className="font-mono text-sm text-muted">Starting at</p>
            <p className="mt-2 font-figure text-7xl leading-none sm:text-8xl">{role.from}</p>
            <p className="mt-3 font-mono text-sm text-muted">a month, per engineer</p>
          </div>
        }
      />
      <PageSection title="What you get.">
        <CheckList items={hireIncluded} />
      </PageSection>
      <PageSection tone="subtle" title="Skills and stack.">
        <StackChips items={role.stack} />
      </PageSection>
      <Process title="How it starts." steps={hireSteps} body="From brief to a working engineer in about a week." />
      <Faq title="Questions about this role." items={role.faqs} />
    </>
  );
}
