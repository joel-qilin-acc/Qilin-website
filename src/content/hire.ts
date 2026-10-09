import type { HireRole, ProcessStep } from "@/types/content";

export const hirePricing = [
  { role: "Full-stack and web", price: "$1,500", note: "a month, per engineer" },
  { role: "Mobile", price: "$1,600", note: "a month, per engineer" },
  { role: "AI and ML", price: "$1,800", note: "a month, per engineer" },
];

export const hireIncluded = [
  "One senior, vetted engineer, full time on your work",
  "Matched to your stack and time zone",
  "A 3-day risk-free trial. Pay nothing if you stop",
  "A replacement guarantee if the fit is wrong",
  "Month to month, with no annual lock-in",
];

export const hireSteps: ProcessStep[] = [
  { title: "Brief", body: "Tell us your stack and needs in two minutes." },
  { title: "Shortlist", body: "Vetted candidates in about 48 hours." },
  { title: "Interview", body: "Meet them and pick your engineer." },
  { title: "Trial", body: "Three days on real tickets. Pay nothing if you stop." },
];

export const hireRoles: HireRole[] = [
  {
    slug: "react",
    name: "React developers",
    headline: "Hire senior React developers from $1,500 a month",
    subheadline: "Vetted, matched to your stack, shortlist in about 48 hours.",
    intro:
      "Senior React engineers from our Bengaluru team, on month-to-month contracts with no upfront cost. Developers usually start about a week after you pick them.",
    from: "$1,500",
    stack: ["React", "TypeScript", "Next.js", "React Native", "Node.js", "PostgreSQL", "AWS", "Docker"],
    faqs: [
      { question: "Can they work with Redux or class components?", answer: "Yes. Mention legacy tech in your brief and we match accordingly. Files migrate incrementally during normal work, never as standalone rewrites." },
      { question: "App Router or Pages Router?", answer: "Both. Tell us which router and version you run, because file structure and data fetching differ." },
      { question: "Who owns the code?", answer: "You do, once fees are paid. Qilin Lab keeps pre-existing tools and licenses them to you if they are embedded." },
      { question: "What happens in the 3-day trial?", answer: "Real backlog tickets only. You prove the pipeline on day one and fix a bug on days two and three. If you stop, you pay nothing." },
    ],
  },
  {
    slug: "nodejs",
    name: "Node.js developers",
    headline: "Hire senior Node.js developers from $1,500 a month",
    subheadline: "Backend engineers for APIs, queues and data-heavy services.",
    intro:
      "Senior backend engineers from Bengaluru on month-to-month contracts. Shortlist in about 48 hours, with a 3-day risk-free trial.",
    from: "$1,500",
    stack: ["Node.js", "TypeScript", "Express.js", "NestJS", "GraphQL", "PostgreSQL", "Redis", "RabbitMQ", "Kafka", "Kubernetes"],
    faqs: [
      { question: "Do they write TypeScript?", answer: "Yes, matched to your codebase and compiler settings." },
      { question: "Can they take over a legacy API?", answer: "Yes. Say so in your brief and we plan for dependency audits and risk-focused testing." },
      { question: "Who owns the code?", answer: "You own the IP once payment is complete. Pre-existing Qilin tools stay under a perpetual license to you." },
      { question: "What happens on day four?", answer: "You continue month to month at the quoted rate, or stop and pay nothing." },
    ],
  },
  {
    slug: "full-stack",
    name: "Full-stack developers",
    headline: "Hire senior full-stack developers from $1,500 a month",
    subheadline: "One engineer who can design the table, write the endpoint and ship the screen.",
    intro:
      "Senior full-stack engineers placed on month-to-month contracts. Team pricing and volume discounts are available.",
    from: "$1,500",
    stack: ["React", "Next.js", "TypeScript", "Node.js", "Django", "Go", "PostgreSQL", "Redis", "Docker", "AWS", "GCP"],
    faqs: [
      { question: "Can one person do front end and back end well?", answer: "For ordinary web product work, yes. A senior engineer can design a table, write the endpoint, build the screen and deploy it." },
      { question: "How much DevOps do they cover?", answer: "Enough for one product: a Dockerfile, a CI pipeline, deployment to AWS or GCP, environment configuration, logs, basic alerts and backups." },
      { question: "Will they design the interface?", answer: "They build from your designs and wireframes. They do not do brand design or user research." },
      { question: "Who owns the code?", answer: "Intellectual property in bespoke deliverables is assigned to you once all fees are paid." },
    ],
  },
  {
    slug: "nextjs",
    name: "Next.js developers",
    headline: "Hire senior Next.js developers from $1,500 a month",
    subheadline: "App Router, Server Components and production deployments.",
    intro:
      "Senior Next.js engineers on monthly contracts. A matched shortlist arrives in about 48 hours with nothing to pay upfront.",
    from: "$1,500",
    stack: ["Next.js", "React", "App Router", "Server Components", "TypeScript", "Node.js", "PostgreSQL", "Vercel", "AWS", "Docker"],
    faqs: [
      { question: "Can they deploy on AWS or Docker?", answer: "Yes. Every Next.js feature is available there, so Vercel is a choice and not a requirement." },
      { question: "Do they write TypeScript?", answer: "Yes. TypeScript is on our placement stack list." },
      { question: "What can I learn in 3 days?", answer: "Enough to judge working habits, code quality and collaboration, though not architecture." },
    ],
  },
  {
    slug: "ai",
    name: "AI and ML engineers",
    headline: "Hire senior AI and ML engineers from $1,800 a month",
    subheadline: "LLM features, agents and NLP pipelines, built by engineers who have shipped them.",
    intro:
      "Senior AI engineers from Bengaluru on month-to-month contracts. Every candidate passes a real coding assessment and a live technical interview before reaching your shortlist.",
    from: "$1,800",
    stack: ["Python", "LLMs", "LLM agents", "PyTorch", "Transformers", "NLP", "Speech-to-text", "Kafka", "PostgreSQL", "Next.js", "AWS"],
    faqs: [
      { question: "Who owns the code and prompts?", answer: "Intellectual property in bespoke deliverables transfers to you on full payment." },
      { question: "Which models and providers?", answer: "Yours to choose. Our engineers work with major providers and open-weight models, and keep the model behind an interface so you can switch." },
      { question: "Do you hold security certifications?", answer: "SOC 2 is planned for June 2027 and ISO 27001 for December 2027. GDPR readiness is in place today." },
    ],
  },
  {
    slug: "india",
    name: "Developers in India",
    headline: "Hire dedicated developers in India, from $1,500 a month",
    subheadline: "A 35+ engineer team in Bengaluru, matched to your hours.",
    intro:
      "Dedicated developers placed full time on your team. No upfront cost, month-to-month terms, and a shortlist in about 48 hours.",
    from: "$1,500",
    stack: ["React", "Node.js", "TypeScript", "Python", "Go", "React Native", "Django", "AWS", "GCP", "Swift", "Kotlin"],
    faqs: [
      { question: "How fast can someone start?", answer: "Usually about a week after you choose them." },
      { question: "Will they work only on my project?", answer: "Yes. Each developer is placed full time and dedicated to your team." },
      { question: "What if the fit is wrong?", answer: "In the first 3 days you stop and pay nothing. After that, the replacement guarantee applies." },
    ],
  },
  {
    slug: "staff-augmentation",
    name: "Staff augmentation",
    headline: "IT staff augmentation from $1,500 per developer a month",
    subheadline: "Add contract developers to a team you already manage.",
    intro:
      "You direct the work and we employ the developer. Full-time senior engineers, month to month, with a 3-day risk-free trial.",
    from: "$1,500",
    stack: ["React", "Node.js", "TypeScript", "Python", "Go", "React Native", "Next.js", "Django", "PostgreSQL", "AWS", "Docker", "LLMs"],
    faqs: [
      { question: "How is this different from outsourcing?", answer: "With staff augmentation you manage the developers and we supply and employ them. With outsourcing you hand over a scope and the vendor answers for the result." },
      { question: "Who owns the code?", answer: "You do, on payment. Pre-existing Qilin Lab material is licensed to you in perpetuity." },
      { question: "Will we overlap in time zones?", answer: "Developers are matched to your working hours, and the exact windows are confirmed in the contract." },
    ],
  },
];

export function findHireRole(slug: string) {
  return hireRoles.find((role) => role.slug === slug);
}
