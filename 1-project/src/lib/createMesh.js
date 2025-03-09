import { Mesh } from "three";
import geometry from "./geometry";
import material from "./material";

export default function createMesh() {
  return new Mesh(geometry, material);
}
