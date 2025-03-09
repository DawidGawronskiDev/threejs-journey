import { PointLight } from "three";

export default function createPointLight() {
  const pointLight = new PointLight(0xffffff, 1);
  pointLight.position.set(2, 3, 4);
  return pointLight;
}
