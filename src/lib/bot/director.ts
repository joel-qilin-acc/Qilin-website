import { gsap, ScrollTrigger } from "@/lib/gsap";
import { currentDemo, demoChannel } from "./bus";
import { createCues } from "./cues";
import { createTransform } from "./transform";
import { createPose, type DirectorContext } from "./types";

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function center(element: HTMLElement | null) {
  if (!element) return null;
  const box = element.getBoundingClientRect();
  return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
}

export type DirectorOptions = {
  isMobile: () => boolean;
  chip: HTMLElement | null;
};

export function createDirector({ isMobile, chip }: DirectorOptions) {
  const context: DirectorContext = {
    pose: createPose(),
    dock: { x: window.innerWidth - 80, y: window.innerHeight * 0.6 },
    state: { mix: 0, face: 0, spin: 0 },
    sizes: () => (isMobile() ? { hero: 50, dock: 15, inset: 42 } : { hero: 86, dock: 30, inset: 80 }),
  };
  const { pose, dock, state, sizes } = context;
  const look = { x: 0 };
  const anchor = document.querySelector<HTMLElement>('[data-bot-anchor="hero"]');
  const server = document.querySelector<HTMLElement>("[data-bot-server]");
  const cues = createCues(context);
  const transform = createTransform(context, cues.applyDemo);

  function placeChip() {
    if (!chip) return;
    const direction = pose.x < window.innerWidth / 2 ? 1 : -1;
    const dockedX = direction * (pose.radius * 1.15 + 26) - 22;
    const dockedY = -(pose.radius * 1.25 + 14) - 22;
    const heroX = -(pose.radius + 40);
    const heroY = -pose.radius * 0.3 - 22;
    const dx = lerp(heroX, dockedX, state.mix);
    const dy = lerp(heroY, dockedY, state.mix);
    chip.style.transform = `translate3d(${pose.x + dx}px, ${pose.y + dy}px, 0)`;
  }

  function update() {
    const point = center(anchor) ?? dock;
    const serverPoint = center(server);
    pose.x = lerp(point.x, dock.x, state.mix);
    pose.y = lerp(point.y, dock.y, state.mix);
    pose.radius = lerp(sizes().hero, sizes().dock, state.mix);
    pose.bob = lerp(7, 4, state.mix);
    pose.yaw = state.face * state.mix + state.spin + look.x * 0.45 * (1 - state.mix);
    pose.roll = state.mix * (1 - pose.drone) * 0.1;
    pose.beamLength = serverPoint ? Math.max(0, serverPoint.x - pose.x - pose.radius) : 0;
    placeChip();
    return pose;
  }

  const handlePointer = (event: PointerEvent) => {
    look.x = (event.clientX / window.innerWidth - 0.5) * 2;
  };
  const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-bot]")).map((section) =>
    ScrollTrigger.create({
      trigger: section,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => {
        if (self.isActive) cues.applyCue(section.dataset.bot, section);
      },
    }),
  );
  const hero = anchor?.closest("section");
  if (hero) {
    triggers.push(ScrollTrigger.create({ trigger: hero, start: "top+=90 top", onEnter: transform.toDrone, onLeaveBack: transform.toBot }));
  }
  window.addEventListener("pointermove", handlePointer, { passive: true });
  const unsubscribe = demoChannel.subscribe(cues.applyDemo);
  cues.applyDemo(currentDemo());

  function dispose() {
    unsubscribe();
    window.removeEventListener("pointermove", handlePointer);
    triggers.forEach((trigger) => trigger.kill());
    cues.dispose();
    gsap.killTweensOf([pose, dock, state]);
  }

  return { update, dispose };
}
