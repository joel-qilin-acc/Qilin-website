import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { TraceNode } from "@/components/motion/TraceNode";
import { defaultCampaign } from "@/content/campaigns";
import { CampaignHeroCopy } from "./CampaignHeroCopy";
import { HeroCopy } from "./HeroCopy";
import { HeroStage } from "./HeroStage";
import { FixLine } from "./fix-line/FixLine";
import { QuoteCard } from "./quote/QuoteCard";

type HeroProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function Hero({ searchParams }: HeroProps) {
  return (
    <HeroStage>
      <TraceNode />
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Suspense
          fallback={
            <div className="hero-fallback">
              <HeroCopy content={defaultCampaign} animate />
            </div>
          }
        >
          <CampaignHeroCopy searchParams={searchParams} />
        </Suspense>
        <QuoteCard />
      </Container>
      <FixLine />
    </HeroStage>
  );
}
