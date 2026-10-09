import { gsap } from "@/lib/gsap";
import { botCues } from "@/content/bot-cues";
import { iconChannel, type DemoState } from "./bus";
import type { BotCue, BotExpression, BotPose, DirectorContext } from "./types";

const expressions: Record<BotExpression, Pick<BotPose, "mood" | "power" | "squint">> = {
  alert: { mood: 0, power: 0.3, squint: 0 },
  happy: { mood: 1, power: 1, squint: 1 },
  curious: { mood: 1, power: 1, squint: 0 },
  proud: { mood: 1, power: 1, squint: 0.6 },
};

export function createCues({ pose, dock, state, sizes }: DirectorContext) {
  const pulseTimers: number[] = [];

  function setExpression(expression: BotExpression, duration = 0.6) {
    gsap.to(pose, { ...expressions[expression], duration, ease: "power2.out", overwrite: "auto" });
  }

  function dockFor(side: BotCue["side"], yFraction: number) {
    const { inset } = sizes();
    return { x: side === "left" ? inset : window.innerWidth - inset, y: window.innerHeight * yFraction };
  }

  // Hero: the bot is at the centre of the scene and shows the difference with its eyes, body and a beam.
  function applyDemo(demo: DemoState) {
    if (state.mix > 0.5) return;
    const withQilin = demo === "with";
    setExpression(withQilin ? "happy" : "alert");
    gsap.to(pose, { beam: withQilin ? 1 : 0, pitch: withQilin ? -0.08 : 0.12, duration: 0.7, ease: "power2.out" });
    iconChannel.emit(withQilin ? "check" : "warning");
  }

  function pulseTargets(section: HTMLElement) {
    section.querySelectorAll<HTMLElement>("[data-bot-target]").forEach((target) => {
      target.classList.add("bot-pulse");
      pulseTimers.push(window.setTimeout(() => target.classList.remove("bot-pulse"), 1900));
    });
  }

  // Other sections: the bot flies to a side, turns toward the content, changes expression and points at it.
  function applyCue(key: string | undefined, section: HTMLElement) {
    const cue = key ? botCues[key] : undefined;
    if (!cue || state.mix < 0.5) return;
    gsap.to(dock, { ...dockFor(cue.side, cue.y ?? 0.62), duration: 1.1, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(state, { face: cue.side === "left" ? 0.7 : -0.7, duration: 0.9, ease: "power2.out" });
    setExpression(cue.expression);
    iconChannel.emit(cue.icon);
    pulseTargets(section);
  }

  function dispose() {
    pulseTimers.forEach((timer) => window.clearTimeout(timer));
  }

  return { applyDemo, applyCue, dispose };
}
