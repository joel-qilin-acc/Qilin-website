"use client";

import { useRef, useState, type RefObject } from "react";
import { desktopMotion, gsap, useGSAP } from "@/lib/gsap";
import type { CaseStudy } from "@/types/content";
import { WorkCard } from "./WorkCard";
import { createPanScene, nearestCard } from "./panScene";

type WorkTrackProps = {
  cases: CaseStudy[];
};

// The thin neon line that fills as the cards pan.
function PanBar({ barRef }: { barRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div className="mx-auto mt-6 hidden h-px w-full max-w-[1152px] bg-line lg:block">
      <div
        ref={barRef}
        className="neon-bar h-full w-full origin-left scale-x-0 bg-neon-deep"
      />
    </div>
  );
}

export function WorkTrack({ cases }: WorkTrackProps) {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const scroller = scrollerRef.current;
      const track = trackRef.current;
      const section = wrap?.closest("section");
      if (!wrap || !scroller || !track || !section) return;
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-work-card]"),
      );
      const media = gsap.matchMedia();

      // Desktop: scrolling pans the cards sideways (see panScene).
      media.add(desktopMotion, () =>
        createPanScene({
          section,
          track,
          bar: barRef.current,
          cards,
          onActive: setActive,
        }),
      );

      // Phones: the cards swipe sideways by hand and the centred one opens.
      media.add("(max-width: 1023px)", () => {
        const handleScroll = () =>
          setActive(nearestCard(cards, window.innerWidth / 2));
        scroller.addEventListener("scroll", handleScroll, { passive: true });
        return () => scroller.removeEventListener("scroll", handleScroll);
      });
      return () => media.revert();
    },
    { scope: wrapRef },
  );

  return (
    <div
      ref={wrapRef}
      className="mt-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col"
    >
      <div
        ref={scrollerRef}
        className="snap-x overflow-x-auto pb-4 [scrollbar-width:none] lg:min-h-[420px] lg:flex-1 lg:overflow-visible lg:pb-0"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-4 ps-6 pe-6 lg:h-full lg:ps-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))] lg:pe-[10vw]"
        >
          {cases.map((study, index) => (
            <WorkCard
              key={study.slug}
              study={study}
              index={index}
              open={index === active}
              onToggle={() => setActive(index === active ? -1 : index)}
            />
          ))}
        </div>
      </div>
      <PanBar barRef={barRef} />
    </div>
  );
}
