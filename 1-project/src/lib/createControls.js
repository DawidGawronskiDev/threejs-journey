import { OrbitControls } from "three/examples/jsm/Addons.js";

export default function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  return controls;
}
