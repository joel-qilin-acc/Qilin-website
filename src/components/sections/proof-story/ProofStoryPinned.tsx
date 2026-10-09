"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { formatFull } from "@/lib/format";
import { proof } from "@/content/proof";
import {
  desktopMotion,
  gsap,
  motionOk,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap";
import { ProofChart } from "./ProofChart";
import { ProofCopy } from "./ProofCopy";

// The big number shows the figure for a given amount of progress, so it can be driven by any timeline or tween.
function numberWriter(number: HTMLElement) {
  const counter = { value: proof.before };
  const write = () => {
    number.textContent = formatFull(Math.round(counter.value / 10) * 10);
  };
  write();
  return { counter, write };
}

// Phones do not pin, so the number counts up once, as soon as the section is in view.
function countUp(trigger: HTMLElement, number: HTMLElement) {
  const { counter, write } = numberWriter(number);
  const watcher = ScrollTrigger.create({
    trigger,
    start: "top 65%",
    once: true,
    onEnter: () =>
      gsap.to(counter, {
        value: proof.after,
        duration: 2.6,
        ease: "power3.out",
        onUpdate: write,
      }),
  });
  return () => watcher.kill();
}

export function ProofStoryPinned() {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const afterRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      // Storytelling: the line draws itself up to the result as the visitor scrolls.
      media.add(desktopMotion, () => {
        const { counter, write } = numberWriter(
          numberRef.current as HTMLElement,
        );
        gsap.set(lineRef.current, { strokeDashoffset: 1 });
        gsap.set(afterRef.current, { opacity: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=110%",
            pin: true,
            anticipatePin: 1,
            scrub: 0.6,
          },
        });
        timeline
          .to(
            counter,
            {
              value: proof.after,
              ease: "power2.inOut",
              duration: 1,
              onUpdate: write,
            },
            0,
          )
          .to(
            lineRef.current,
            { strokeDashoffset: 0, ease: "none", duration: 1 },
            0,
          )
          .to(afterRef.current, { opacity: 1, duration: 0.25 }, 0.8);
      });
      media.add(`${motionOk} and (max-width: 1023px)`, () => {
        if (!rootRef.current || !numberRef.current) return undefined;
        return countUp(rootRef.current, numberRef.current);
      });
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="flex min-h-[100dvh] items-center py-20 lg:py-0"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <ProofCopy />
        <ProofChart
          numberRef={numberRef}
          lineRef={lineRef}
          afterRef={afterRef}
        />
      </Container>
    </div>
  );
}
