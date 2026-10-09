import type { Metadata } from "next";
import { services } from "@/content/services";
import { PageHero } from "@/components/page/PageHero";
import { PageSection } from "@/components/page/PageSection";
import { LinkRows } from "@/components/page/LinkRows";

export const metadata: Metadata = {
  title: "Services",
  description: "Software development, DevOps, scalability, security audits and FinOps from one senior team.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Build, scale, secure and optimise with one senior team."
        body="Five service lines. Most clients combine two or three, and keep the same engineers throughout."
      />
      <PageSection>
        <LinkRows
          rows={services.map((service) => ({
            href: `/services/${service.slug}`,
            title: service.name,
            body: service.short,
          }))}
        />
      </PageSection>
    </>
  );
}
