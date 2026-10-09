"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ProcessStep as ProcessStepContent } from "@/types/content";
import { ProcessStep } from "./ProcessStep";

type ProcessStepsProps = {
  steps: ProcessStepContent[];
};

const conditions = {
  isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
};

export function ProcessSteps({ steps }: ProcessStepsProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;
      const nodes = gsap.utils.toArray<HTMLElement>("[data-step-node]", list);
      const media = gsap.matchMedia();

      // Progress: the line fills as the visitor scrolls, so the order of the steps reads at a glance.
      media.add(conditions, (context) => {
        const isDesktop = Boolean(context.conditions?.isDesktop);
        const lastIndex = nodes.length - 1;
        gsap.set(progressRef.current, { scaleX: 1, scaleY: 1 });
        gsap.fromTo(
          progressRef.current,
          isDesktop ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(isDesktop ? { scaleX: 1 } : { scaleY: 1 }),
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: isDesktop ? "top 78%" : "top 60%",
              end: isDesktop ? "bottom 45%" : "bottom 60%",
              scrub: 0.4,
              onUpdate: (self) =>
                nodes.forEach((node, index) => {
                  const threshold = 0.05 + (index / lastIndex) * 0.85;
                  node.setAttribute("data-active", String(self.progress > threshold));
                }),
            },
          },
        );
        nodes.forEach((node) => node.setAttribute("data-active", "false"));
      });
      return () => media.revert();
    },
    { scope: listRef },
  );

  return (
    <div data-bot-target className="relative mt-16">
      <div
        aria-hidden
        className="absolute bottom-3 left-[15px] top-3 w-px bg-line md:inset-x-0 md:bottom-auto md:left-0 md:top-[7px] md:h-px md:w-full"
      >
        <div ref={progressRef} className="h-full w-full origin-top bg-accent md:origin-left" />
      </div>
      <ol ref={listRef} className="space-y-14 md:grid md:grid-cols-4 md:gap-10 md:space-y-0">
        {steps.map((step) => (
          <ProcessStep key={step.title} step={step} />
        ))}
      </ol>
    </div>
  );
}
