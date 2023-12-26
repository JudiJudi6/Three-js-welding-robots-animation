import * as THREE from "three";

export function robot1(scene) {
  const geometry = new THREE.CylinderGeometry(10, 20, 40, 10);
  const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.castShadow = true
  cylinder.receiveShadow = true
  scene.add(cylinder);
}
