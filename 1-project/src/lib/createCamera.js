import { PerspectiveCamera } from "three";
import sizes from "../config/sizes";

export default function createCamera() {
  const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  // Important! Set lengths

  return camera;
}
