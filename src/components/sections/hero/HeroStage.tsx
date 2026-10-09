"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { createHeroScene } from "./heroScene";

type HeroStageProps = {
  children: React.ReactNode;
};

export function HeroStage({ children }: HeroStageProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (ref.current) return createHeroScene(ref.current);
      return undefined;
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100dvh] overflow-x-clip pb-[calc(clamp(220px,32vh,320px)+3rem)] pt-28 lg:pb-[clamp(220px,32vh,320px)]"
    >
      {children}
    </section>
  );
}
