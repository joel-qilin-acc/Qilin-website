"use client";

import { useRef, useState } from "react";
import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TestimonialPanel } from "./TestimonialPanel";

const scrollPerPanel = 55;

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;
      const media = gsap.matchMedia();

      // Storytelling: the section holds still while each voice opens in turn, so every client gets its moment.
      media.add("(prefers-reduced-motion: no-preference)", () => {
        let current = 0;
        const trigger = ScrollTrigger.create({
          trigger: stage,
          // Phones are shorter than the stage plus the header, so they pin from just under it instead of the centre.
          start: () =>
            stage.offsetHeight < window.innerHeight - 160
              ? "center center"
              : "top 96px",
          invalidateOnRefresh: true,
          end: `+=${testimonials.length * scrollPerPanel}%`,
          pin: true,
          onLeaveBack: () => {
            current = 0;
            setActiveIndex(0);
          },
          onUpdate: (self) => {
            const next = Math.min(
              testimonials.length - 1,
              Math.floor(self.progress * testimonials.length),
            );
            if (next === current) return;
            current = next;
            setActiveIndex(next);
          },
        });
        return () => trigger.kill();
      });
      return () => media.revert();
    },
    { scope: stageRef },
  );

  return (
    <Section bot="testimonials">
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
    </Section>
  );
}
