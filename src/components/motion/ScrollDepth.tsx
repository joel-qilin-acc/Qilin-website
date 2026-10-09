"use client";

import { useRef } from "react";
import { gsap, motionOk, useGSAP } from "@/lib/gsap";

type ScrollDepthProps = {
  children: React.ReactNode;
  className?: string;
  fromY?: number;
  toY?: number;
  toScale?: number;
  toOpacity?: number;
  start?: string;
  end?: string;
  useSection?: boolean;
};

export function ScrollDepth({
  children,
  className,
  fromY = 0,
  toY = 0,
  toScale = 1,
  toOpacity = 1,
  start = "top bottom",
  end = "bottom top",
  useSection = false,
}: ScrollDepthProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const media = gsap.matchMedia();

      // Depth: layers travel at different speeds, so the page reads as physical space.
      media.add(motionOk, () => {
        const trigger = useSection ? (element.closest("section") ?? element) : element;
        gsap.fromTo(
          element,
          { yPercent: fromY, scale: 1, opacity: 1 },
          {
            yPercent: toY,
            scale: toScale,
            opacity: toOpacity,
            ease: "none",
            scrollTrigger: { trigger, start, end, scrub: true },
          },
        );
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
