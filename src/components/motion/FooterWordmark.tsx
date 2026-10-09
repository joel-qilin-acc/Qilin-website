"use client";

import { useRef } from "react";
import { gsap, motionOk, padMasks, SplitText, useGSAP } from "@/lib/gsap";
import { whenInView } from "@/lib/in-view";

// The lower end of the Q’s tail, as a band that follows the stroke (percent of the glyph box). The bowl keeps everything else.
const tailPoints = "65.7% 84.3%, 75.7% 77%, 98.6% 101.2%, 88.5% 108.5%";
// The moving piece is a touch wider than the hole it leaves, so no hairline shows where the two layers meet.
const tailClip = "polygon(65% 84.8%, 76.4% 76.4%, 99.3% 100.7%, 87.9% 109%)";
const bodyClip = `polygon(evenodd, 0 0, 110% 0, 110% 115%, 0 115%, 0 0, ${tailPoints}, 65.7% 84.3%, 0 0)`;

// Splits the "Q" into its bowl and its tail, then flicks the tail up a little once the wordmark is on screen.
function liftQTail(letter: HTMLElement | undefined) {
  if (!letter) return null;
  const glyph = letter.textContent ?? "Q";
  letter.style.position = "relative";
  letter.textContent = "";
  const bowl = document.createElement("span");
  const tail = document.createElement("span");
  bowl.textContent = glyph;
  tail.textContent = glyph;
  tail.setAttribute("aria-hidden", "true");
  bowl.style.clipPath = bodyClip;
  bowl.style.display = "inline-block";
  Object.assign(tail.style, {
    clipPath: tailClip,
    position: "absolute",
    left: "0",
    top: "0",
  });
  letter.append(bowl, tail);
  return gsap.to(tail, {
    xPercent: -3.3,
    yPercent: -3.5,
    duration: 0.9,
    delay: 1.4,
    ease: "back.out(2.4)",
    paused: true,
  });
}

export function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const media = gsap.matchMedia();

      // Sign-off: the wordmark comes up from the bottom when the footer is reached.
      media.add(motionOk, () => {
        const split = SplitText.create(element, {
          type: "chars",
          mask: "chars",
        });
        padMasks(split.chars, "0.3em", "0.12em");
        // The text slides up from below, letter by letter, the moment it is actually on screen.
        gsap.set(split.chars, { yPercent: 115 });
        const rise = gsap.to(split.chars, {
          yPercent: 0,
          duration: 1.5,
          ease: "expo.out",
          stagger: 0.07,
          paused: true,
        });
        const tail = liftQTail(split.chars[0] as HTMLElement | undefined);
        const stopWatching = whenInView(
          element,
          () => {
            rise.play();
            tail?.play();
          },
          // Never more than 40px: on a short phone the page ends before a bigger margin could ever be reached.
          `${Math.round(Math.min(window.innerHeight * 0.22, 40))}px`,
        );
        return () => {
          stopWatching();
          rise.kill();
          tail?.kill();
          split.revert();
        };
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <p
      ref={ref}
      aria-hidden
      className="select-none overflow-hidden pb-[0.2em] text-center text-[clamp(4rem,16.5vw,16rem)] font-semibold leading-[0.82] tracking-[-0.06em] text-ink"
    >
      Qilin Lab
    </p>
  );
}
