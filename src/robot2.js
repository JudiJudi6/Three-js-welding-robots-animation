import * as THREE from "three";
import { box } from "./meshes/Box";
import { circle } from "./meshes/Circle";

export function robot2(scene, x, y, z) {
  const phaseOne = new THREE.Group();
  const phaseTwo = new THREE.Group();
  const phaseThree = new THREE.Group();
  const phaseFour = new THREE.Group();

  const basis = box(scene, 25, 5, 25);
  basis.position.y = 25;

  //phase one

  const phaseOneCylinder = circle(scene, 5, 10, 15, "robotTexture.jpg", 0x333333);
  phaseOneCylinder.position.y = 30;

  const phaseOneCylinder2 = circle(scene, 8, 8, 5, "robotTexture.jpg", 0x333333);
  phaseOneCylinder2.position.y = 40;

  const phaseOneBlock = box(scene, 8, 15, 2, "robotTexture.jpg", 1, 1, 0xf5fd00);
  phaseOneBlock.position.y = 45;
  phaseOneBlock.position.z = -8;

  const phaseOneBlock2 = box(scene, 8, 15, 2, "robotTexture.jpg", 1, 1, 0xf5fd00);
  phaseOneBlock2.position.y = 45;
  phaseOneBlock2.position.z = 8;

  phaseOne.add(
    phaseOneCylinder,
    phaseOneCylinder2,
    phaseOneBlock,
    phaseOneBlock2
  );

  //phsae two

  const phaseTwoCylinder1 = circle(scene, 5, 5, 15, "robotTexture.jpg", 0xf5fd00);
  phaseTwoCylinder1.rotation.x = THREE.MathUtils.degToRad(90);

  const phaseTwoBlock = box(scene, 30, 10, 7, "robotTexture.jpg", 1, 1, 0xf5fd00);
  phaseTwoBlock.position.x = 15;

  const phaseTwoCylinder2 = circle(scene, 5, 5, 7, "robotTexture.jpg", 0xf5fd00);
  phaseTwoCylinder2.position.x = 30;
  phaseTwoCylinder2.rotation.x = THREE.MathUtils.degToRad(90);

  phaseTwo.add(phaseTwoCylinder1, phaseTwoBlock, phaseTwoCylinder2);
  phaseTwo.position.y = 50;
  phaseTwo.rotation.z = THREE.MathUtils.degToRad(45);

  //phase three

  const phaseThreeCylinder1 = circle(scene, 5, 5, 2, "robotTexture.jpg", 0xf5fd00);
  phaseThreeCylinder1.position.z = -4.5;
  phaseThreeCylinder1.rotation.x = THREE.MathUtils.degToRad(90);

  const phaseThreeBlock = box(scene, 30, 10, 1.9, "robotTexture.jpg", 1, 1, 0xf5fd00);
  phaseThreeBlock.position.z = -4.5;
  phaseThreeBlock.position.x = 15;

  const phaseThreeCylinder2 = circle(scene, 5, 5, 2, "robotTexture.jpg", 0xf5fd00);
  phaseThreeCylinder2.position.z = -4.5;
  phaseThreeCylinder2.position.x = 30;
  phaseThreeCylinder2.rotation.x = THREE.MathUtils.degToRad(90);

  const phaseThreeCylinder3 = circle(scene, 5, 5, 2, "robotTexture.jpg", 0xf5fd00);
  phaseThreeCylinder3.position.z = 4.5;
  phaseThreeCylinder3.rotation.x = THREE.MathUtils.degToRad(90);

  const phaseThreeBlock2 = box(scene, 30, 10, 1.9, "robotTexture.jpg", 1, 1, 0xf5fd00);
  phaseThreeBlock2.position.z = 4.5;
  phaseThreeBlock2.position.x = 15;

  const phaseThreeCylinder4 = circle(scene, 5, 5, 2, "robotTexture.jpg", 0xf5fd00);
  phaseThreeCylinder4.position.z = 4.5;
  phaseThreeCylinder4.position.x = 30;
  phaseThreeCylinder4.rotation.x = THREE.MathUtils.degToRad(90);

  phaseThree.add(
    phaseThreeCylinder1,
    phaseThreeBlock,
    phaseThreeCylinder2,
    phaseThreeCylinder3,
    phaseThreeBlock2,
    phaseThreeCylinder4
  );

  phaseThree.position.y = 71;
  phaseThree.position.x = 21;
  phaseThree.rotation.z = THREE.MathUtils.degToRad(0);

  // phase four

  const phaseFourCylinder = circle(scene, 5, 5, 7, "robotTexture.jpg", 0xf5fd00);
  phaseFourCylinder.rotation.x = THREE.MathUtils.degToRad(90);

  const phaseFourBlock = box(scene, 10, 15, 7, "robotTexture.jpg", 1, 1, 0xf5fd00);
  phaseFourBlock.position.y = -7.5;

  const phaseFourCylinder2 = circle(scene, 5, 10, 5, "robotTexture.jpg", 0x333333);
  phaseFourCylinder2.position.y = -15;

  phaseFour.add(phaseFourCylinder, phaseFourBlock, phaseFourCylinder2);
  phaseFour.position.x = 51;
  phaseFour.position.y = 71;

  const robotObj = new THREE.Object3D();
  robotObj.add(phaseOne, phaseTwo, phaseThree, phaseFour);
  robotObj.position.set(x, y, z);
  scene.add(robotObj);

  phaseOne.attach(phaseTwo);
  phaseTwo.attach(phaseThree);
  phaseThree.attach(phaseFour);

  return { phaseOne, phaseTwo, phaseThree, phaseFour };
}
