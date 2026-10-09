import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types/content";

type MobileMenuLinksProps = {
  links: NavLink[];
  onNavigate: () => void;
};

// One column on the page margin: big rows to tap, and the main action pinned to the bottom within thumb reach.
export function MobileMenuLinks({ links, onNavigate }: MobileMenuLinksProps) {
  return (
    <>
      <nav aria-label="Mobile" className="flex flex-col">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            data-menu-item
            onClick={onNavigate}
            className="flex items-center justify-between border-b border-line py-5 text-[2.5rem] font-bold leading-none tracking-[-0.035em] active:text-accent"
          >
            {link.label}
            <ArrowUpRight aria-hidden size={26} className="text-muted" />
          </Link>
        ))}
      </nav>
      <Link
        href="/contact"
        data-menu-item
        onClick={onNavigate}
        className={cn(
          buttonStyles({}),
          "neon-glow mt-auto h-14 w-full justify-center rounded-full text-base font-semibold",
        )}
      >
        Book a call
        <ArrowRight aria-hidden size={18} weight="bold" />
      </Link>
    </>
  );
}
