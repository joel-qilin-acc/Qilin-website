"use client";

import { useRef } from "react";
import { gsap, motionOk, padMasks, SplitText, useGSAP } from "@/lib/gsap";

// The lower end of the Q’s tail, as a band that follows the stroke (percent of the glyph box). The bowl keeps everything else.
const tailPoints = "62.2% 88.9%, 71.9% 83.1%, 87.3% 108.9%, 77.6% 114.7%";
// The moving piece is a touch wider than the hole it leaves, so no hairline shows where the two layers meet.
const tailClip = "polygon(61.5% 89.3%, 72.6% 82.7%, 88% 108.5%, 76.9% 115.1%)";
const bodyClip = `polygon(evenodd, 0 0, 105% 0, 105% 115%, 0 115%, 0 0, ${tailPoints}, 62.2% 88.9%, 0 0)`;

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
  Object.assign(tail.style, { clipPath: tailClip, position: "absolute", left: "0", top: "0" });
  letter.append(bowl, tail);
  return gsap.to(tail, {
    xPercent: -3.2,
    yPercent: -5.4,
    duration: 0.9,
    delay: 0.4,
    ease: "back.out(2.4)",
    scrollTrigger: { trigger: letter, start: "top 80%", toggleActions: "play none none reverse" },
  });
}

export function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const media = gsap.matchMedia();

      // Sign-off: the wordmark assembles letter by letter as the visitor reaches the end of the page.
      media.add(motionOk, () => {
        const split = SplitText.create(element, { type: "chars", mask: "chars" });
        padMasks(split.chars, "0.3em");
        gsap.from(split.chars, {
          yPercent: 170,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: { trigger: element, start: "top 100%", end: "top 55%", scrub: true },
        });
        const tail = liftQTail(split.chars[0] as HTMLElement | undefined);
        return () => {
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
      className="select-none overflow-hidden pb-[0.14em] text-center text-[clamp(4.5rem,19.5vw,18rem)] font-semibold leading-[0.82] tracking-[-0.06em] text-ink"
    >
      Qilin Lab
    </p>
  );
}
