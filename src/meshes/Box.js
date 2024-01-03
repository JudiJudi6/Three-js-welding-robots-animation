import * as THREE from "three";

export function box(
  scene,
  w,
  h,
  d,
  path,
  repeatX = 1,
  repeatY = 1,
  color = ""
) {
  const boxGeometry = new THREE.BoxGeometry(w, h, d);
  const boxMaterial = new THREE.MeshPhongMaterial({ color: color });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  boxMesh.receiveShadow = true;
  boxMesh.castShadow = true;

  if (path !== "") {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      path,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(repeatX, repeatY);
        boxMaterial.map = texture;
        boxMaterial.needsUpdate = true;
      },
      undefined
    );
  }
  scene.add(boxMesh);
  return boxMesh;
}
