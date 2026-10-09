// Large counts read better short: 20000 becomes "20k", 11500 becomes "11.5k". Below 10,000 the full number is shown.
export function formatCount(value: number) {
  if (Math.abs(value) < 10000) return Math.round(value).toLocaleString("en-US");
  const thousands = Math.round(value / 100) / 10;
  return `${thousands}k`;
}

// The full number with thousands separators: 20000 becomes "20,000".
export function formatFull(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

// A figure that keeps counting past what is shown: once the count reaches its goal it reads "20,000+".
export function formatReach(value: number, goal: number) {
  return `${formatFull(value)}${value >= goal ? "+" : ""}`;
}
