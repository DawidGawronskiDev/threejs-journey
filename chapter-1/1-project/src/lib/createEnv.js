import { EquirectangularReflectionMapping } from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";

const imgUrl = "/textures/environmentMap/hospital_room_2k.hdr";

export default function createEnv(scene) {
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(imgUrl, (environmentMap) => {
    environmentMap.mapping = EquirectangularReflectionMapping;

    scene.background = environmentMap;
    scene.environment = environmentMap;
  });
}
