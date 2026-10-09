import { gsap, ScrollTrigger } from "@/lib/gsap";
import { afterShape, areaPath, beforeShape, lerp, linePath } from "./points";

const before = beforeShape();
const after = afterShape();

type Timeline = gsap.core.Timeline;

function readColors(root: HTMLElement) {
  const styles = getComputedStyle(root);
  return {
    bad: styles.getPropertyValue("--color-slow").trim() || "#ea7a0c",
    good: styles.getPropertyValue("--color-accent").trim() || "#1e40af",
  };
}

// The line is redrawn every frame from two shapes: the wobbling slow one and the calm fixed one.
function createDrawer(root: HTMLElement) {
  const colors = readColors(root);
  const line = root.querySelector<SVGPathElement>("[data-line]");
  const slowArea = root.querySelector<SVGPathElement>("[data-area-slow]");
  const fastArea = root.querySelector<SVGPathElement>("[data-area-fast]");
  const group = root.querySelector<SVGGElement>("[data-tint]");
  const color = gsap.utils.interpolate(colors.bad, colors.good);

  return (mix: number, time: number) => {
    const shake = 1 - mix;
    const heights = before.map((height, index) => {
      const wobble =
        (Math.sin(time * 3 + index * 0.9) * 0.014 +
          Math.sin(time * 7.3 + index * 2.1) * 0.009) *
        shake;
      return lerp(height, after[index], mix) + wobble;
    });
    line?.setAttribute("d", linePath(heights));
    const fill = areaPath(heights);
    slowArea?.setAttribute("d", fill);
    fastArea?.setAttribute("d", fill);
    slowArea?.setAttribute("opacity", String(1 - mix));
    fastArea?.setAttribute("opacity", String(mix));
    if (group) group.style.color = color(mix);
  };
}

const chipIn = { opacity: 0, y: 12, scale: 0.7 };
const chipShown = { opacity: 1, y: 0, scale: 1 };

// Intro plays by itself (the slow, failing state). The story is scrubbed by scroll (the fix).
export function createFixScene(
  root: HTMLElement,
  intro: Timeline,
  story: Timeline,
) {
  const draw = createDrawer(root);
  const state = { mix: 0, visible: true };
  const all = <T extends Element>(selector: string) =>
    gsap.utils.toArray<T>(selector, root);
  const clip = root.querySelector("[data-clip]");

  const frame = (seconds: number) => {
    if (!state.visible || document.hidden) return;
    draw(state.mix, seconds);
  };
  gsap.ticker.add(frame);
  const watcher = ScrollTrigger.create({
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      state.visible = self.isActive;
    },
  });

  gsap.set(all("[data-good], [data-cta]"), chipIn);
  intro
    .fromTo(
      clip,
      { attr: { width: 0 } },
      { attr: { width: 1500 }, duration: 1.5, ease: "power2.inOut" },
      0,
    )
    .fromTo(
      all("[data-bad]"),
      chipIn,
      { ...chipShown, duration: 0.55, stagger: 0.2, ease: "back.out(2.2)" },
      0.9,
    );

  const off = { immediateRender: false };
  story
    .fromTo(
      state,
      { mix: 0 },
      { mix: 1, duration: 2, ease: "power2.inOut", ...off },
      0,
    )
    .fromTo(
      all("[data-bad]"),
      chipShown,
      { opacity: 0, y: -12, scale: 0.8, duration: 0.5, stagger: 0.06, ...off },
      0,
    )
    .fromTo(
      all("[data-good]"),
      chipIn,
      {
        ...chipShown,
        duration: 0.5,
        stagger: 0.3,
        ease: "back.out(2)",
        ...off,
      },
      1.5,
    )
    .fromTo(
      all("[data-cta]"),
      chipIn,
      { ...chipShown, duration: 0.6, ease: "back.out(1.8)", ...off },
      2.5,
    )
    .fromTo(
      all("[data-hint]"),
      { opacity: 1 },
      { opacity: 0, duration: 0.3, ...off },
      0,
    );

  return () => {
    gsap.ticker.remove(frame);
    watcher.kill();
  };
}
