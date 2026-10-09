import type { BotCue } from "@/lib/bot/types";

// What the bot does when each section comes into view. It never speaks: it moves, changes expression and shows an icon.
export const botCues: Record<string, BotCue> = {
  logos: { side: "right", expression: "happy", icon: "users" },
  start: { side: "left", expression: "curious", icon: "compass" },
  proof: { side: "right", expression: "proud", icon: "trend", y: 0.5 },
  results: { side: "left", expression: "happy", icon: "folder", y: 0.8 },
  founder: { side: "right", expression: "curious", icon: "medal" },
  process: { side: "left", expression: "curious", icon: "steps" },
  testimonials: { side: "right", expression: "happy", icon: "chat" },
  faq: { side: "left", expression: "curious", icon: "question" },
  book: { side: "right", expression: "proud", icon: "send", y: 0.5 },
};
