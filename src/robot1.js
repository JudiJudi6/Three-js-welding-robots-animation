import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export function robot1(scene) {
  // const geometry = new THREE.CylinderGeometry(10, 20, 40, 10);
  // const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
  // const cylinder = new THREE.Mesh(geometry, material);
  // cylinder.castShadow = true
  // cylinder.receiveShadow = true
  // cylinder.position.z = 0
  // cylinder.position.y = 20
  // scene.add(cylinder);
  const objLoader = new OBJLoader();
  objLoader.setPath("/public/");
  objLoader.load("robot.obj", (object) => {
    // object.position.z = 100;
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add(object);
  });
}
