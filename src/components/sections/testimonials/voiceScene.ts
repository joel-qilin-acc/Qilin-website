import { ScrollTrigger } from "@/lib/gsap";

// The section is tall (see .voices-tall) and a one-screen panel sticks inside it while each voice opens in turn.
export function createVoiceScene(
  section: HTMLElement,
  count: number,
  onActive: (index: number) => void,
) {
  let current = 0;
  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    invalidateOnRefresh: true,
    onLeaveBack: () => {
      current = 0;
      onActive(0);
    },
    onUpdate: (self) => {
      const next = Math.min(count - 1, Math.floor(self.progress * count));
      if (next === current) return;
      current = next;
      onActive(next);
    },
  });
  return () => {
    trigger.kill();
  };
}
