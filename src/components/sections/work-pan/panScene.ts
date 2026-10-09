import { gsap } from "@/lib/gsap";

// The card closest to the focus line is the one that opens.
export function nearestCard(cards: HTMLElement[], focusX: number) {
  let best = 0;
  let distance = Number.POSITIVE_INFINITY;
  cards.forEach((card, index) => {
    const box = card.getBoundingClientRect();
    const gap = Math.abs(box.left + box.width / 2 - focusX);
    if (gap < distance) {
      distance = gap;
      best = index;
    }
  });
  return best;
}

type PanParts = {
  section: HTMLElement;
  track: HTMLElement;
  bar: HTMLElement | null;
  cards: HTMLElement[];
  onActive: (index: number) => void;
};

// The section is tall (see .work-pan-tall) and a one-screen panel sticks inside it. Scrolling pans the cards sideways
// and opens each as it reaches the focus line. Sticky and the height are pure CSS, so nothing moves after load.
export function createPanScene({
  section,
  track,
  bar,
  cards,
  onActive,
}: PanParts) {
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      invalidateOnRefresh: true,
      onUpdate: (self) =>
        onActive(
          nearestCard(cards, window.innerWidth * (0.28 + 0.44 * self.progress)),
        ),
    },
  });
  timeline
    .to(track, { x: () => -distance() }, 0)
    .fromTo(bar, { scaleX: 0 }, { scaleX: 1 }, 0);
  return () => {
    timeline.kill();
  };
}
