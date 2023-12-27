import * as THREE from "three";
import { box } from "./Box";

export function metalFramePart(scene) {
  const metalFrameGroupLeft = new THREE.Group();

  const boneMeshTop = box(scene, 3, 3, 250, "metal.jpg");
  boneMeshTop.position.y = 195;
  boneMeshTop.position.z = 100;
  boneMeshTop.rotation.x = THREE.MathUtils.degToRad(25);

  metalFrameGroupLeft.add(boneMeshTop);

  const boneMeshBottom = box(scene, 3, 3, 300, "metal.jpg");
  boneMeshBottom.position.y = 170;
  boneMeshBottom.position.z = 100;
  boneMeshBottom.rotation.x = THREE.MathUtils.degToRad(25);

  metalFrameGroupLeft.add(boneMeshBottom);

  const boneMeshX1 = box(scene, 2, 2, 51, "metal.jpg");
  boneMeshX1.position.y = 148;
  boneMeshX1.position.z = 175;

  metalFrameGroupLeft.add(boneMeshX1);

  const boneMeshX2 = box(scene, 2, 2, 51, "metal.jpg");
  boneMeshX2.position.y = 172;
  boneMeshX2.position.z = 122;

  metalFrameGroupLeft.add(boneMeshX2);

  const boneMeshX3 = box(scene, 2, 2, 51, "metal.jpg");
  boneMeshX3.position.y = 195;
  boneMeshX3.position.z = 73;

  metalFrameGroupLeft.add(boneMeshX3);

  const boneMeshY1 = box(scene, 2, 25, 2, "metal.jpg");
  boneMeshY1.position.y = 135;
  boneMeshY1.position.z = 199;

  metalFrameGroupLeft.add(boneMeshY1);

  const boneMeshY2 = box(scene, 2, 25, 2, "metal.jpg");
  boneMeshY2.position.y = 160;
  boneMeshY2.position.z = 149;

  metalFrameGroupLeft.add(boneMeshY2);

  const boneMeshY3 = box(scene, 2, 25, 2, "metal.jpg");
  boneMeshY3.position.y = 185;
  boneMeshY3.position.z = 99;

  metalFrameGroupLeft.add(boneMeshY3);

  const boneMeshY4 = box(scene, 2, 25, 2, "metal.jpg");
  boneMeshY4.position.y = 208;
  boneMeshY4.position.z = 48;

  metalFrameGroupLeft.add(boneMeshY4);

  const boneMeshYTop = box(scene, 2, 25, 2, "metal.jpg");
  boneMeshYTop.position.y = 230;
  //   boneMeshYTop.position.z = 149;

  metalFrameGroupLeft.add(boneMeshYTop);
  metalFrameGroupLeft.castShadow = true;
  metalFrameGroupLeft.receiveShadow = true;

  scene.add(metalFrameGroupLeft);
  return metalFrameGroupLeft;
}
