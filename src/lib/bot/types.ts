export type BotIcon =
  | "warning"
  | "check"
  | "users"
  | "compass"
  | "trend"
  | "folder"
  | "medal"
  | "steps"
  | "chat"
  | "question"
  | "send";

export type BotExpression = "alert" | "happy" | "curious" | "proud";

export type BotSide = "left" | "right";

export type BotCue = {
  side: BotSide;
  expression: BotExpression;
  icon: BotIcon;
  y?: number;
};

export type BotPose = {
  x: number;
  y: number;
  radius: number;
  yaw: number;
  pitch: number;
  roll: number;
  drone: number;
  mood: number;
  power: number;
  squint: number;
  beam: number;
  beamLength: number;
  bob: number;
};

export type BotColors = {
  accent: string;
  bright: string;
  danger: string;
  ink: string;
  surface: string;
};

export function createPose(): BotPose {
  return {
    x: 0,
    y: 0,
    radius: 80,
    yaw: 0,
    pitch: 0,
    roll: 0,
    drone: 0,
    mood: 0,
    power: 0.3,
    squint: 0,
    beam: 0,
    beamLength: 0,
    bob: 6,
  };
}

export type DirectorState = {
  mix: number;
  face: number;
  spin: number;
};

export type Dock = {
  x: number;
  y: number;
};

export type DirectorContext = {
  pose: BotPose;
  dock: Dock;
  state: DirectorState;
  sizes: () => { hero: number; dock: number; inset: number };
};
