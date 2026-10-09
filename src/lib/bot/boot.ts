import type { BotColors } from "./types";

export function hasWebGl() {
  const probe = document.createElement("canvas");
  const context = probe.getContext("webgl2") ?? probe.getContext("webgl");
  const supported = Boolean(context);
  (context as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")?.loseContext();
  return supported;
}

export function shouldUseStatic() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return reduce || Boolean(connection?.saveData) || !hasWebGl();
}

export function readColors(element: HTMLElement): BotColors {
  const styles = getComputedStyle(element);
  const read = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    accent: read("--color-accent", "#1e40af"),
    bright: read("--color-accent-bright", "#8eb0ff"),
    danger: read("--color-danger", "#d92d20"),
    ink: read("--color-ink", "#0b1220"),
    surface: read("--color-surface", "#ffffff"),
  };
}

function scheduleIdle(callback: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(callback, { timeout: 2500 });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = window.setTimeout(callback, 1500);
  return () => window.clearTimeout(handle);
}

// Runs the callback once the page has loaded and the browser is idle, so the bot never delays the first paint.
export function whenReady(callback: () => void) {
  if (document.readyState === "complete") return scheduleIdle(callback);
  let cancel = () => {};
  const handleLoad = () => {
    cancel = scheduleIdle(callback);
  };
  window.addEventListener("load", handleLoad, { once: true });
  return () => {
    window.removeEventListener("load", handleLoad);
    cancel();
  };
}
