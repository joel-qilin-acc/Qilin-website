import { formatReach } from "@/lib/format";
import { gsap } from "@/lib/gsap";
import { heroQuote } from "@/content/hero-results";

type Timeline = gsap.core.Timeline;

const { stat } = heroQuote;
const off = { immediateRender: false };

// The quote performs the story: the "wait" half is struck out and the "delivered" half lights up as you scroll.
export function createQuoteScene(
  root: HTMLElement,
  intro: Timeline,
  story: Timeline,
) {
  const all = <T extends Element>(selector: string) =>
    gsap.utils.toArray<T>(selector, root);
  const number = root.querySelector<HTMLElement>("[data-stat]");
  const counter = { value: stat.from };
  const write = () => {
    if (number)
      number.textContent = formatReach(
        Math.round(counter.value / 10) * 10,
        stat.to,
      );
  };
  write();
  gsap.set(all("[data-before]"), {
    color: "#c25e0a",
    backgroundSize: "0% 2px",
  });
  gsap.set(all("[data-after]"), { opacity: 0.28, backgroundSize: "0% 38%" });
  gsap.set(all("[data-bar]"), { scaleX: stat.from / stat.to });

  intro
    .fromTo(
      all("[data-card]"),
      { y: 56, opacity: 0, rotateX: 8 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.1, ease: "power3.out" },
      0,
    )
    .fromTo(
      all("[data-line-in]"),
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
      0.5,
    )
    .fromTo(
      counter,
      { value: stat.from },
      { value: stat.to, duration: 2.6, ease: "power3.out", onUpdate: write },
      1,
    )
    .fromTo(
      all("[data-bar]"),
      { scaleX: stat.from / stat.to },
      { scaleX: 1, duration: 2.6, ease: "power3.out" },
      1,
    );

  story
    .fromTo(
      all("[data-before]"),
      { color: "#c25e0a", backgroundSize: "0% 2px" },
      { color: "#8a94a8", backgroundSize: "100% 2px", duration: 0.7, ...off },
      0.1,
    )
    .fromTo(
      all("[data-after]"),
      { opacity: 0.28, backgroundSize: "0% 38%" },
      { opacity: 1, backgroundSize: "100% 38%", duration: 1.1, ...off },
      0.5,
    );
}
