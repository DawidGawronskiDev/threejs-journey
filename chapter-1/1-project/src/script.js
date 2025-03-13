const canvas = document.querySelector("canvas.webgl");
import * as THREE from "three";
import { createGUI } from "./lib/gui";
import material from "./lib/material";
import sizes from "./config/sizes";
import createControls from "./lib/createControls";
import createCamera from "./lib/createCamera";
import createRenderer from "./lib/createRenderer";
import createMesh from "./lib/createMesh";
import createEnv from "./lib/createEnv";
import createAmbientLight from "./lib/createAmbientLight";
import createPointLight from "./lib/createPointLight";

const scene = new THREE.Scene();
const camera = createCamera();

const mesh = createMesh();
scene.add(mesh);

const controls = createControls(camera, canvas);

const renderer = createRenderer(canvas);

const env = createEnv(scene);

const ambientLight = createAmbientLight();
scene.add(ambientLight);

const pointLight = createPointLight();
scene.add(pointLight);

createGUI(mesh, material, ambientLight, pointLight);

// Resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("keypress", (e) => {
  if (e.key === "f" || e.key === "F") {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      canvas.requestFullscreen();
    }
  }
});

// Animation
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.y = elapsedTime * 0.1;
  mesh.rotation.z = elapsedTime * 0.1;

  // controls
  controls.update();

  // renderer
  renderer.render(scene, camera);

  // request next frame
  window.requestAnimationFrame(tick);
};

tick();
