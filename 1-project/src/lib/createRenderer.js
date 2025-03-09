import { WebGLRenderer } from "three";
import sizes from "../config/sizes";

export default function createRenderer(canvas) {
  const renderer = new WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  // Important! Add pixel ratio

  return renderer;
}
