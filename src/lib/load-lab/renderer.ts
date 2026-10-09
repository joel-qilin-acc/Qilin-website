import type { LoadSimulation } from "./simulation";
import type { Palette } from "./palette";
import { levelFor, statusLabels, type Level } from "./model";

const cellCount = 14;

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function levelColor(level: Level, palette: Palette) {
  if (level === "critical") return palette.danger;
  if (level === "warning") return palette.warn;
  return palette.accent;
}

function drawLanes(ctx: CanvasRenderingContext2D, sim: LoadSimulation, palette: Palette) {
  const { sourceX, centerY, serverX } = sim.layout;
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(sourceX, centerY);
  ctx.lineTo(serverX, centerY);
  ctx.stroke();
  ctx.fillStyle = palette.ink;
  ctx.beginPath();
  ctx.arc(sourceX, centerY, 9, 0, Math.PI * 2);
  ctx.fill();
}

function drawGate(ctx: CanvasRenderingContext2D, sim: LoadSimulation, palette: Palette) {
  const { gateX, centerY } = sim.layout;
  const height = sim.height * 0.3;
  ctx.fillStyle = palette.ink;
  roundedRect(ctx, gateX - 3, centerY - height / 2, 6, height, 3);
  ctx.fill();
  ctx.fillStyle = sim.queue > 18 ? palette.danger : palette.ink;
  ctx.globalAlpha = 0.6;
  for (let index = 0; index < sim.queue; index += 1) {
    ctx.beginPath();
    ctx.arc(gateX - 16 - (index % 6) * 7, centerY + (Math.floor(index / 6) - 2) * 7, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawServerCells(ctx: CanvasRenderingContext2D, sim: LoadSimulation, palette: Palette, color: string) {
  const { serverX, serverWidth, serverHeight, centerY } = sim.layout;
  const top = centerY - serverHeight / 2;
  const inner = serverHeight - 16;
  const cell = inner / cellCount;
  const lit = sim.utilization * cellCount;
  for (let index = 0; index < cellCount; index += 1) {
    const y = top + serverHeight - 8 - (index + 1) * cell + 2;
    const fill = Math.max(0, Math.min(1, lit - index));
    ctx.fillStyle = palette.line;
    roundedRect(ctx, serverX + 8, y, serverWidth - 16, cell - 4, 3);
    ctx.fill();
    if (fill <= 0) continue;
    ctx.globalAlpha = 0.35 + fill * 0.65;
    ctx.fillStyle = color;
    roundedRect(ctx, serverX + 8, y, serverWidth - 16, cell - 4, 3);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function drawServer(ctx: CanvasRenderingContext2D, sim: LoadSimulation, palette: Palette) {
  const { serverX, serverWidth, serverHeight, centerY } = sim.layout;
  const level = levelFor(sim.utilization);
  const color = levelColor(level, palette);
  const top = centerY - serverHeight / 2;

  if (level === "critical") {
    const pulse = 0.5 + 0.5 * Math.sin(sim.alarmPhase * 7);
    ctx.strokeStyle = palette.danger;
    ctx.globalAlpha = 0.18 + pulse * 0.32;
    ctx.lineWidth = 3;
    roundedRect(ctx, serverX - 7, top - 7, serverWidth + 14, serverHeight + 14, 18);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = palette.surface;
  ctx.strokeStyle = level === "critical" ? palette.danger : palette.line;
  ctx.lineWidth = 2;
  roundedRect(ctx, serverX, top, serverWidth, serverHeight, 12);
  ctx.fill();
  ctx.stroke();
  drawServerCells(ctx, sim, palette, color);
}

function drawParticles(ctx: CanvasRenderingContext2D, sim: LoadSimulation, palette: Palette) {
  for (const particle of sim.particles) {
    const dropped = particle.kind === "dropped";
    ctx.globalAlpha = dropped ? 0.5 * (1 - particle.age / particle.life) : 1;
    ctx.fillStyle = dropped ? palette.danger : palette.accent;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, dropped ? 2.4 : 2.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawLabels(ctx: CanvasRenderingContext2D, sim: LoadSimulation, palette: Palette) {
  const { sourceX, centerY, gateX, serverX, serverWidth, serverHeight } = sim.layout;
  const top = centerY - serverHeight / 2;
  const level = levelFor(sim.utilization);
  const center = serverX + serverWidth / 2;
  const statusSize = Math.max(17, Math.min(26, sim.width * 0.04));
  ctx.textAlign = "center";
  ctx.fillStyle = palette.muted;
  ctx.font = `500 12px ${palette.display}`;
  ctx.fillText("Visitors", Math.max(sourceX, 30), centerY + 30);
  ctx.fillText("Waiting line", gateX, centerY + sim.height * 0.15 + 20);
  ctx.fillText(`Your app, ${Math.round(sim.utilization * 100)}% busy`, center, top - statusSize - 14);
  ctx.fillStyle = levelColor(level, palette);
  ctx.font = `600 ${statusSize}px ${palette.display}`;
  ctx.fillText(statusLabels[level], center, top - 12);
}

export function drawScene(ctx: CanvasRenderingContext2D, sim: LoadSimulation, palette: Palette) {
  ctx.clearRect(0, 0, sim.width, sim.height);
  drawLanes(ctx, sim, palette);
  drawGate(ctx, sim, palette);
  drawServer(ctx, sim, palette);
  drawParticles(ctx, sim, palette);
  drawLabels(ctx, sim, palette);
}
