import { AmbientLight } from "three";

export default function createAmbientLight() {
  const ambientLight = new AmbientLight(0xffffff, 1);
  return ambientLight;
}
