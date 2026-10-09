"use client";

import { useRef } from "react";
import { gsap, motionOk, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  selector?: string;
  delay?: number;
  y?: number;
  target?: boolean;
};

export function Reveal({ children, className, stagger = false, selector, delay = 0, y = 44, target = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const media = gsap.matchMedia();

      // Orientation: content arrives in reading order as the visitor reaches it.
      media.add(motionOk, () => {
        const targets = selector
          ? gsap.utils.toArray<HTMLElement>(selector, element)
          : stagger
            ? gsap.utils.toArray<HTMLElement>(element.children)
            : [element];
        element.setAttribute("data-ready", "true");
        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.11,
          delay,
          scrollTrigger: { trigger: element, start: "top 87%", once: true },
        });
      });
      media.add("(prefers-reduced-motion: reduce)", () => element.setAttribute("data-ready", "true"));
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-reveal data-bot-target={target ? "" : undefined} className={className}>
      {children}
    </div>
  );
}
