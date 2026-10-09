export type Offer = {
  id: string;
  tag: string;
  title: string;
  body: string;
  points: string[];
  cta: string;
  href: string;
};

// The two free entry points. Both turn a first click into a conversation without asking for anything up front.
export const offers: Offer[] = [
  {
    id: "savings-analysis",
    tag: "Free · 30 minutes",
    title: "Free 30-Minute Savings Analysis",
    body: "A senior engineer looks at how your system runs and shows you where money and speed are being lost.",
    points: [
      "No cloud account connection required",
      "An interactive demo, so you see it before you decide",
      "No credit card",
    ],
    cta: "Book my free analysis",
    href: "/contact",
  },
  {
    id: "aws-review",
    tag: "Free · AWS",
    title: "Free AWS cost review",
    body: "A review of how you use AWS, with the biggest savings pointed out in plain language.",
    points: ["No credit card", "No commitment to work with us"],
    cta: "Get my free review",
    href: "/contact",
  },
];
