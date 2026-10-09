import type { CaseStudy } from "@/types/content";

export const caseStudies: CaseStudy[] = [
  {
    slug: "ics-mobile",
    client: "ICS Mobile",
    logo: "ics-mobile.png",
    industry: "Telecom",
    headline: "Messaging that stopped making customers wait",
    summary: "A Kubernetes migration and a pipeline rebuilt for parallel load took SMS, WhatsApp and RCS from 500 to 3,000 TPS.",
    metric: { kind: "number", value: 3000, from: 500, label: "messages every second, up from 500" },
    challenge:
      "The messaging platform was capped at 500 TPS, with regular complaints about delivery delays across SMS, WhatsApp and RCS. Pipelines ran with no parallelism and the team had little visibility during peak hours.",
    approach: [
      "Complete Kubernetes migration with the pipeline re-architected for parallel processing",
      "End-to-end profiling to find the real bottlenecks",
      "Event streams with per-channel workers and horizontal autoscaling",
      "Observability rebuilt on Prometheus and Grafana",
    ],
    results: [
      "Throughput from 500 to 3,000 TPS, a 6x increase",
      "Customer complaints from regular to zero",
      "Near real-time delivery across every channel",
    ],
    stack: ["Kubernetes", "Docker", "RabbitMQ", "Node.js", "AWS", "Prometheus", "Grafana"],
    engagement: "14 months, 5 engineers",
    quote: {
      text: "We went from telling customers to wait to telling them it’s already delivered. That’s the difference Qilin Lab made.",
      by: "Head of Platform, ICS Mobile",
    },
    featured: true,
  },
  {
    slug: "spend-the-bits",
    client: "Spend The Bits",
    logo: "spend-the-bits.png",
    industry: "Fintech",
    headline: "A payments platform rebuilt for 99.9% uptime",
    summary: "A B2B finance application and a retail crypto wallet, rebuilt end to end and moved to Kubernetes.",
    metric: { kind: "number", value: 99.9, from: 80, decimals: 1, suffix: "%", label: "uptime, up from 80%" },
    challenge:
      "The legacy payments stack suffered more than 20% downtime during peak windows with no observability. A monolithic codebase slowed releases, and the crypto wallet lacked compliance-ready audit trails.",
    approach: [
      "Microservices with independent scaling per transaction class",
      "Zero-downtime Kubernetes migration behind feature flags",
      "An event-driven payments core on Kafka with idempotent retries",
      "Observability-first rollout with Prometheus and Grafana",
    ],
    results: [
      "Uptime from 80% to 99.9%",
      "Release cadence from monthly to several deploys a week",
      "Zero high-severity incidents in the last 12 months",
      "Lower infrastructure cost after the Kubernetes migration",
    ],
    stack: ["React", "Node.js", "Kubernetes", "Docker", "AWS", "PostgreSQL"],
    engagement: "3+ years, 12 engineers at peak",
    quote: {
      text: "Qilin Lab isn’t a vendor, they’re the team we reach for when something really matters. They own our infrastructure the way we own our product.",
      by: "Jaskaran Kambo, CEO, Spend The Bits",
    },
    featured: true,
  },
  {
    slug: "canco-petroleum",
    client: "Canco Petroleum",
    logo: "canco-petroleum.png",
    industry: "Energy",
    headline: "One control plane for 200+ fuel stations",
    summary: "Fuel sync, fleet management and a central admin portal for a growing Canadian petroleum group, all managed by us.",
    metric: { kind: "number", value: 200, suffix: "+", label: "fuel stations connected" },
    challenge:
      "More than 200 stations ran disconnected POS and pump systems. Fleet fuel cards had no real-time reconciliation, there was no central visibility, and supplier integrations were fragile.",
    approach: [
      "A hub-and-spoke event model with offline-first station clients",
      "Fleet management built on real-time telemetry",
      "Streaming APIs in place of batch integrations",
      "Pump-to-cloud synchronisation that survives lost connectivity",
    ],
    results: [
      "200+ stations connected and unified",
      "Real-time fleet tracking replacing next-day batch reports",
      "A central admin portal as the single source of truth",
    ],
    stack: ["React", "Node.js", "Express.js", "PostgreSQL", "AWS", "Kubernetes"],
    engagement: "3 years and ongoing, 10 engineers, full-stack technology partner",
    quote: {
      text: "Qilin Lab is the tech backbone our retail network runs on. They take full ownership, we treat them as our technology department.",
      by: "VP Operations, Canco Petroleum",
    },
    featured: true,
  },
  {
    slug: "kashti-finserv",
    client: "Kashti FinServ",
    logo: "kashti-finserv.png",
    industry: "Fintech",
    headline: "A loan aggregator scaled 1,000x",
    summary: "An NBFC-bound loan aggregator went from 3 to 3,000+ applications a day with zero processing complaints.",
    metric: { kind: "number", value: 3000, from: 3, suffix: "+", label: "applications a day, up from 3" },
    challenge:
      "Kashti processed only 3 manual applications a day, with no automation across eligibility, KYC and underwriting. The infrastructure was not ready for NBFC compliance and partner integrations took weeks.",
    approach: [
      "An origination flow designed for compliance from the start",
      "A plug-and-play partner integration framework",
      "Kubernetes services with per-tenant isolation",
      "Immutable audit trails across every decision point",
    ],
    results: [
      "Applications from 3 to 3,000+ per day",
      "Zero processing complaints since launch",
      "Partner onboarding cut from weeks to days",
      "NBFC-ready, and through due diligence",
    ],
    stack: ["React", "Node.js", "Kubernetes", "Docker", "PostgreSQL", "AWS"],
    engagement: "2 years and ongoing, 7 engineers",
    quote: {
      text: "The platform they built is the reason we can sit across the table from regulators with confidence.",
      by: "Founder, Kashti FinServ",
    },
    featured: true,
  },
  {
    slug: "eduley",
    client: "Eduley",
    logo: "eduley.png",
    industry: "EdTech",
    headline: "Canada’s learning platform, secured and scaled",
    summary: "A secure, scalable LMS serving thousands of concurrent students with DRM-protected content.",
    metric: { kind: "number", value: 99.9, decimals: 1, suffix: "%", label: "uptime across the academic calendar" },
    challenge:
      "There was no central system for multi-tenant teacher and student workflows, and course content was exposed to screen capture and bulk downloads.",
    approach: [
      "The LMS domain modelled from first principles",
      "A DRM layer with signed URLs and per-session entitlements",
      "Kubernetes to absorb exam-window spikes",
      "SOC 2 aligned controls built into the codebase",
    ],
    results: [
      "99.9% platform uptime across the academic calendar",
      "Piracy incidents reduced to near zero",
      "Thousands of concurrent students sustained during exams",
    ],
    stack: ["React", "Django", "Kubernetes", "AWS", "PostgreSQL", "Redis"],
    engagement: "4 years and ongoing, 8 engineers",
    quote: {
      text: "From day one, the Qilin Lab team felt like an extension of our own. Professional, responsive, and deeply technical.",
      by: "Founder, Eduley",
    },
    featured: true,
  },
  {
    slug: "open-door-education",
    client: "Open Door Education",
    logo: "open-door-education.png",
    industry: "EdTech",
    headline: "A platform built, and cloud cost cut in half",
    summary: "Platform and DevOps ownership that halved monthly cloud spend over two years.",
    metric: { kind: "number", value: 50, suffix: "%", label: "lower cloud cost, Rs 3L to Rs 1.5L a month" },
    challenge:
      "Platform development had stalled across several vendors. Cloud spend of Rs 3L a month had no visibility, mixed workloads competed for resources and releases kept breaking.",
    approach: [
      "A modern React and Node platform rebuild",
      "A FinOps audit with workload-aware right-sizing",
      "Containerised services for isolation",
      "CI/CD with blue-green deployments",
    ],
    results: [
      "Cloud cost from Rs 3L to Rs 1.5L a month",
      "Performance improved alongside the savings",
      "Weekly releases with zero incidents",
      "One team owning platform, DevOps and FinOps",
    ],
    stack: ["React", "Node.js", "AWS", "Docker", "Kubernetes"],
    engagement: "2 years and ongoing, 7 engineers",
    quote: {
      text: "Our experience has been beyond our expectations. Whatever products the team builds are going to be of high quality.",
      by: "Abhishek Kariwal, CEO, Open Door Education",
    },
  },
  {
    slug: "violet-lms",
    client: "Violet LMS",
    logo: "violet-lms.png",
    industry: "EdTech",
    headline: "An enterprise LMS, cost optimised",
    summary: "$4K a month saved and page loads cut from 4 seconds to under 2 for India’s largest enterprise LMS.",
    metric: { kind: "number", value: 4, prefix: "$", suffix: "K", label: "saved every month, 20% of the bill" },
    challenge:
      "Cloud expenses were rising about 40% a year with no control. Releases took half a day by hand and pages loaded in 4 seconds under peak load.",
    approach: [
      "A 30-day FinOps audit across every account",
      "Steady-state and spiky workloads separated",
      "Containerisation with GitOps-style deployments",
      "Server-side streaming and caching for heavy pages",
      "A rebuilt reserved-instance and savings-plan portfolio",
    ],
    results: [
      "$4K a month saved, 20% off a $20K bill",
      "Page load from 4 seconds to under 2",
      "Deployments from hours to minutes",
      "Weekly releases enabled",
    ],
    stack: ["AWS", "Kubernetes", "Docker", "Terraform", "CloudWatch"],
    engagement: "18 months, 4 engineers",
    quote: {
      text: "Their team doesn’t just write code, they understand the business problem. The cost savings alone paid for the engagement 10x over.",
      by: "CTO, Violet LMS",
    },
  },
  {
    slug: "allindex",
    client: "AllIndex",
    logo: "allindex.png",
    industry: "Fintech",
    headline: "Institutional-grade backtesting, sub-second",
    summary: "A Bloomberg-tier backtesting and tax-loss harvesting engine with a 99.99% uptime SLA for institutional clients.",
    metric: { kind: "number", value: 99.99, decimals: 2, suffix: "%", label: "uptime SLA through launch quarter" },
    challenge:
      "AllIndex had to process huge financial datasets in real time for institutional clients. The prototype collapsed at production volume, and regulators needed deterministic, auditable backtests.",
    approach: [
      "The compute layer rebuilt around columnar storage and parallel execution",
      "A custom backtesting framework with immutable run artifacts",
      "Multi-tier caching for historical and live data",
      "Load-tested at 10x projected institutional volume",
    ],
    results: [
      "Sub-second backtests over years of daily market data",
      "99.99% uptime SLA through the launch quarter",
      "Anchor institutional clients onboarded",
    ],
    stack: ["React", "Python", "Node.js", "Kubernetes", "AWS", "PostgreSQL", "Redis"],
    engagement: "2 years and ongoing, 6 senior engineers",
    quote: {
      text: "Qilin Lab shaped our vision of an ultra-modern real-time stock portfolio app into reality.",
      by: "Henry Ann, Head of Americas, Allindex AG",
    },
  },
  {
    slug: "alfredx",
    client: "AlfredX",
    industry: "Enterprise",
    headline: "Managed DevOps and SRE across APAC",
    summary: "Production operations for a Singapore enterprise asset platform, holding 99.9% uptime across the region.",
    metric: { kind: "number", value: 99.9, decimals: 1, suffix: "%", label: "uptime sustained across APAC" },
    challenge:
      "Enterprise contracts demanded 99.9% availability, but there was no CI/CD pipeline. Manual releases caused errors and ad-hoc incident response could not scale across regions.",
    approach: [
      "An SRE baseline with SLIs, SLOs and on-call runbooks",
      "Automated CI/CD with canary rollouts",
      "Infrastructure as code across every environment",
      "Quarterly cross-region failover tests",
    ],
    results: [
      "99.9% uptime sustained across APAC",
      "Several deployments a day",
      "Mean time to recovery down about 70%",
      "New regions added without replatforming",
    ],
    stack: ["AWS", "Kubernetes", "Docker", "Jenkins", "Terraform"],
    engagement: "2 years and ongoing, 3 engineers",
    quote: {
      text: "They run our production like it’s their own. Enterprise-grade ops, without the enterprise-grade cost.",
      by: "CTO, AlfredX",
    },
  },
  {
    slug: "ecoprocurer",
    client: "EcoProcurer",
    logo: "ecoprocurer.png",
    industry: "Marketplace",
    headline: "India’s B2B solar marketplace",
    summary: "One of India’s first full-featured B2B solar marketplaces, connecting hundreds of vendors and buyers.",
    metric: { kind: "text", text: "Hundreds", label: "of verified vendors and buyers transacting" },
    challenge:
      "Indian solar had no established B2B marketplace. Vendors were found through WhatsApp and phone calls, buyer RFQs needed manual coordination and first-time buyers had no way to build trust.",
    approach: [
      "The solar B2B buying journey mapped with industry operators",
      "A structured catalogue and taxonomy for solar SKUs",
      "Escrow, RFQ and bidding workflows",
      "Vendor verification, reviews and dispute resolution",
      "Logistics coordination built into the order flow",
    ],
    results: [
      "Among India’s first full-stack B2B solar marketplaces",
      "Hundreds of verified vendors and buyers transacting",
      "A platform ready for regional expansion",
    ],
    stack: ["React", "Node.js", "Express.js", "PostgreSQL", "AWS", "Elasticsearch"],
    engagement: "18 months, 6 engineers",
    quote: {
      text: "They built the entire product, not just the code. We shipped something no one else in India had.",
      by: "Co-Founder, EcoProcurer",
    },
  },
  {
    slug: "rainbow-financial",
    client: "Rainbow Financial",
    logo: "rainbow-financial.png",
    industry: "Fintech",
    headline: "From days to minutes in the sales funnel",
    summary: "An Odoo CRM re-engineered with BPMN-driven automation, cutting lead-to-conversion from days to minutes.",
    metric: { kind: "text", text: "Minutes", label: "lead to conversion, down from 4+ days" },
    challenge:
      "Lead-to-conversion averaged more than 4 days, so faster competitors won the deals. Odoo customisations broke on upgrades and reporting meant manual pulls from three systems.",
    approach: [
      "The full lead workflow mapped with BPMN",
      "Manual handoffs and lead routing automated",
      "Customisations rebuilt on upgrade-safe patterns",
      "Real-time conversion dashboards",
    ],
    results: [
      "Lead-to-conversion from days to minutes",
      "Odoo upgrades no longer break business-critical flows",
      "Real-time conversion analytics",
    ],
    stack: ["Odoo", "Python", "BPMN", "PostgreSQL"],
    engagement: "9 months, 3 engineers",
    quote: {
      text: "They took something we fought with every day and turned it into a competitive advantage.",
      by: "COO, Rainbow Financial",
    },
  },
  {
    slug: "fpt-software",
    client: "FPT Software",
    logo: "fpt-software.png",
    industry: "Enterprise",
    headline: "Semantic analysis of every call",
    summary: "An NLP platform that turns call-centre conversations into structured, searchable quality signals at scale.",
    metric: { kind: "number", value: 100, suffix: "%", label: "of calls analysed, up from sampling" },
    challenge:
      "Manual QA sampled only a fraction of daily calls, so sentiment and compliance problems surfaced too late. Conversations mixed Vietnamese and English.",
    approach: [
      "A speech-to-text pipeline tuned for Vietnamese and code-switched calls",
      "Semantic classification of topics, intent, sentiment and compliance",
      "A streaming architecture that analyses every call in near real time",
      "Agent-level dashboards for QA review",
    ],
    results: [
      "QA coverage from manual sampling to 100% of calls",
      "Sentiment and compliance signals in near real time",
      "Agent coaching grounded in conversation-level evidence",
    ],
    stack: ["Python", "PyTorch", "Transformers", "Kafka", "PostgreSQL", "AWS"],
    engagement: "Ongoing, 6 engineers",
    quote: {
      text: "Qilin Lab built a semantic layer on top of our call operations that we simply could not have staffed manually.",
      by: "Engineering Leadership, FPT Software",
    },
  },
  {
    slug: "eatverse",
    client: "Eatverse",
    industry: "Food and beverage",
    headline: "An AI operations dashboard for 12 brands",
    summary: "Custom AI agents watch catalogues and supply chains across a 12-brand food portfolio and catch errors before customers do.",
    metric: { kind: "number", value: 12, label: "brands on one dashboard" },
    challenge:
      "Eatverse ran 12 food brands and thousands of SKUs with no cross-brand visibility. Errors were found through customer complaints and margin leaks instead of being caught early.",
    approach: [
      "One data model across every brand and SKU line",
      "Custom AI agents for catalogue validation, price integrity and supply-chain anomalies",
      "Role-based dashboards for merchandising, supply chain and leadership",
      "Continuous monitoring in place of weekly manual audits",
    ],
    results: [
      "Catalogue and supply-chain errors caught before customer impact",
      "The ops team moved from chasing errors to solving problems",
      "New brands onboard without extra spreadsheets",
    ],
    stack: ["Next.js", "Python", "LLM agents", "PostgreSQL", "AWS"],
    engagement: "Ongoing product build",
    quote: {
      text: "Qilin Lab built us the system we didn’t know we needed. Catalogue and supply chain errors across 12 brands now get caught before they ever reach a customer.",
      by: "Harsh Kandoi, Co-Founder, Eatverse",
    },
  },
  {
    slug: "markchem",
    client: "Markchem",
    logo: "markchem.png",
    industry: "Construction chemicals",
    headline: "A loyalty programme with same-day UPI payouts",
    summary: "QR-scanned scratch cards and direct UPI transfers give contractors instant digital rewards.",
    metric: { kind: "number", value: 10000, suffix: "+", label: "downloads on Google Play" },
    challenge:
      "Manual coupon processing and bank transfers were slow and prone to fraud across a three-tier distributor, applicator and contractor network. There was no audit trail, and field workers wanted instant cash, not vouchers.",
    approach: [
      "A native Android app for in-field scanning with fraud protection",
      "A batch scratch-card generator for the admin team",
      "Redeemable and non-redeemable point buckets with auto-expiry",
      "UPI payout integration for same-day payments",
      "A full audit trail from code generation to redemption",
    ],
    results: [
      "10,000+ downloads on Google Play",
      "Instant UPI payouts to contractors every day",
      "Fraud attempts blocked at the app layer",
      "Nationwide campaigns without finance bottlenecks",
    ],
    stack: ["Android", "iOS", "Node.js", "PostgreSQL", "UPI payout APIs", "AWS"],
    engagement: "Multi-year product build and operations",
    quote: {
      text: "Our applicators actually use this system. Scan a card, get paid to UPI the same day. That simplicity turned a scheme into a real channel.",
      by: "Shobhit Gupta, Founder, Markchem",
    },
  },
];

export const featuredCases = caseStudies.filter((study) => study.featured);

export function findCase(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function nextCase(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}
