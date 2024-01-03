import * as THREE from "three";

export function cone(scene, r, h, s, path, color = "") {
  const coneGeometry = new THREE.ConeGeometry(r, h, s);
  const coneMaterial = new THREE.MeshPhongMaterial({ color: color });
  const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);

  coneMesh.receiveShadow = true;
  coneMesh.castShadow = true;

  if (path !== "") {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      path,
      (texture) => {
        coneMaterial.map = texture;
        coneMaterial.needsUpdate = true;
      },
      undefined
    );
  }
  scene.add(coneMesh);
  return coneMesh;
}
