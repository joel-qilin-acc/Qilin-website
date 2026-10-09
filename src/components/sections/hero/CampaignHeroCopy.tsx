import { campaigns, resolveCampaign } from "@/content/campaigns";
import { HeroCopy } from "./HeroCopy";

type CampaignHeroCopyProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function CampaignHeroCopy({
  searchParams,
}: CampaignHeroCopyProps) {
  const params = await searchParams;
  const key = firstValue(params.for) ?? firstValue(params.utm_campaign);
  const isCampaign = Boolean(key && key in campaigns);
  return <HeroCopy content={resolveCampaign(key)} animate={isCampaign} />;
}
