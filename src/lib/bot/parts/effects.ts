import { CanvasTexture, CylinderGeometry, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import type { BotMaterials } from "../materials";

export function buildBeam(materials: BotMaterials) {
  const beam = new Mesh(new CylinderGeometry(0.03, 0.03, 1, 10), materials.beam);
  beam.rotation.z = Math.PI / 2;
  return beam;
}

// A soft blob under the unit; it grounds the 3D model on the flat page.
export function buildShadow() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(64, 64, 4, 64, 64, 62);
    gradient.addColorStop(0, "rgba(11,18,32,0.55)");
    gradient.addColorStop(1, "rgba(11,18,32,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }
  const texture = new CanvasTexture(canvas);
  const material = new MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
  const shadow = new Mesh(new PlaneGeometry(2.4, 2.4), material);
  shadow.position.set(0, -1.7, -0.5);
  shadow.scale.y = 0.26;
  return { shadow, material, texture };
}
