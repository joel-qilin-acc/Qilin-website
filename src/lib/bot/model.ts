import { Color, Group, MathUtils, Mesh } from "three";
import { createMaterials, disposeMaterials } from "./materials";
import { buildArms, type Arm } from "./parts/arm";
import { buildBody, buildEye } from "./parts/body";
import { buildBeam, buildShadow } from "./parts/effects";
import type { BotColors, BotPose } from "./types";

const danger = new Color();
const bright = new Color();

const sweep = 0.7;
const smooth = (value: number) => value * value * (3 - 2 * value);

// Each arm slides out of its bay a beat after the one before it, so the change from robot to drone reads as mechanical.
function deployArm(arm: Arm, drone: number, time: number) {
  const progress = smooth(MathUtils.clamp(drone * 1.5 - arm.delay, 0, 1));
  arm.swing.visible = progress > 0.02;
  arm.swing.scale.setScalar(MathUtils.lerp(0.05, 1, progress));
  arm.swing.position.x = -0.35 * (1 - progress);
  arm.swing.rotation.z = -sweep * (1 - progress);
  arm.blades.visible = progress > 0.5;
  arm.blades.rotation.y = arm.spin * time * (14 + progress * 40);
}

export function createBotModel(colors: BotColors) {
  const materials = createMaterials(colors);
  const root = new Group();
  const body = new Group();
  const eye = buildEye(materials);
  const { arms, geometry } = buildArms(materials);
  const beam = buildBeam(materials);
  const ground = buildShadow();
  body.add(...buildBody(materials), eye, ...arms.map((arm) => arm.mount));
  root.add(ground.shadow, body, beam);
  danger.set(colors.danger);
  bright.set(colors.bright);

  function updateFace(pose: BotPose) {
    materials.eye.color.copy(danger).lerp(bright, pose.mood);
    eye.scale.set(1, 1.5 - pose.squint * 0.7, 1);
    materials.light.emissiveIntensity = 0.5 + pose.power * 1.3;
    materials.disc.opacity = pose.drone * 0.2;
  }

  function updateBeam(pose: BotPose) {
    materials.beam.opacity = pose.beam * 0.5;
    beam.visible = pose.beam > 0.02;
    const length = Math.max(0.01, pose.beamLength / Math.max(1, pose.radius));
    beam.scale.set(1, length, 1);
    beam.position.set(length / 2 + 1, 0.46, 0);
  }

  function update(pose: BotPose, time: number) {
    const sway = Math.sin(time * 1.4) * 0.04;
    root.scale.setScalar(pose.radius);
    root.position.y += Math.sin(time * 2) * pose.bob;
    body.rotation.set(pose.pitch + pose.drone * 0.3 + sway * 0.6, pose.yaw + sway, pose.roll);
    arms.forEach((arm) => deployArm(arm, pose.drone, time));
    ground.material.opacity = 1 - pose.drone * 0.5;
    ground.shadow.scale.x = 1 + pose.drone * 0.5;
    updateFace(pose);
    updateBeam(pose);
  }

  function dispose() {
    root.traverse((object) => {
      if (object instanceof Mesh) object.geometry.dispose();
    });
    Object.values(geometry).forEach((item) => item.dispose());
    ground.texture.dispose();
    ground.material.dispose();
    disposeMaterials(materials);
  }

  return { root, update, dispose };
}
