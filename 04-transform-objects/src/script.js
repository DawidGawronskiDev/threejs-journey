import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Group
 */
const group = new THREE.Group();
scene.add(group);

/**
 * Objects
 */
const cubeOne = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cubeOne.position.set(2, 0, 0);
group.add(cubeOne);
const cubeTwo = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cubeTwo.position.set(0, 2, 0);
group.add(cubeTwo);

const cubeThree = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cubeThree.position.set(-1, 0, 0);
group.add(cubeThree);

group.position.set(3, 1, -1);
group.rotation.z = Math.PI / 1.5;

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
/**
 * LookAt
 */
camera.lookAt(group.position);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// console.log(mesh.position.normalize);
// console.log(mesh.position.distanceTo(camera.position));
