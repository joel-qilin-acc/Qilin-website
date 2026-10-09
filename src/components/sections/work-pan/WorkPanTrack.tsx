"use client";

import { useRef } from "react";
import { desktopMotion, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type WorkPanTrackProps = {
  children: React.ReactNode;
};

export function WorkPanTrack({ children }: WorkPanTrackProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      const section = wrap?.closest("section");
      if (!wrap || !track || !section) return;
      const media = gsap.matchMedia();

      // Storytelling: vertical scroll becomes a horizontal tour of the work, one result at a time.
      media.add(desktopMotion, () => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        timeline.to(track, { x: () => -distance() }, 0).fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1 }, 0);

        const refresh = () => ScrollTrigger.refresh();
        const observer = new ResizeObserver(refresh);
        observer.observe(track);
        document.fonts.ready.then(refresh);
        return () => observer.disconnect();
      });
      return () => media.revert();
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className="mt-12">
      <div className="overflow-x-auto pb-4 [scrollbar-width:none] lg:overflow-visible lg:pb-0">
        <div
          ref={trackRef}
          className="flex w-max snap-x gap-5 ps-6 pe-6 lg:ps-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))] lg:pe-[10vw]"
        >
          {children}
        </div>
      </div>
      <div className="mx-auto mt-10 hidden h-px w-full max-w-[1152px] bg-line lg:block">
        <div ref={barRef} className="h-full w-full origin-left bg-ink" />
      </div>
    </div>
  );
}
