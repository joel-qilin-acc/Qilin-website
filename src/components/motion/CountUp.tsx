"use client";

import { useRef } from "react";
import { gsap, motionOk, useGSAP } from "@/lib/gsap";

type CountUpProps = {
  value: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

function format(value: number, decimals: number) {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function CountUp({ value, from = 0, decimals = 0, prefix = "", suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const media = gsap.matchMedia();

      // Emphasis: a measured number counts up once, so the result lands as an event.
      media.add(motionOk, () => {
        const counter = { current: from };
        const write = () => {
          element.textContent = `${prefix}${format(counter.current, decimals)}${suffix}`;
        };
        write();
        gsap.to(counter, {
          current: value,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: write,
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
