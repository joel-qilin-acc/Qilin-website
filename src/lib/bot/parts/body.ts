import {
  Group,
  LatheGeometry,
  Mesh,
  SphereGeometry,
  TorusGeometry,
  type BufferGeometry,
  type Material,
} from "three";
import type { BotMaterials } from "../materials";
import { plateProfile, radiusAt, torsoProfile } from "./profile";

const segments = 64;
const eyeHeight = 0.46;
const eyeWidth = 0.7;
const bayAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];

function mesh(geometry: BufferGeometry, material: Material) {
  return new Mesh(geometry, material);
}

function ring(y: number, lift: number, tube: number, material: Material) {
  const band = mesh(new TorusGeometry(radiusAt(y) + lift, tube, 10, segments), material);
  band.rotation.x = Math.PI / 2;
  band.position.y = y;
  return band;
}

// Dark bays sit over the slots the arms slide out of, so the robot looks panelled, not painted.
function buildBays(materials: BotMaterials) {
  return bayAngles.map((angle) => {
    const half = 0.3;
    const phi = Math.PI / 2 - angle - half;
    return mesh(new LatheGeometry(plateProfile(-0.38, 0.1, 0.04), 20, phi, half * 2), materials.metal);
  });
}

export function buildBody(materials: BotMaterials) {
  const torso = mesh(new LatheGeometry(torsoProfile(), segments), materials.shell);
  const visor = mesh(new LatheGeometry(plateProfile(0.2, 0.78, 0.03), 48, -1.1, 2.2), materials.glass);
  const cap = mesh(new LatheGeometry(plateProfile(0.98, 1.3, 0.035, 14), segments), materials.armor);
  const underglow = ring(-1.18, 0.05, 0.03, materials.light);
  return [
    torso,
    visor,
    cap,
    ...buildBays(materials),
    ring(0.98, 0.012, 0.014, materials.metal),
    ring(-0.62, 0.02, 0.022, materials.light),
    ring(-0.95, 0.02, 0.03, materials.metal),
    underglow,
  ];
}

// The eye is a thin curved light bar set into the visor, not a pair of cartoon eyes.
export function buildEye(materials: BotMaterials) {
  const eye = new Group();
  const radius = radiusAt(eyeHeight) + 0.06;
  const arc = new TorusGeometry(radius, 0.022, 8, 40, eyeWidth * 2);
  arc.rotateZ(-Math.PI / 2 - eyeWidth);
  arc.rotateX(-Math.PI / 2);
  eye.add(mesh(arc, materials.eye));
  [-1, 1].forEach((side) => {
    const dot = mesh(new SphereGeometry(0.042, 12, 8), materials.eye);
    const angle = side * (eyeWidth + 0.12);
    dot.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
    eye.add(dot);
  });
  eye.position.y = eyeHeight;
  return eye;
}
