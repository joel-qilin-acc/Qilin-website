export type ParticleKind = "incoming" | "served" | "dropped";

export type Particle = {
  kind: ParticleKind;
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  age: number;
  life: number;
  worker: number;
};

export function createParticle(
  kind: ParticleKind,
  from: { x: number; y: number },
  to: { x: number; y: number },
  life: number,
  worker = 0,
): Particle {
  return {
    kind,
    x: from.x,
    y: from.y,
    startX: from.x,
    startY: from.y,
    targetX: to.x,
    targetY: to.y,
    age: 0,
    life,
    worker,
  };
}

export function advanceParticle(particle: Particle, dt: number) {
  particle.age += dt;
  const progress = Math.min(1, particle.age / particle.life);
  particle.x = particle.startX + (particle.targetX - particle.startX) * progress;
  particle.y = particle.startY + (particle.targetY - particle.startY) * progress;
  return progress >= 1;
}
