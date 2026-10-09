"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const motionOk = "(prefers-reduced-motion: no-preference)";
export const desktopMotion = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

// SplitText masks clip to the line box, which cuts descenders (p, g, y, Q) and glyphs that overhang under tight letter
// spacing. Each mask gets room below and to the sides, cancelled by negative margins so the layout does not move.
export function padMasks(pieces: Element[], room = "0.22em", side = "0em") {
  pieces.forEach((piece) => {
    const mask = piece.parentElement;
    if (!mask) return;
    mask.style.paddingBottom = room;
    mask.style.marginBottom = `-${room}`;
    mask.style.paddingInline = side;
    mask.style.marginInline = `-${side}`;
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
