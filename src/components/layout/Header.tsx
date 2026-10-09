"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { logoSrc, navLinks } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { HeaderNav } from "./HeaderNav";
import { MobileMenu } from "./MobileMenu";
import { useHeaderReveal } from "./useHeaderReveal";

export function Header() {
  const barRef = useRef<HTMLElement>(null);
  useHeaderReveal(barRef);

  return (
    <header
      ref={barRef}
      className="fixed inset-x-0 top-0 z-[var(--z-header)]"
    >
      {/* The glass sits on its own layer: a blur on the header itself would trap the full-screen mobile menu inside the bar. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 border-b border-line bg-surface/95 md:bg-surface/90 md:backdrop-blur-xl"
      />
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Qilin Lab home">
          <Image
            src={logoSrc}
            alt="Qilin Lab"
            width={120}
            height={20}
            unoptimized
            priority
            className="brightness-0"
          />
        </Link>
        <HeaderNav />
        <div className="flex items-center gap-2">
          <Magnetic strength={0.15}>
            <ButtonLink
              href="/contact"
              className="neon-glow h-11 rounded-full px-5 text-sm font-semibold"
            >
              Book a call
            </ButtonLink>
          </Magnetic>
          <MobileMenu links={navLinks} />
        </div>
      </Container>
    </header>
  );
}
