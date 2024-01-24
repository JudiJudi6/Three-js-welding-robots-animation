import * as THREE from "three";

export function light(scene, x, y, z, d) {
  const spotLight = new THREE.SpotLight(0xffffff, 30000, 400, Math.PI / 3, 0.1);
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  spotLight.castShadow = true;

  spotLight.position.set(x, y, z);
  spotLight.target.position.set(x, y - 1, z + d);

  scene.add(spotLight);

  //Dodaj light helpers
  // scene.add(spotLightHelper);

  spotLightHelper.update();
  return spotLight;
}
