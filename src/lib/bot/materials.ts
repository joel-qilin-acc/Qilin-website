import {
  AdditiveBlending,
  Color,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  type Material,
} from "three";
import type { BotColors } from "./types";

// A deep navy shell, white armour plates and cool blue light: it must read on a white page.
export function createMaterials(colors: BotColors) {
  const navy = new Color(colors.accent).multiplyScalar(0.28);
  const plate = new Color(colors.surface).multiplyScalar(0.9);

  return {
    shell: new MeshPhysicalMaterial({
      color: navy,
      metalness: 0.55,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.14,
    }),
    armor: new MeshPhysicalMaterial({ color: plate, metalness: 0.1, roughness: 0.3, clearcoat: 0.6 }),
    metal: new MeshStandardMaterial({ color: colors.ink, metalness: 0.9, roughness: 0.38 }),
    glass: new MeshStandardMaterial({ color: "#03060d", metalness: 1, roughness: 0.05 }),
    light: new MeshStandardMaterial({
      color: colors.bright,
      emissive: new Color(colors.bright),
      emissiveIntensity: 1.4,
      roughness: 0.4,
    }),
    eye: new MeshBasicMaterial({ color: colors.accent, toneMapped: false }),
    disc: new MeshBasicMaterial({ color: colors.bright, transparent: true, opacity: 0, depthWrite: false }),
    beam: new MeshBasicMaterial({
      color: colors.bright,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: AdditiveBlending,
    }),
  };
}

export type BotMaterials = ReturnType<typeof createMaterials>;

export function disposeMaterials(materials: BotMaterials) {
  (Object.values(materials) as Material[]).forEach((material) => material.dispose());
}
