"use client";

import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { getLenis } from "@/lib/lenis";

// Takes the visitor back to the top of the page. Smooth, unless they have asked their device for less motion.
export function BackToTop() {
  const goUp = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: reduced, duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goUp}
      className="group inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface/80 px-4 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent"
    >
      Back to top
      <ArrowUp
        aria-hidden
        size={16}
        weight="bold"
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
