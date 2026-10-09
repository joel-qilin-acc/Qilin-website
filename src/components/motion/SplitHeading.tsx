"use client";

import { useRef } from "react";
import { gsap, motionOk, padMasks, SplitText, useGSAP } from "@/lib/gsap";

type SplitHeadingProps = {
  as?: "h1" | "h2" | "h3";
  trigger?: "load" | "scroll";
  className?: string;
  children: string;
};

export function SplitHeading({ as: Tag = "h2", trigger = "scroll", className, children }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const media = gsap.matchMedia();

      // Hierarchy: each line rises out of a mask, so the eye reads the headline in order.
      media.add(motionOk, () => {
        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            padMasks(self.lines);
            element.setAttribute("data-ready", "true");
            return gsap.from(self.lines, {
              yPercent: 140,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: trigger === "scroll" ? { trigger: element, start: "top 88%", once: true } : undefined,
            });
          },
        });
        return () => split.revert();
      });
      media.add("(prefers-reduced-motion: reduce)", () => element.setAttribute("data-ready", "true"));
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-split className={className}>
      {children}
    </Tag>
  );
}
