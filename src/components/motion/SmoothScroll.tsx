"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerLenis } from "@/lib/lenis";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Feel: inertial scrolling makes every scrubbed animation glide instead of stepping.
    const lenis = new Lenis({ anchors: true, lerp: 0.09 });
    registerLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Pinned sections measure the page; re-measure once fonts and images have settled.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    // Late images and layout shifts change the page height; pins computed earlier would then sit in the wrong place.
    let height = document.documentElement.scrollHeight;
    let timer = 0;
    const watcher = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const next = document.documentElement.scrollHeight;
        if (Math.abs(next - height) < 3) return;
        ScrollTrigger.refresh();
        height = document.documentElement.scrollHeight;
      }, 250);
    });
    watcher.observe(document.body);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
      watcher.disconnect();
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
