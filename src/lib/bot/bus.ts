import type { BotIcon } from "./types";

export type DemoState = "without" | "with";

type Listener<T> = (value: T) => void;

function createChannel<T>() {
  const listeners = new Set<Listener<T>>();
  return {
    emit(value: T) {
      listeners.forEach((listener) => listener(value));
    },
    subscribe(listener: Listener<T>) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

// A tiny event bus: the hero demo tells the bot which state it is in, and the bot tells the UI which icon to show.
export const demoChannel = createChannel<DemoState>();
export const iconChannel = createChannel<BotIcon | null>();

let lastDemo: DemoState = "without";

export function announceDemo(state: DemoState) {
  lastDemo = state;
  demoChannel.emit(state);
}

export function currentDemo() {
  return lastDemo;
}
