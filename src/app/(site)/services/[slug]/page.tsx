import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findService, services } from "@/content/services";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { CapabilityList } from "@/components/page/CapabilityList";
import { LinkRows } from "@/components/page/LinkRows";
import { PageHero } from "@/components/page/PageHero";
import { PageSection } from "@/components/page/PageSection";
import { StackChips } from "@/components/page/StackChips";
import { CtaBand } from "@/components/sections/cta-band/CtaBand";
import { LoadLabDemo } from "@/components/sections/hero/load-lab/LoadLabDemo";
import { Process } from "@/components/sections/process/Process";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  return service ? { title: service.name, description: service.intro } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.headline}
        body={`${service.subheadline} ${service.intro}`}
        actions={
          <Magnetic>
            <ButtonLink href={service.cta.href}>{service.cta.label}</ButtonLink>
          </Magnetic>
        }
      />
      <PageSection title="What we deliver">
        <CapabilityList items={service.capabilities} />
      </PageSection>
      {service.slug === "scalability" ? <LoadLabDemo /> : null}
      <PageSection tone={service.slug === "scalability" ? "plain" : "subtle"} title="The stack we work in">
        <StackChips items={service.stack} />
      </PageSection>
      <Process title="How it runs." steps={service.process} body="Four stages, each with something you can review." />
      <PageSection title="Where we have done it">
        <LinkRows
          rows={service.proof.map((item) => ({
            href: `/case-studies/${item.slug}`,
            title: item.client,
            body: item.text,
          }))}
        />
      </PageSection>
      <CtaBand />
    </>
  );
}
