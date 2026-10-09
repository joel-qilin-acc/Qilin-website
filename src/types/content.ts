export type Cta = {
  label: string;
  href: string;
};

export type NavLink = Cta;

export type CampaignContent = {
  headline: string;
  mark?: string;
  body: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

export type ClientLogo = {
  name: string;
  file: string;
  scale?: number;
};

export type PathTileContent = {
  id: string;
  label: string;
  title: string;
  body: string;
  highlight?: string;
  highlightNote?: string;
  includes?: string[];
  cta: Cta;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  videoId: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type CaseMetric =
  | { kind: "number"; value: number; from?: number; decimals?: number; prefix?: string; suffix?: string; label: string }
  | { kind: "text"; text: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  logo?: string;
  industry: string;
  headline: string;
  summary: string;
  metric: CaseMetric;
  challenge: string;
  approach: string[];
  results: string[];
  stack: string[];
  engagement: string;
  quote: { text: string; by: string };
  featured?: boolean;
};

export type Capability = {
  title: string;
  body: string;
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  subheadline: string;
  intro: string;
  capabilities: Capability[];
  stack: string[];
  process: ProcessStep[];
  proof: { client: string; slug: string; text: string }[];
  cta: Cta;
};

export type HireRole = {
  slug: string;
  name: string;
  headline: string;
  subheadline: string;
  intro: string;
  from: string;
  stack: string[];
  faqs: FaqItem[];
};

export type OpenRole = {
  title: string;
  stack: string;
};

export type Product = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  href: string;
};
