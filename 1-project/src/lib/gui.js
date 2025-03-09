import GUI from "lil-gui";
import * as THREE from "three";

const createGUI = (mesh, material, ambientLight, pointLight) => {
  const gui = new GUI();
  const meshFolder = gui.addFolder("Mesh");

  gui.add(mesh, "geometry", {
    sphere: new THREE.SphereGeometry(1, 512, 512),
    torus: new THREE.TorusGeometry(1, 0.2, 512, 512),
    torusKnot: new THREE.TorusKnotGeometry(1, 0.2, 128, 128, 1),
  });
  meshFolder.add(material, "wireframe");
  meshFolder.add(material, "aoMapIntensity").min(0).max(8).step(0.01);
  meshFolder.add(material, "displacementScale").min(0).max(0.5).step(0.01);
  meshFolder.add(material, "metalness").min(0.01).max(1).step(0.01);
  meshFolder.add(material, "roughness").min(0).max(1).step(0.01);
  meshFolder.add(material.normalScale, "x").min(0).max(100);
  meshFolder.add(material.normalScale, "y").min(0).max(100);
  meshFolder.add(material, "clearcoat").min(0).max(1).step(0.001);
  meshFolder.add(material, "clearcoatRoughness").min(0).max(1).step(0.001);
  meshFolder.add(material, "transmission").min(0).max(1).step(0.01);
  meshFolder.add(material, "ior").min(1).max(2.3333).step(0.001).name("IOR");
  meshFolder
    .add(material, "thickness")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Thickness");

  const lightFolder = gui.addFolder("Light");
  lightFolder.add(ambientLight, "intensity").min(0).max(1);
  lightFolder.add(pointLight, "intensity").min(0).max(100);

  // gui.hide();
  window.addEventListener("keypress", (e) => {
    if (e.key === "m" || e.key === "M") {
      gui._hidden ? gui.show() : gui.hide();
    }
  });
};

export { createGUI };
