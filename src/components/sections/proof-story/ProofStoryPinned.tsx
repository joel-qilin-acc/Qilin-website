"use client";

import { useRef } from "react";
import { proof } from "@/content/proof";
import { Container } from "@/components/ui/Container";
import { desktopMotion, gsap, useGSAP } from "@/lib/gsap";
import { ProofChart } from "./ProofChart";
import { ProofCopy } from "./ProofCopy";

const formatter = new Intl.NumberFormat("en-US");

export function ProofStoryPinned() {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const afterRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      // Storytelling: the number and the line move together, so before and after are felt, not stated.
      media.add(desktopMotion, () => {
        const counter = { value: proof.before };
        const showValue = () => {
          if (numberRef.current) numberRef.current.textContent = formatter.format(Math.round(counter.value / 10) * 10);
        };
        showValue();
        gsap.set(lineRef.current, { strokeDashoffset: 1 });
        gsap.set(afterRef.current, { opacity: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "+=110%", pin: true, scrub: 0.6 },
        });
        timeline
          .to(counter, { value: proof.after, ease: "power2.inOut", duration: 1, onUpdate: showValue }, 0)
          .to(lineRef.current, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0)
          .to(afterRef.current, { opacity: 1, duration: 0.25 }, 0.8);
      });
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="flex min-h-[100dvh] items-center py-20 lg:py-0">
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <ProofCopy />
        <ProofChart numberRef={numberRef} lineRef={lineRef} afterRef={afterRef} />
      </Container>
    </div>
  );
}
