import type { Metadata } from "next";
import { products } from "@/content/company";
import { LinkRows } from "@/components/page/LinkRows";
import { PageHero } from "@/components/page/PageHero";
import { PageSection } from "@/components/page/PageSection";
import { StackChips } from "@/components/page/StackChips";

export const metadata: Metadata = {
  title: "Products",
  description: "CalenQ.ai and OnTime, products built by the Qilin Lab team.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Products from the lab."
        body="Software we built because we needed it, and now offer to other teams."
      />
      <PageSection>
        <LinkRows
          rows={products.map((product) => ({
            href: product.href,
            title: product.name,
            body: `${product.tagline} ${product.description}`,
          }))}
        />
      </PageSection>
      <PageSection tone="subtle" title="What they do.">
        <StackChips items={products.flatMap((product) => product.features)} />
      </PageSection>
    </>
  );
}
