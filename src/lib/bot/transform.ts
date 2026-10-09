import { gsap } from "@/lib/gsap";
import { currentDemo, iconChannel, type DemoState } from "./bus";
import type { DirectorContext } from "./types";

export function createTransform({ pose, state }: DirectorContext, applyDemo: (demo: DemoState) => void) {
  // Leaving the hero: the bot spins, folds out its rotors and becomes a drone that flies to the page edge.
  function toDrone() {
    gsap.to(state, { mix: 1, duration: 1.3, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(pose, { drone: 1, beam: 0, pitch: 0, duration: 1, delay: 0.15, ease: "back.out(1.5)", overwrite: "auto" });
    gsap.fromTo(state, { spin: 0 }, { spin: Math.PI * 2, duration: 1.3, ease: "power2.inOut" });
    iconChannel.emit(null);
  }

  // Back at the top: the rotors fold away and the bot returns to the centre of the scene.
  function toBot() {
    gsap.to(state, { mix: 0, face: 0, duration: 1.2, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(pose, { drone: 0, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
    gsap.to(state, { spin: 0, duration: 1, ease: "power2.inOut" });
    window.setTimeout(() => applyDemo(currentDemo()), 700);
  }

  return { toDrone, toBot };
}
