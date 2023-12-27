import * as THREE from "three";
import { metalFramePart } from "./meshes/metalFramePart";

export function metalFrame(scene, x) {
  const metalFrameLeft = metalFramePart(scene);
  const metalFrameRight = metalFramePart(scene);
  metalFrameRight.rotation.y = THREE.MathUtils.degToRad(180);

  metalFrameLeft.position.x = x;
  metalFrameRight.position.x = x;
}
