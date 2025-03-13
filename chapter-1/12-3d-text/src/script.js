import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Materials
 */
const material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture,
});

/**
 * Fonts
 */
const fontsLoader = new FontLoader();
fontsLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  console.log("font loaded");
  const textGeometry = new TextGeometry("Gawronzkyyy", {
    font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  // textGeometry.computeBoundingBox();
  textGeometry.center();

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});

/**
 * Donuts
 */
const donutGeometry = new THREE.TorusGeometry();
const donutGroup = new THREE.Group();
scene.add(donutGroup);
for (let i = 0; i < 100; i++) {
  const donutMesh = new THREE.Mesh(donutGeometry, material);
  donutMesh.position.x = (Math.random() - 0.5) * 12;
  donutMesh.position.y = (Math.random() - 0.5) * 12;
  donutMesh.position.z = (Math.random() - 0.5) * 12;

  donutMesh.rotation.x = Math.random() * Math.PI;
  donutMesh.rotation.y = Math.random() * Math.PI;
  donutMesh.rotation.z = Math.random() * Math.PI;

  const scale = Math.random() - 0.5;
  donutMesh.scale.set(scale, scale, scale);

  scene.add(donutMesh);
  donutGroup.add(donutMesh);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  donutGroup.rotation.x = elapsedTime * 0.01;
  donutGroup.rotation.z = elapsedTime * 0.01;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
