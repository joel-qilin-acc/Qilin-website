import type { CampaignContent } from "@/types/content";

export const defaultCampaign = {
  headline: "We fix what slows your business down.",
  mark: "fix",
  body: "Senior engineers who build, fix and protect the software behind your business, and stay accountable for the result.",
  primaryCta: { label: "Book a call", href: "/contact" },
  secondaryCta: { label: "See the work", href: "#results" },
} satisfies CampaignContent;

export const campaigns = {
  scale: {
    headline: "Keep your app running when everyone shows up.",
    mark: "running",
    body: "We fix the slow parts, so busy days and launches stop being stressful.",
    primaryCta: { label: "Book a call", href: "/contact" },
    secondaryCta: { label: "See the proof", href: "#proof" },
  },
  security: {
    headline: "Find the weak spots before someone else does.",
    mark: "weak spots",
    body: "A senior engineer tests your website and app by hand and tells you what to fix. $97, in 7 business days.",
    primaryCta: { label: "Get the audit", href: "/2026-audit" },
    secondaryCta: { label: "See the work", href: "#results" },
  },
  hire: {
    headline: "Senior engineers from $1,500 a month, matched in days.",
    mark: "matched in days",
    body: "Shortlist in about 48 hours. You pay only after the trial goes well.",
    primaryCta: { label: "Request developers", href: "/hire-developers" },
    secondaryCta: { label: "See the work", href: "#results" },
  },
} satisfies Record<string, CampaignContent>;

export type CampaignKey = keyof typeof campaigns;

export function resolveCampaign(key: string | undefined): CampaignContent {
  if (key && key in campaigns) {
    return campaigns[key as CampaignKey];
  }
  return defaultCampaign;
}
