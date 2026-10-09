"use client";

import { useRef } from "react";
import { gsap, motionOk, useGSAP } from "@/lib/gsap";

export function Trace() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const parent = rootRef.current?.parentElement;
      if (!parent || !progressRef.current || !headRef.current) return;
      parent.setAttribute("data-has-trace", "true");
      const media = gsap.matchMedia();
      const scrollTrigger = { trigger: parent, start: "top top", end: "bottom bottom", scrub: 0.4, invalidateOnRefresh: true };

      // Storytelling: the trace and its head travel with the visitor and end at the call to action.
      media.add(motionOk, () => {
        gsap.fromTo(progressRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger });
        gsap.fromTo(
          headRef.current,
          { y: 0 },
          { y: () => parent.offsetHeight - 12, ease: "none", scrollTrigger },
        );
      });
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(progressRef.current, { scaleY: 0 });
        gsap.set(headRef.current, { autoAlpha: 0 });
      });
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-5 z-10 hidden w-px bg-line xl:block"
    >
      <div ref={progressRef} className="h-full w-full origin-top bg-accent" />
      <span
        ref={headRef}
        className="absolute -left-[5px] top-0 size-[11px] rounded-full bg-accent ring-4 ring-accent/20"
      />
    </div>
  );
}
