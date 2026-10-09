import {
  BoxGeometry,
  CapsuleGeometry,
  CircleGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  Mesh,
  Shape,
  TorusGeometry,
  Vector2,
  type BufferGeometry,
  type Material,
} from "three";
import type { BotMaterials } from "../materials";

export type Arm = {
  mount: Group;
  swing: Group;
  duct: Group;
  blades: Group;
  delay: number;
  spin: number;
};

const reach = 0.5;
const ductOffset = 0.86;
const ductRadius = 0.4;
const mountRadius = 0.8;

function bladeGeometry() {
  const shape = new Shape();
  shape.moveTo(0.04, -0.02);
  shape.bezierCurveTo(0.14, -0.045, 0.26, -0.04, 0.34, -0.012);
  shape.bezierCurveTo(0.36, 0, 0.36, 0.01, 0.34, 0.018);
  shape.bezierCurveTo(0.24, 0.045, 0.12, 0.04, 0.04, 0.022);
  const blade = new ExtrudeGeometry(shape, { depth: 0.008, bevelEnabled: false, curveSegments: 14 });
  blade.rotateX(-Math.PI / 2);
  return blade;
}

function ductGeometry() {
  const profile = [
    [ductRadius - 0.045, -0.06],
    [ductRadius + 0.02, -0.06],
    [ductRadius + 0.02, 0.06],
    [ductRadius - 0.01, 0.09],
    [ductRadius - 0.045, 0.06],
    [ductRadius - 0.045, -0.06],
  ].map(([x, y]) => new Vector2(x, y));
  return new LatheGeometry(profile, 56);
}

export function createArmGeometries() {
  return {
    duct: ductGeometry(),
    rim: new TorusGeometry(ductRadius - 0.01, 0.011, 8, 56),
    blade: bladeGeometry(),
    strut: new BoxGeometry(ductRadius - 0.05, 0.022, 0.03),
    tube: new CapsuleGeometry(0.055, reach, 6, 14),
    hub: new CylinderGeometry(0.08, 0.09, 0.14, 24),
    cap: new CylinderGeometry(0.05, 0.05, 0.03, 20),
    disc: new CircleGeometry(ductRadius - 0.03, 40),
  };
}

type ArmGeometries = ReturnType<typeof createArmGeometries>;

function mesh(geometry: BufferGeometry, material: Material) {
  return new Mesh(geometry, material);
}

function buildBlades(geometry: ArmGeometries, materials: BotMaterials) {
  const blades = new Group();
  [0, 1, 2].forEach((index) => {
    const blade = mesh(geometry.blade, materials.metal);
    blade.rotation.set(0.28, (index * Math.PI * 2) / 3, 0, "YXZ");
    blades.add(blade);
  });
  const disc = mesh(geometry.disc, materials.disc);
  disc.rotation.x = -Math.PI / 2;
  const spinner = mesh(geometry.hub, materials.metal);
  spinner.scale.set(0.7, 0.4, 0.7);
  blades.add(spinner, disc);
  blades.position.y = 0.03;
  return blades;
}

function buildDuct(geometry: ArmGeometries, materials: BotMaterials) {
  const duct = new Group();
  const rim = mesh(geometry.rim, materials.light);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.09;
  duct.add(mesh(geometry.duct, materials.armor), rim);
  [0, 1, 2].forEach((index) => {
    const strut = mesh(geometry.strut, materials.metal);
    const angle = (index * Math.PI * 2) / 3 + Math.PI / 6;
    strut.position.set(Math.cos(angle) * (ductRadius / 2 - 0.02), 0, -Math.sin(angle) * (ductRadius / 2 - 0.02));
    strut.rotation.y = angle;
    duct.add(strut);
  });
  duct.position.x = ductOffset;
  return duct;
}

export function buildArm(geometry: ArmGeometries, materials: BotMaterials, index: number): Arm {
  const angle = Math.PI / 4 + (index * Math.PI) / 2;
  const mount = new Group();
  mount.position.set(Math.cos(angle) * mountRadius, -0.13, Math.sin(angle) * mountRadius);
  mount.rotation.y = -angle;

  const swing = new Group();
  const tube = mesh(geometry.tube, materials.metal);
  tube.rotation.z = Math.PI / 2;
  tube.position.x = reach / 2 + 0.08;
  const hub = mesh(geometry.hub, materials.armor);
  hub.rotation.x = Math.PI / 2;
  const duct = buildDuct(geometry, materials);
  const blades = buildBlades(geometry, materials);
  duct.add(blades);
  swing.add(hub, tube, duct);
  mount.add(swing);

  return { mount, swing, duct, blades, delay: index * 0.1, spin: index % 2 === 0 ? 1 : -1 };
}

export function buildArms(materials: BotMaterials) {
  const geometry = createArmGeometries();
  return { arms: [0, 1, 2, 3].map((index) => buildArm(geometry, materials, index)), geometry };
}
