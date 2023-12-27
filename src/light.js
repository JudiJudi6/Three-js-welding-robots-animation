import * as THREE from "three";

export function light(scene, position) {
  // Tworzymy spot light

  // Ustawiamy kąt padania światła i rozkład światła
  //   const spotLight = new THREE.SpotLight(0xffffff, 30);
  //   spotLight.position.copy(position);

  //   spotLight.castShadow = true;

  const spotLight = new THREE.SpotLight(0xffffff, 300);
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  spotLight.position.y = 10;
  spotLight.position.z = 100;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  const targetObject = new THREE.Object3D();
  targetObject.position.set(1, 0, 0);
  scene.add(targetObject);
  
  spotLight.target = targetObject;
  
  spotLight.shadow.camera.fov = 90;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 100;
  scene.add(spotLight);
  scene.add(spotLightHelper);

//   scene.add(spotLight);
  // Tworzymy geometrię i materiał dla modelu lampy
  //   const lampGeometry = new THREE.ConeGeometry(20, 20, 20);
  //   const lampMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });

  //   // Tworzymy mesh lampy
  //   const lampMesh = new THREE.Mesh(lampGeometry, lampMaterial);

  //   // Ustawiamy pozycję meshu lampy
  //   lampMesh.position.copy(position);

  // Dodajemy mesh lampy do sceny
  //   scene.add(lampMesh);
}
