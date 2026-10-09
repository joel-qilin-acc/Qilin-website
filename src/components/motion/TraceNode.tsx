"use client";

import { useRef } from "react";
import { gsap, motionOk, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function TraceNode() {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = nodeRef.current;
      const section = node?.parentElement;
      if (!node || !section) return;

      const media = gsap.matchMedia();
      // State change: a node lights as its section is reached, so the trace shows progress.
      media.add(motionOk, () => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          onEnter: () => node.setAttribute("data-active", "true"),
          onLeaveBack: () => node.setAttribute("data-active", "false"),
        });
        return () => trigger.kill();
      });

      return () => media.revert();
    },
    { scope: nodeRef },
  );

  return (
    <span
      ref={nodeRef}
      aria-hidden
      data-active="false"
      className="trace-node absolute left-[14px] top-14 z-10 size-3 rounded-full border-2 border-line bg-surface transition-[transform,background-color,border-color] duration-300 data-[active=true]:scale-125 data-[active=true]:border-accent data-[active=true]:bg-accent"
    />
  );
}
