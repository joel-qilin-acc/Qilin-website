import { capacityFor, utilizationFor, type FixId } from "./model";
import { layoutFor, type Layout } from "./layout";
import { advanceParticle, createParticle, type Particle } from "./particles";

// One drawn particle stands for 200 requests per second.
const requestsPerParticle = 200;
const maxQueue = 26;
const maxParticles = 420;

export class LoadSimulation {
  width = 0;
  height = 0;
  layout: Layout = layoutFor(1, 1);
  particles: Particle[] = [];
  queue = 0;
  fixes: FixId[] = [];
  rps = 10000;
  utilization = 0;
  serverGlow = 0;
  alarmPhase = 0;
  spawnCarry = 0;
  serviceCarry = 0;

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.layout = layoutFor(width, height);
    this.particles = [];
    this.queue = 0;
    this.utilization = utilizationFor(this.fixes, this.rps);
  }

  setInputs(fixes: FixId[], rps: number) {
    this.fixes = fixes;
    this.rps = rps;
  }

  settle(seconds: number) {
    const frames = Math.round(seconds * 60);
    for (let frame = 0; frame < frames; frame += 1) this.step(1 / 60);
  }

  step(dt: number) {
    this.spawnIncoming(dt);
    this.serveQueue(dt);
    this.moveParticles(dt);
    const ease = 1 - Math.exp(-dt * 4);
    this.utilization += (utilizationFor(this.fixes, this.rps) - this.utilization) * ease;
    this.serverGlow = Math.max(0, this.serverGlow - dt * 4);
    this.alarmPhase += dt;
  }

  private spawnIncoming(dt: number) {
    this.spawnCarry += (this.rps / requestsPerParticle) * dt;
    const { sourceX, centerY, gateX } = this.layout;
    while (this.spawnCarry >= 1 && this.particles.length < maxParticles) {
      this.spawnCarry -= 1;
      const jitter = (Math.random() - 0.5) * this.height * 0.26;
      const from = { x: sourceX, y: centerY + jitter };
      this.particles.push(createParticle("incoming", from, { x: gateX, y: centerY + jitter * 0.2 }, 0.9));
    }
  }

  private serveQueue(dt: number) {
    const serviceRate = capacityFor(this.fixes) / requestsPerParticle;
    this.serviceCarry = Math.min(this.serviceCarry + serviceRate * dt, 2);
    while (this.serviceCarry >= 1 && this.queue > 0) {
      this.serviceCarry -= 1;
      this.queue -= 1;
      const from = { x: this.layout.gateX, y: this.layout.centerY };
      const to = { x: this.layout.serverX, y: this.layout.centerY };
      this.particles.push(createParticle("served", from, to, 0.4));
    }
  }

  private moveParticles(dt: number) {
    const alive: Particle[] = [];
    for (const particle of this.particles) {
      const done = advanceParticle(particle, dt);
      if (!done) alive.push(particle);
      else if (particle.kind === "incoming") this.arriveAtGate(particle, alive);
      else if (particle.kind === "served") this.serverGlow = 1;
    }
    this.particles = alive;
  }

  private arriveAtGate(particle: Particle, alive: Particle[]) {
    if (this.queue < maxQueue) {
      this.queue += 1;
      return;
    }
    const from = { x: particle.x, y: particle.y };
    alive.push(createParticle("dropped", from, { x: from.x - 10, y: from.y + 46 }, 0.6));
  }
}
