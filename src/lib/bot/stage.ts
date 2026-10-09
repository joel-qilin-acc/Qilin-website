import {
  ACESFilmicToneMapping,
  DirectionalLight,
  HemisphereLight,
  MathUtils,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createBotModel } from "./model";
import type { BotColors, BotPose } from "./types";

const fov = 30;

export type BotStageOptions = {
  canvas: HTMLCanvasElement;
  colors: BotColors;
  maxPixelRatio: number;
};

function createRenderer(canvas: HTMLCanvasElement, maxPixelRatio: number) {
  const ratio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: ratio < 2, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(ratio);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  return renderer;
}

// Reflections do most of the work: a soft studio environment gives the shell its glossy, premium look.
function createScene(renderer: WebGLRenderer, colors: BotColors) {
  const scene = new Scene();
  const generator = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = generator.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.9;
  room.dispose();
  generator.dispose();

  scene.add(new HemisphereLight(0xffffff, 0xaebbe6, 0.5));
  const key = new DirectionalLight(0xffffff, 2.2);
  key.position.set(2, 3, 4);
  const rim = new DirectionalLight(colors.bright, 3);
  rim.position.set(-4, 2, -3);
  scene.add(key, rim);
  return { scene, environment };
}

export function createBotStage({ canvas, colors, maxPixelRatio }: BotStageOptions) {
  const renderer = createRenderer(canvas, maxPixelRatio);
  const { scene, environment } = createScene(renderer, colors);
  const camera = new PerspectiveCamera(fov, 1, 10, 6000);
  const model = createBotModel(colors);
  scene.add(model.root);

  let width = 0;
  let height = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // One world unit equals one CSS pixel on the z = 0 plane, so the bot can be placed in page coordinates.
    camera.position.z = height / 2 / Math.tan(MathUtils.degToRad(fov / 2));
    camera.updateProjectionMatrix();
  }

  function render(pose: BotPose, time: number) {
    model.root.position.set(pose.x - width / 2, height / 2 - pose.y, 0);
    model.update(pose, time);
    renderer.render(scene, camera);
  }

  function dispose() {
    model.dispose();
    environment.dispose();
    renderer.dispose();
  }

  resize();
  return { render, resize, dispose };
}
