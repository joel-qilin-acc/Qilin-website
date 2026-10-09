import type Lenis from "lenis";

// The page's smooth scroller, shared so buttons can scroll through it. A plain window.scrollTo would fight it.
let current: Lenis | null = null;

export const registerLenis = (instance: Lenis | null) => {
  current = instance;
};

export const getLenis = () => current;
