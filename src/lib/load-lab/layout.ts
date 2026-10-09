export type Layout = {
  sourceX: number;
  centerY: number;
  gateX: number;
  serverX: number;
  serverWidth: number;
  serverHeight: number;
};

export function layoutFor(width: number, height: number): Layout {
  return {
    sourceX: width * 0.08,
    centerY: height * 0.42,
    gateX: width * 0.4,
    serverX: width * 0.7,
    serverWidth: Math.min(96, width * 0.17),
    serverHeight: Math.min(height * 0.5, 320),
  };
}
