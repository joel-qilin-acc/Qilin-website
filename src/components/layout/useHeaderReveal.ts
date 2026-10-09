import type { RefObject } from "react";
import { gsap, motionOk, ScrollTrigger, useGSAP } from "@/lib/gsap";

const hideAfter = 80;
const hoverEdge = 36;

// The bar sits at the top of the page. Once the visitor has scrolled on it steps out of the way,
// and comes back only when the pointer goes to the top edge (touch screens: when scrolling up).
export function useHeaderReveal(barRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motionOk, () => {
        const bar = barRef.current;
        if (!bar) return undefined;
        const touch = window.matchMedia("(hover: none)").matches;
        let shown = true;
        const show = (next: boolean) => {
          if (next === shown) return;
          shown = next;
          gsap.to(bar, {
            yPercent: next ? 0 : -100,
            autoAlpha: next ? 1 : 0,
            duration: 0.4,
            ease: "power3.out",
            // A leftover transform would also trap the full-screen mobile menu inside the bar.
            onComplete: () => {
              if (next) gsap.set(bar, { clearProps: "transform" });
            },
          });
        };
        const scrolled = () => window.scrollY > hideAfter;
        // The top 80px is the bar's home: leaving it hides the bar, coming back to it brings the bar back.
        const home = ScrollTrigger.create({
          start: 0,
          end: hideAfter,
          onLeave: () => !bar.matches(":hover") && show(false),
          onEnterBack: () => show(true),
        });
        const lift = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => touch && scrolled() && show(self.direction === -1),
        });
        const onMove = (event: PointerEvent) => {
          if (!scrolled() || event.pointerType === "touch") return;
          if (event.clientY <= hoverEdge) show(true);
          else if (!bar.matches(":hover") && !bar.matches(":focus-within"))
            show(false);
        };
        const onFocus = () => show(true);
        if (scrolled()) gsap.set(bar, { yPercent: -100, autoAlpha: 0 });
        shown = !scrolled();
        window.addEventListener("pointermove", onMove, { passive: true });
        bar.addEventListener("focusin", onFocus);
        return () => {
          home.kill();
          lift.kill();
          window.removeEventListener("pointermove", onMove);
          bar.removeEventListener("focusin", onFocus);
          gsap.set(bar, { clearProps: "transform,opacity,visibility" });
        };
      });
      return () => media.revert();
    },
    { scope: barRef },
  );
}
