import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const matcapTexture = textureLoader.load("./textures/matcaps/3.png");
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

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
 * Material
 */
// const material = new THREE.MeshBasicMaterial({
//   map: doorColorTexture,
// });

// const material = new THREE.MeshNormalMaterial({
//   flatShading: true,
// });

// const material = new THREE.MeshMatcapMaterial({
//   matcap: matcapTexture,
// });

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0xff0000);

// const material = new THREE.MeshToonMaterial();
// gradientTexture.magFilter = THREE.NearestFilter;
// material.gradientMap = gradientTexture;

const material = new THREE.MeshStandardMaterial({
  map: doorColorTexture,
  aoMap: doorAmbientOcclusionTexture,
  displacementMap: doorHeightTexture,
  displacementScale: 0.05,
  aoMapIntensity: 1,
  metalnessMap: doorMetalnessTexture,
  roughnessMap: doorRoughnessTexture,
  normalMap: doorNormalTexture,
  alphaMap: doorAlphaTexture,
  transparent: true,
  metalness: 1,
  roughness: 1,
});

/**
 * Geometry
 */
const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material
);
sphereMesh.position.x = -2;

const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  material
);

const torusMesh = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
torusMesh.position.x = 2;

scene.add(sphereMesh, planeMesh, torusMesh);

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

/**
 * Enviroment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
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

  // Update rotations
  planeMesh.rotation.x = elapsedTime * -0.01;
  planeMesh.rotation.y = elapsedTime * -0.01;

  sphereMesh.rotation.x = elapsedTime * -0.01;
  sphereMesh.rotation.y = elapsedTime * -0.01;

  torusMesh.rotation.x = elapsedTime * -0.01;
  torusMesh.rotation.y = elapsedTime * -0.01;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
