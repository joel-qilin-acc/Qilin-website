import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, findCase, nextCase } from "@/content/case-studies";
import { CaseHeroAside } from "@/components/case/CaseHeroAside";
import { CaseNarrative } from "@/components/case/CaseNarrative";
import { CaseQuote } from "@/components/case/CaseQuote";
import { CaseResults } from "@/components/case/CaseResults";
import { PageHero } from "@/components/page/PageHero";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = findCase(slug);
  return study ? { title: `${study.client} case study`, description: study.summary } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = findCase(slug);
  if (!study) notFound();

  return (
    <>
      <PageHero title={study.headline} body={study.summary} aside={<CaseHeroAside study={study} />} />
      <CaseNarrative study={study} />
      <CaseResults study={study} />
      <CaseQuote study={study} next={nextCase(study.slug)} />
    </>
  );
}
