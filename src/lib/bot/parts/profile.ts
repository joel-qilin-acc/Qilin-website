import { Vector2 } from "three";

export const bodyHeight = 1.3;
const squareness = 2.6;

// The torso is a tall capsule: a superellipse that is narrower at the base than at the shoulders.
export function radiusAt(y: number) {
  const t = Math.min(1, Math.abs(y) / bodyHeight);
  const taper = y < 0 ? 1 - 0.22 * t * t : 1;
  return (1 - t ** squareness) ** (1 / squareness) * taper;
}

export function torsoProfile(steps = 48) {
  return Array.from({ length: steps + 1 }, (_, index) => {
    const y = -bodyHeight * Math.cos((Math.PI * index) / steps);
    return new Vector2(radiusAt(y), y);
  });
}

// A raised plate that follows the torso between two heights, with small walls so it reads as a real panel.
export function plateProfile(from: number, to: number, lift: number, steps = 10) {
  const points = [new Vector2(radiusAt(from), from)];
  for (let index = 0; index <= steps; index += 1) {
    const y = from + ((to - from) * index) / steps;
    points.push(new Vector2(radiusAt(y) + lift, y));
  }
  points.push(new Vector2(radiusAt(to), to));
  return points;
}
