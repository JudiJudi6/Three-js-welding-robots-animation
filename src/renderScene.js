import * as THREE from "three";
import { box } from "./meshes/Box";
import { metalFrame } from "./metalFrame";
import { light } from "./light";
import { lamp } from "./meshes/Lamp";

export function renderScene(scene) {
  const groundMesh = box(scene, 800, 1, 400, "floor.jpg", 10, 5);

  const wallMeshOne = box(scene, 800, 150, 1, "wall.jpg", 2, 1);
  wallMeshOne.position.z = -200;
  wallMeshOne.position.y = 75;

  const wallMeshTwo = box(scene, 800, 150, 1, "wall.jpg", 2, 1);
  wallMeshTwo.position.z = 200;
  wallMeshTwo.position.y = 75;

  const wallMeshThree = box(scene, 1, 300, 400, "wall.jpg", 1, 2);
  wallMeshThree.position.x = 400;
  wallMeshThree.position.y = 150;

  const wallMeshFour = box(scene, 1, 300, 400, "wall.jpg", 1, 2);
  wallMeshFour.position.x = -400;
  wallMeshFour.position.y = 150;

  const gateMesh = box(scene, 1, 75, 125, "gate.jpg");
  gateMesh.position.x = -399;
  gateMesh.position.y = 37;

  const sheetCeilingOneMesh = box(scene, 800, 1, 250, "sheet.jpg", 20, 20);
  sheetCeilingOneMesh.position.z = 100;
  sheetCeilingOneMesh.position.y = 195;
  sheetCeilingOneMesh.rotation.x = THREE.MathUtils.degToRad(25);

  const sheetCeilingTwoMesh = box(scene, 800, 1, 250, "sheet.jpg", 20, 20);
  sheetCeilingTwoMesh.position.z = -100;
  sheetCeilingTwoMesh.position.y = 195;
  sheetCeilingTwoMesh.rotation.x = THREE.MathUtils.degToRad(-25);

  metalFrame(scene, 0);
  metalFrame(scene, 200);
  metalFrame(scene, -200);
  metalFrame(scene, 395);
  metalFrame(scene, -395);

  lamp(scene, 3, 205, 105, 30);
  light(scene, 3, 120, 190, -1);

  lamp(scene, 3, 205, -105, -30);
  light(scene, 3, 120, -190, 1);

  lamp(scene, 203, 205, 105, 30);
  light(scene, 203, 120, 190, -1);

  lamp(scene, 203, 205, -105, -30);
  light(scene, 203, 120, -190, 1);

  lamp(scene, -203, 205, 105, 30);
  light(scene, -203, 120, 190, -1);

  lamp(scene, -203, 205, -105, -30);
  light(scene, -203, 120, -190, 1);
  //   const { spotLight: spotLight2, lampGrup: lampGrup2 } = light(scene, 200, 150, 0, -20);
}
