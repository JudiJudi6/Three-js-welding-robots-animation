import * as THREE from "three";
import { box } from "./Box";

export function lamp(scene, x, y, z, r) {
  const lampGrup = new THREE.Group();
  const lampGeometry = new THREE.ConeGeometry(3, 10);
  const lampMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const lampBox = box(scene, 3, 10, 3, "", 1, 1, 0x666666);
  // Tworzymy mesh lampy
  const lampMesh = new THREE.Mesh(lampGeometry, lampMaterial);

  const lampCenterGeometry = new THREE.SphereGeometry(2);
  const lampCenterMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const lampCenterMesh = new THREE.Mesh(lampCenterGeometry, lampCenterMaterial);
  lampCenterMesh.position.y = -10;
  // Ustawiamy pozycję meshu lampy
  lampMesh.position.set(x, y, z);
  lampBox.position.set(x, y, z);
  lampCenterMesh.position.set(x, y - 4, z);
  lampGrup.add(lampBox, lampMesh, lampCenterMesh);
  lampGrup.rotation.x = THREE.MathUtils.degToRad(r);
  scene.add(lampGrup);
}
