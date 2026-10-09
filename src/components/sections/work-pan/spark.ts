// A decorative rising line for each card. It only suggests growth, the real numbers are printed next to it.
export function sparkPath(seed: number, width = 220, height = 56) {
  let state = seed * 9301 + 49297;
  const next = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
  const points = Array.from({ length: 12 }, (_, index) => {
    const x = (index / 11) * width;
    const trend = height * (0.78 - 0.62 * (index / 11));
    return [
      x,
      Math.min(height - 4, Math.max(4, trend + (next() - 0.5) * 14)),
    ] as const;
  });
  return points
    .map(
      ([x, y], index) =>
        `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`,
    )
    .join(" ");
}
