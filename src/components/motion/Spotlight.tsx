"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

export function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const media = gsap.matchMedia();

      // Affordance: a soft light follows the cursor, showing the tile is interactive.
      media.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const setX = gsap.quickSetter(element, "--mx", "px");
        const setY = gsap.quickSetter(element, "--my", "px");
        const handleMove = (event: PointerEvent) => {
          const box = element.getBoundingClientRect();
          setX(event.clientX - box.left);
          setY(event.clientY - box.top);
        };
        element.addEventListener("pointermove", handleMove);
        return () => element.removeEventListener("pointermove", handleMove);
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}
