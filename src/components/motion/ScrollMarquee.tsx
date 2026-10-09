"use client";

import { useRef } from "react";
import { gsap, motionOk, ScrollTrigger, useGSAP } from "@/lib/gsap";

type ScrollMarqueeProps = {
  children: React.ReactNode;
  speed?: number;
};

export function ScrollMarquee({ children, speed = 55 }: ScrollMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const root = rootRef.current;
      if (!track || !root) return;
      const media = gsap.matchMedia();

      // Feedback: the logo strip reacts to scroll speed and direction, so the page feels connected to the hand.
      media.add(motionOk, () => {
        const setX = gsap.quickSetter(track, "x", "px");
        let position = 0;
        let boost = 0;
        let direction = 1;
        let hovering = false;

        const trigger = ScrollTrigger.create({
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            if (Math.abs(velocity) > 40) direction = velocity > 0 ? 1 : -1;
            boost = Math.min(Math.abs(velocity) / 300, 6);
          },
        });
        const tick = (time: number, deltaMs: number) => {
          boost *= 0.94;
          if (hovering) return;
          const half = track.scrollWidth / 2;
          position -= (speed * (1 + boost) * direction * deltaMs) / 1000;
          if (position <= -half) position += half;
          if (position > 0) position -= half;
          setX(position);
        };
        const handleEnter = () => (hovering = true);
        const handleLeave = () => (hovering = false);

        gsap.ticker.add(tick);
        root.addEventListener("pointerenter", handleEnter);
        root.addEventListener("pointerleave", handleLeave);
        return () => {
          trigger.kill();
          gsap.ticker.remove(tick);
          root.removeEventListener("pointerenter", handleEnter);
          root.removeEventListener("pointerleave", handleLeave);
        };
      });
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] motion-reduce:[mask-image:none]"
    >
      <div ref={trackRef} className="flex w-max motion-reduce:w-auto motion-reduce:justify-center">
        <ul className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center">{children}</ul>
        <ul aria-hidden className="flex shrink-0 items-center motion-reduce:hidden">
          {children}
        </ul>
      </div>
    </div>
  );
}
