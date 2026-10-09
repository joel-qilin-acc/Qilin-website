"use client";

import { useRef } from "react";
import { gsap, motionOk, padMasks, SplitText, useGSAP } from "@/lib/gsap";
import { trackInView, whenInView } from "@/lib/in-view";

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

type Letters = ReturnType<typeof prepareLetters>;

// The letters wait below their masks; "rise" brings them up one after another.
function prepareLetters(element: HTMLElement, withTail: boolean) {
  const split = SplitText.create(element, { type: "chars", mask: "chars" });
  padMasks(split.chars, "0.3em", "0.12em");
  gsap.set(split.chars, { yPercent: 115 });
  const rise = gsap.to(split.chars, {
    yPercent: 0,
    duration: 1.5,
    ease: "expo.out",
    stagger: 0.07,
    paused: true,
  });
  const tail = withTail
    ? liftQTail(split.chars[0] as HTMLElement | undefined)
    : null;
  return { split, rise, tail };
}

function cleanUp({ split, rise, tail }: Letters) {
  rise.kill();
  tail?.kill();
  split.revert();
}

export function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const media = gsap.matchMedia();

      // Sign-off: the wordmark comes up from the bottom when the footer is reached.
      media.add(`${motionOk} and (min-width: 768px)`, () => {
        const letters = prepareLetters(element, true);
        const stopWatching = whenInView(
          element,
          () => {
            letters.rise.play();
            letters.tail?.play();
          },
          `${Math.round(Math.min(window.innerHeight * 0.22, 40))}px`,
        );
        return () => {
          stopWatching();
          cleanUp(letters);
        };
      });

      // Phones: the page ends right after the wordmark, so it floats up with the thumb instead of at a set moment.
      media.add(`${motionOk} and (max-width: 767px)`, () => {
        // No tail flick here: the split Q shows a seam at phone sizes, so the Q stays whole.
        const letters = prepareLetters(element, false);
        const stopTracking = trackInView(element, (ratio) => {
          gsap.to(letters.rise, {
            progress: ratio,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        });
        return () => {
          stopTracking();
          cleanUp(letters);
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
      className="select-none overflow-hidden pb-[0.2em] text-center text-[calc((100vw-2rem)/3.7)] font-semibold leading-[0.82] tracking-[-0.06em] text-ink md:text-[clamp(4rem,16.5vw,16rem)]"
    >
      Qilin Lab
    </p>
  );
}
