import { desktopMotion, gsap, motionOk, ScrollTrigger } from "@/lib/gsap";
import { createFixScene } from "./fix-line/fixScene";
import { createQuoteScene } from "./quote/quoteScene";

const pinLength = "+=140%";

// The hero is a short film that waits for the visitor: it starts in the broken state, and the fix plays after.
export function createHeroScene(root: HTMLElement) {
  const media = gsap.matchMedia();
  const reveal = () =>
    root
      .querySelectorAll("[data-reveal]")
      .forEach((item) => item.setAttribute("data-ready", "true"));

  // Both layouts drive the same two timelines.
  const build = (paused = false) => {
    const intro = gsap.timeline({ delay: 0.6, paused });
    const story = gsap.timeline({ defaults: { ease: "none" }, paused });
    const stopFix = createFixScene(root, intro, story);
    createQuoteScene(root, intro, story);
    reveal();
    return { intro, story, stopFix };
  };
  const clear = ({ intro, story, stopFix }: ReturnType<typeof build>) => {
    intro.kill();
    story.kill();
    stopFix();
  };

  // Desktop: scrolling is the remote control, so the page holds still while it fixes.
  media.add(desktopMotion, () => {
    const scene = build();
    const pin = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: pinLength,
      pin: true,
      anticipatePin: 1,
      scrub: 0.7,
      animation: scene.story,
    });
    return () => {
      pin.kill();
      clear(scene);
    };
  });

  // Phones: never hold the page. The fix plays on its own once the slow state has been seen,
  // so a quick flick past the hero is never blocked.
  media.add(`${motionOk} and (max-width: 1023px)`, () => {
    const scene = build();
    const play = gsap.to(scene.story, {
      progress: 1,
      duration: 3.2,
      delay: 3,
      ease: "none",
    });
    return () => {
      play.kill();
      clear(scene);
    };
  });

  // Reduced motion: no pinning, no story, only the fixed result.
  media.add("(prefers-reduced-motion: reduce)", () => {
    const scene = build(true);
    scene.intro.progress(1);
    scene.story.progress(1);
    return () => clear(scene);
  });

  return () => media.revert();
}
