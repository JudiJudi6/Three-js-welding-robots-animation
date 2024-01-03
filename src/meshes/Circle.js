import * as THREE from "three";

export function circle(scene, t, b, h, path, color = "") {
  const cylinderGeometry = new THREE.CylinderGeometry(t, b, h);
  const cylinderMaterial = new THREE.MeshPhongMaterial({ color: color });
  const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  cylinderMesh.receiveShadow = true;
  cylinderMesh.castShadow = true;

  if (path !== "") {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      path,
      (texture) => {
        cylinderMaterial.map = texture;
        cylinderMaterial.needsUpdate = true;
      },
      undefined
    );
  }
  scene.add(cylinderMesh);
  return cylinderMesh;
}
