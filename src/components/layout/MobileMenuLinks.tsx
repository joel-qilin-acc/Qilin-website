import Link from "next/link";
import type { NavLink } from "@/types/content";

type MobileMenuLinksProps = {
  links: NavLink[];
  onNavigate: () => void;
};

export function MobileMenuLinks({ links, onNavigate }: MobileMenuLinksProps) {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          data-menu-item
          onClick={onNavigate}
          className="text-5xl font-bold tracking-[-0.035em]"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/contact"
        data-menu-item
        onClick={onNavigate}
        className="mt-6 text-lg font-medium text-accent underline underline-offset-[6px]"
      >
        Book a call
      </Link>
    </>
  );
}
