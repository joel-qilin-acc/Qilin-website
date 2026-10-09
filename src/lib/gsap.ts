"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const motionOk = "(prefers-reduced-motion: no-preference)";
export const desktopMotion = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

// SplitText masks clip to the line box, which cuts descenders (p, g, y, Q). Each mask gets room below, cancelled by a
// negative margin so the layout does not move.
export function padMasks(pieces: Element[], room = "0.22em") {
  pieces.forEach((piece) => {
    const mask = piece.parentElement;
    if (!mask) return;
    mask.style.paddingBottom = room;
    mask.style.marginBottom = `-${room}`;
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
