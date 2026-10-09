"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, motionOk, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { logoSrc, navLinks } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const barRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      // Hierarchy: frees the screen while reading, returns the moment the visitor scrolls up.
      media.add(motionOk, () => {
        let hidden = false;
        const trigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const shouldHide = self.direction === 1 && self.scroll() > 240;
            if (shouldHide === hidden) return;
            hidden = shouldHide;
            gsap.to(barRef.current, { yPercent: hidden ? -140 : 0, duration: 0.45, ease: "power3.out" });
          },
        });
        return () => trigger.kill();
      });
      return () => media.revert();
    },
    { scope: barRef },
  );

  return (
    <header
      ref={barRef}
      className="fixed inset-x-4 top-4 z-[var(--z-header)] mx-auto max-w-[1200px] rounded-base border border-line bg-surface/85 shadow-[0_8px_30px_-12px_rgba(15,18,24,0.18)] backdrop-blur-md"
    >
      <div className="flex h-16 items-center justify-between gap-4 px-5">
        <Link href="/" aria-label="Qilin Lab home">
          <Image src={logoSrc} alt="Qilin Lab" width={120} height={20} unoptimized priority className="brightness-0" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-[15px] text-muted transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Magnetic strength={0.15}>
            <ButtonLink href="#book" className="h-10 px-4 text-sm">
              Book a call
            </ButtonLink>
          </Magnetic>
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </header>
  );
}
