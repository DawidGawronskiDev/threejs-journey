import * as THREE from "three";
import {
  ambientOcclusionTexture,
  basecolorTexture,
  heightTexture,
  normalTexture,
  roughnessTexture,
} from "./textures";

export default new THREE.MeshPhysicalMaterial({
  map: basecolorTexture,
  aoMap: ambientOcclusionTexture,
  aoMapIntensity: 4,
  displacementMap: heightTexture,
  displacementScale: 0.3,
  //
  normalMap: normalTexture,
  roughnessMap: roughnessTexture,
  metalness: 0.4,
  roughness: 0,
  //
  normalScale: new THREE.Vector2(0.5, 0.5),
  //
  clearcoat: 0,
  clearcoatRoughness: 0,
  //
  transmission: 0,
  ior: 1.5,
  thickness: 1,
});
