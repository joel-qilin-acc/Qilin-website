import type { NavLink } from "@/types/content";

export const navLinks: NavLink[] = [
  { label: "Work", href: "/case-studies" },
  { label: "Services", href: "/services" },
  { label: "Hire", href: "/hire-developers" },
  { label: "About", href: "/about" },
];

export const footerGroups: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Software development", href: "/services/development" },
      { label: "DevOps and cloud", href: "/services/devops" },
      { label: "Scalability", href: "/services/scalability" },
      { label: "Security audits", href: "/services/security" },
      { label: "FinOps", href: "/services/finops" },
    ],
  },
  {
    title: "Hire",
    links: [
      { label: "Hire developers", href: "/hire-developers" },
      { label: "Staff augmentation", href: "/hire-developers/staff-augmentation" },
      { label: "Security audit, $97", href: "/2026-audit" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Case studies", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "https://qilinlab.com/privacy" },
      { label: "Terms", href: "https://qilinlab.com/terms" },
      { label: "Cookies", href: "https://qilinlab.com/cookies" },
      { label: "GDPR", href: "https://qilinlab.com/gdpr" },
    ],
  },
];

export const logoSrc = "https://qilinlab.com/logo/logo_on_light.svg";
