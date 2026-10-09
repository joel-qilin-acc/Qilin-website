"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type MagneticProps = {
  children: React.ReactNode;
  strength?: number;
};

export function Magnetic({ children, strength = 0.22 }: MagneticProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = wrapperRef.current;
      if (!element) return;

      const media = gsap.matchMedia();
      // Feedback: tells the visitor this is the action. Fine pointers only.
      media.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const moveX = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
        const moveY = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

        const handleMove = (event: PointerEvent) => {
          const box = element.getBoundingClientRect();
          moveX((event.clientX - (box.left + box.width / 2)) * strength);
          moveY((event.clientY - (box.top + box.height / 2)) * strength);
        };
        const handleLeave = () => {
          moveX(0);
          moveY(0);
        };

        element.addEventListener("pointermove", handleMove);
        element.addEventListener("pointerleave", handleLeave);
        return () => {
          element.removeEventListener("pointermove", handleMove);
          element.removeEventListener("pointerleave", handleLeave);
        };
      });

      return () => media.revert();
    },
    { scope: wrapperRef },
  );

  return (
    <span ref={wrapperRef} className="inline-block">
      {children}
    </span>
  );
}
