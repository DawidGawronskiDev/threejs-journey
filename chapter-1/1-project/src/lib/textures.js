import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const createTexture = (url) => {
  const texture = textureLoader.load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
};

const basecolorTexture = createTexture("/textures/organic/basecolor.jpg");
const ambientOcclusionTexture = createTexture(
  "/textures/organic/ambientOcclusion.jpg"
);
const heightTexture = createTexture("/textures/organic/height.png");
const normalTexture = createTexture("/textures/organic/normal.jpg");
const roughnessTexture = createTexture("/textures/organic/roughness.jpg");

export {
  basecolorTexture,
  ambientOcclusionTexture,
  heightTexture,
  normalTexture,
  roughnessTexture,
};
