import { ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

// 0 when a panel is closed, 1 when it is fully open. It stays fully open for a short stretch around its own
// position, then eases shut as the next panel opens, so the panels always add up to the same height.
const openness = (distance: number) =>
  Math.min(1, Math.max(0, (0.75 - distance) / 0.5));

// The section is tall (see .voices-tall) and a one-screen panel sticks inside it. Scrolling slides the opening from one
// voice to the next continuously: every panel's size follows the scroll position, with no timed steps to fight it.
export function createVoiceScene(
  section: HTMLElement,
  panels: HTMLElement[],
  onActive: (index: number) => void,
) {
  let current = 0;
  const last = panels.length - 1;
  const update = (progress: number) => {
    const position = progress * last;
    panels.forEach((panel, index) =>
      panel.style.setProperty("--a", String(openness(Math.abs(position - index)))),
    );
    const next = Math.round(position);
    if (next === current) return;
    current = next;
    onActive(next);
  };

  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    invalidateOnRefresh: true,
    onUpdate: (self) => update(self.progress),
    onRefresh: (self) => update(self.progress),
  });
  update(trigger.progress);

  // Choosing a panel means scrolling to where that panel is the open one.
  const scrollToPanel = (index: number) => {
    const top = trigger.start + (index / last) * (trigger.end - trigger.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top, { duration: 1.1 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  return {
    scrollToPanel,
    stop: () => {
      trigger.kill();
      panels.forEach((panel) => panel.style.removeProperty("--a"));
    },
  };
}
