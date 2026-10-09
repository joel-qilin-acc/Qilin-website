import type { PathTileContent } from "@/types/content";

export const pathTiles: PathTileContent[] = [
  {
    id: "platform",
    label: "Platform",
    title: "Fix and run your software",
    body: "Faster, steadier software and lower cloud bills, for systems that cannot go down.",
    cta: { label: "Book a call", href: "/contact" },
  },
  {
    id: "audit",
    label: "Security audit",
    title: "Find the holes first",
    highlight: "$97",
    highlightNote: "fixed price",
    body: "Manual testing by senior engineers. Delivered in 7 business days, with a refund guarantee.",
    includes: [
      "Web app and API testing",
      "Cloud and infrastructure review",
      "A 15 to 25 page report, ranked by severity",
      "A 30-minute call with a senior engineer",
    ],
    cta: { label: "Get the audit", href: "/2026-audit" },
  },
  {
    id: "hire",
    label: "Hiring",
    title: "Add senior engineers",
    highlight: "$1,500",
    highlightNote: "a month, from",
    body: "Shortlist in about 48 hours. Month to month, and you pay only after the trial.",
    cta: { label: "Request developers", href: "/hire-developers" },
  },
];
