"use client";

import { useRef } from "react";
import { gsap, motionOk, useGSAP } from "@/lib/gsap";
import { whenInView } from "@/lib/in-view";

const blobs = [
  {
    className: "-left-[12%] -bottom-[38%] h-[95%] w-[62%]",
    color: "var(--color-neon)",
    opacity: 0.55,
    drift: 9,
  },
  {
    className: "-right-[14%] -bottom-[42%] h-[100%] w-[66%]",
    color: "var(--color-accent)",
    opacity: 0.42,
    drift: -7,
  },
  {
    className: "left-[22%] -bottom-[48%] h-[90%] w-[58%]",
    color: "var(--color-accent-bright)",
    opacity: 0.6,
    drift: 6,
  },
];

// A blue aurora that rises from the bottom edge when the footer comes into view, then keeps drifting slowly.
export function FooterAurora() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const footer = root?.closest("footer");
      if (!root || !footer) return;
      const media = gsap.matchMedia();

      media.add(motionOk, () => {
        // The colour comes up from the bottom edge at the same moment the text does.
        gsap.set(root, { yPercent: 100, opacity: 0 });
        const rise = gsap.to(root, {
          yPercent: 0,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          paused: true,
        });
        const stopWatching = whenInView(footer, () => rise.play(), "42%");
        gsap.utils
          .toArray<HTMLElement>("[data-blob]", root)
          .forEach((blob, index) => {
            gsap.to(blob, {
              xPercent: blobs[index].drift * 4,
              yPercent: -10 - index * 4,
              scale: 1.12,
              duration: 7 + index * 2.5,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });
        return stopWatching;
      });
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { opacity: 1, yPercent: 0 });
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] opacity-0"
    >
      {blobs.map((blob) => (
        <span
          key={blob.className}
          data-blob
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          style={{
            background: `radial-gradient(closest-side, color-mix(in srgb, ${blob.color} ${blob.opacity * 100}%, transparent), transparent)`,
          }}
        />
      ))}
    </div>
  );
}
