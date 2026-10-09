import type { OpenRole, Product } from "@/types/content";

export const companyFacts = [
  { value: "35+", label: "engineers in house" },
  { value: "100+", label: "businesses served" },
  { value: "6", label: "countries shipped to" },
  { value: "5+", label: "years median client tenure" },
];

export const principles = [
  { title: "Ownership mentality", body: "We treat your product as our own, from architecture through production." },
  { title: "Technical excellence", body: "We stay current on cloud and security, and bring it to your problem." },
  { title: "Radical transparency", body: "Full visibility into code, decisions and costs." },
  { title: "Results over process", body: "We measure success in uptime, cost savings and throughput." },
];

export const compliance = [
  "GDPR ready",
  "DPDP 2023 compliant",
  "SOC 2 planned for June 2027",
  "ISO 27001 planned for December 2027",
];

export const openRoles: OpenRole[] = [
  { title: "Engineering", stack: "Full-stack, backend and frontend. Node, Next.js, Java, Python, Go, React Native." },
  { title: "DevOps and SRE", stack: "Kubernetes, Terraform, AWS and GCP." },
  { title: "Security", stack: "Penetration testing, code review and compliance (SOC 2, ISO 27001)." },
  { title: "Design", stack: "Product design, Figma and systems thinking." },
  { title: "Product", stack: "Discovery, specs and delivery management." },
  { title: "Business and sales", stack: "Consultative sales for technical founders." },
];

export const careerPerks = [
  "End-to-end ownership, from architecture to production",
  "Global client exposure across industries",
  "Faster learning from many different stacks",
  "Public credit through published case studies",
  "Flat decisions with no performative process",
  "Senior mentorship from day one",
];

export const products: Product[] = [
  {
    name: "CalenQ.ai",
    tagline: "AI-powered scheduling and calendar management.",
    description: "Helps teams coordinate meetings, manage availability and automate scheduling workflows.",
    features: ["Smart scheduling", "AI-powered coordination", "Team availability management", "Automated workflows"],
    href: "https://calenq.ai",
  },
  {
    name: "OnTime",
    tagline: "Time tracking built for businesses.",
    description: "Automates how teams log hours, how managers approve them and how clients get billed, so revenue stops leaking into spreadsheets.",
    features: ["Automated time tracking", "Client billing and invoicing", "Built for businesses", "Utilisation reports"],
    href: "https://ontime.qilinlab.com/",
  },
];

export const contact = {
  email: "hello@qilinlab.com",
  hiring: "hr@qilinlab.com",
  location: "Bengaluru, India",
  response: "within 24 hours",
};

export const serviceOptions = ["Free 30-minute savings analysis", "Free AWS cost review", "Development", "DevOps and cloud", "Scalability", "Security audits", "FinOps", "Hiring developers"];

export const budgetOptions = ["Under $5K", "$5K to $25K", "$25K to $100K", "$100K+", "Not sure yet"];

export const auditIncludes = [
  "Web application and API testing",
  "Cloud and infrastructure review",
  "A 15 to 25 page report, ranked by severity",
  "A 30-minute call with a senior engineer",
];

export const auditFacts = [
  { value: "$97", label: "one-off price" },
  { value: "7", label: "business days to your report" },
  { value: "100%", label: "refund if it does not help" },
  { value: "100+", label: "businesses audited" },
];
