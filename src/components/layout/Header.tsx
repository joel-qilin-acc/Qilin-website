"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, motionOk, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { logoSrc, navLinks } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { HeaderNav } from "./HeaderNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const barRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

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
            if (progressRef.current)
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            const shouldHide = self.direction === 1 && self.scroll() > 240;
            if (shouldHide === hidden) return;
            hidden = shouldHide;
            gsap.to(barRef.current, {
              yPercent: hidden ? -160 : 0,
              autoAlpha: hidden ? 0 : 1,
              duration: 0.45,
              ease: "power3.out",
            });
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
      className="fixed inset-x-4 top-4 z-[var(--z-header)] mx-auto max-w-[1200px] rounded-full border border-white/70 bg-surface/80 shadow-[0_10px_40px_-14px_rgba(30,64,175,0.28),0_0_0_1px_rgba(11,18,32,0.06)] backdrop-blur-xl"
    >
      <div className="flex h-16 items-center justify-between gap-4 ps-6 pe-3">
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
              href="#book"
              className="neon-glow h-11 rounded-full px-5 text-sm font-semibold"
            >
              Book a call
            </ButtonLink>
          </Magnetic>
          <MobileMenu links={navLinks} />
        </div>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 bottom-0 h-px overflow-hidden"
      >
        <span
          ref={progressRef}
          className="block h-full origin-left scale-x-0 bg-gradient-to-r from-accent via-neon to-accent-bright shadow-[0_0_10px_var(--color-neon)]"
        />
      </span>
    </header>
  );
}
