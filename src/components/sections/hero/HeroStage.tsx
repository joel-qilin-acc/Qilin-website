"use client";

import { useRef } from "react";
import { gsap, motionOk, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { createFixScene } from "./fix-line/fixScene";
import { createQuoteScene } from "./quote/quoteScene";

type HeroStageProps = {
  children: React.ReactNode;
};

const pinLength = "+=140%";

// The hero is a short film that waits for the visitor: it starts in the broken state, and scrolling fixes it.
export function HeroStage({ children }: HeroStageProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const media = gsap.matchMedia();
      const reveal = () =>
        root
          .querySelectorAll("[data-reveal]")
          .forEach((item) => item.setAttribute("data-ready", "true"));

      media.add(motionOk, () => {
        const intro = gsap.timeline({ delay: 0.6 });
        const story = gsap.timeline({ defaults: { ease: "none" } });
        const stopFix = createFixScene(root, intro, story);
        createQuoteScene(root, intro, story);
        reveal();
        const pin = ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: pinLength,
          pin: true,
          scrub: 0.7,
          animation: story,
        });
        return () => {
          pin.kill();
          intro.kill();
          story.kill();
          stopFix();
        };
      });

      // Reduced motion: no pinning, no story, only the fixed result.
      media.add("(prefers-reduced-motion: reduce)", () => {
        const intro = gsap.timeline({ paused: true });
        const story = gsap.timeline({ paused: true });
        const stopFix = createFixScene(root, intro, story);
        createQuoteScene(root, intro, story);
        intro.progress(1);
        story.progress(1);
        reveal();
        return stopFix;
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100dvh] overflow-x-clip pb-[clamp(220px,32vh,320px)] pt-28 lg:pt-28"
    >
      {children}
    </section>
  );
}
