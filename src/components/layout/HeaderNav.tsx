import Link from "next/link";
import { navLinks } from "@/content/site";

export function HeaderNav() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="rounded-full px-4 py-2 text-[15px] font-medium text-ink/65 transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
