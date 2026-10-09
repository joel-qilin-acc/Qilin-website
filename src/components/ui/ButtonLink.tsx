import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { buttonStyles } from "./buttonStyles";

type ButtonLinkProps = VariantProps<typeof buttonStyles> & {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ButtonLink({ href, variant, className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonStyles({ variant }), className)}>
      {children}
    </Link>
  );
}
