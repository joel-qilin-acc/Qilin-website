"use client";

import { useRef, useState } from "react";
import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { TestimonialPanel } from "./TestimonialPanel";
import { createVoiceScene } from "./voiceScene";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const section = stage?.closest("section");
      if (!stage || !section) return;
      const media = gsap.matchMedia();

      // Storytelling: each voice opens in turn while the panel holds still (see voiceScene).
      media.add("(prefers-reduced-motion: no-preference)", () =>
        createVoiceScene(section, testimonials.length, setActiveIndex),
      );
      return () => media.revert();
    },
    { scope: stageRef },
  );

  return (
    <Section
      bot="testimonials"
      spacing="none"
      className="voices-tall z-20 bg-surface"
      style={{ "--panels": testimonials.length } as React.CSSProperties}
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center py-16 md:py-20">
        <Container>
          <div ref={stageRef}>
            <Reveal
              stagger
              target
              className="flex flex-col gap-3 lg:h-[560px] lg:flex-row"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialPanel
                  key={testimonial.name}
                  testimonial={testimonial}
                  active={index === activeIndex}
                  onActivate={() => setActiveIndex(index)}
                />
              ))}
            </Reveal>
            <ol aria-hidden className="mt-5 flex justify-center gap-2">
              {testimonials.map((testimonial, index) => (
                <li
                  key={testimonial.name}
                  className={cn(
                    "h-1.5 rounded-full transition-[width,background-color] duration-500",
                    index === activeIndex ? "w-8 bg-ink" : "w-1.5 bg-line",
                  )}
                />
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </Section>
  );
}
