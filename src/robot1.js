import * as THREE from "three";
import { circle } from "./meshes/Circle";
import { box } from "./meshes/Box";
import { cone } from "./meshes/Cone";
import { addSmoke } from "./particles";

export function robot1(scene, x, y, z, r) {
  const basisGroup = new THREE.Group();
  const phaseOne = new THREE.Group();
  const phaseTwo = new THREE.Group();
  const phaseThree = new THREE.Group();
  const phaseFour = new THREE.Group();

  //Basis

  const basisCylinder = circle(scene, 10, 10, 10);
  basisCylinder.position.y = 5;

  const basisBlock = box(scene, 20, 10, 20);
  basisBlock.position.x = -10;
  basisBlock.position.y = 5;

  const basisBlockTop = box(scene, 10, 10, 20);
  basisBlockTop.position.x = -15;
  basisBlockTop.position.y = 15;

  basisGroup.add(basisCylinder, basisBlock, basisBlockTop);
  scene.add(basisGroup);

  //phase one

  const phaseOneCylinder = circle(scene, 10, 10, 5, "", 0x11dddd);
  phaseOneCylinder.position.y = 12.5;

  const phaseOneBlock1 = box(scene, 25, 10, 5, "", 1, 1, 0x11dddd);
  phaseOneBlock1.position.y = 15;
  phaseOneBlock1.position.x = 5;
  phaseOneBlock1.position.z = 2.5;
  phaseOneBlock1.rotation.z = THREE.MathUtils.degToRad(40);

  const phaseOneBlock2 = box(scene, 10, 10, 5, "", 1, 1, 0x11dddd);
  phaseOneBlock2.position.y = 15;
  phaseOneBlock2.position.x = 5;
  phaseOneBlock2.position.z = -2.5;
  phaseOneBlock2.rotation.z = THREE.MathUtils.degToRad(40);

  const phaseOneCylinder2 = circle(scene, 5, 5, 5, "", 0x11dddd);
  phaseOneCylinder2.position.x = 14;
  phaseOneCylinder2.position.y = 22.5;
  phaseOneCylinder2.position.z = 2.5;
  phaseOneCylinder2.rotation.x = THREE.MathUtils.degToRad(90);

  // phaseOne.add(
  //   phaseOneBlock1,
  //   phaseOneBlock2,
  //   phaseOneCylinder,
  //   phaseOneCylinder2
  // );

  // const phaseOneContainer = new THREE.Object3D();
  // phaseOneContainer.add(
  //   phaseOneBlock1,
  //   phaseOneBlock2,
  //   phaseOneCylinder,
  //   phaseOneCylinder2
  // );

  phaseOne.add(
    phaseOneBlock1,
    phaseOneBlock2,
    phaseOneCylinder,
    phaseOneCylinder2
  );

  // scene.add(phaseOne);

  //phase two

  const phaseTwoCylinder1 = circle(scene, 5, 5, 5, "", 0xbbd11d);
  phaseTwoCylinder1.rotation.x = THREE.MathUtils.degToRad(90);

  const phaseTwoBlock = box(scene, 30, 10, 5, "", 1, 1, 0xbbd11d);
  phaseTwoBlock.position.x = 15;

  const phaseTwoCylinder2 = circle(scene, 5, 5, 5, "", 0xbbd11d);
  phaseTwoCylinder2.position.x = 30;
  phaseTwoCylinder2.rotation.x = THREE.MathUtils.degToRad(90);

  // const phaseTwoContainer = new THREE.Object3D();
  // phaseTwoContainer.add(phaseTwoCylinder1, phaseTwoBlock, phaseTwoCylinder2);
  phaseTwo.add(phaseTwoCylinder1, phaseTwoBlock, phaseTwoCylinder2);

  phaseTwo.position.y = 22.5;
  phaseTwo.position.x = 14;
  phaseTwo.position.z = -2.5;
  phaseTwo.rotation.z = THREE.MathUtils.degToRad(135);

  // scene.add(phaseTwo);

  //phase three

  const phaseThreeCylinder = circle(scene, 4, 4, 5, "", 0xddaaff);
  phaseThreeCylinder.rotation.x = THREE.MathUtils.degToRad(90);

  const phaseThreeBlock1 = box(scene, 15, 8, 5, "", 1, 1, 0xddaaff);
  phaseThreeBlock1.position.x = 7.5;

  const phaseThreeCylinder2 = circle(scene, 4, 4, 5, "", 0xddaaff);
  phaseThreeCylinder2.position.x = 15;
  phaseThreeCylinder2.rotation.x = THREE.MathUtils.degToRad(90);

  const phaseThreeBlock2 = box(scene, 25, 8, 5, "", 1, 1, 0xddaaff);
  phaseThreeBlock2.position.x = 24.5;
  phaseThreeBlock2.position.y = -8;
  phaseThreeBlock2.rotation.z = THREE.MathUtils.degToRad(-40);

  const phaseThreeCylinder3 = circle(scene, 4, 4, 5, "", 0xddaaff);
  phaseThreeCylinder3.position.x = 34;
  phaseThreeCylinder3.position.y = -16;
  phaseThreeCylinder3.rotation.x = THREE.MathUtils.degToRad(90);

  // const phaseThreeContainer = new THREE.Object3D();
  // phaseThreeContainer.add(
  //   phaseThreeCylinder,
  //   phaseThreeBlock1,
  //   phaseThreeCylinder2,
  //   phaseThreeBlock2,
  //   phaseThreeCylinder3
  // );
  phaseThree.add(
    phaseThreeCylinder,
    phaseThreeBlock1,
    phaseThreeCylinder2,
    phaseThreeBlock2,
    phaseThreeCylinder3
  );

  phaseThree.position.x = -6.5;
  phaseThree.position.y = 43;
  phaseThree.position.z = 2.5;
  // phaseThree.rotation.z = THREE.MathUtils.degToRad(135);

  // scene.add(phaseThree);

  //phase four

  const phaseFourCylinder = circle(scene, 2.5, 2.5, 5, "", 0x333333);
  phaseFourCylinder.rotation.x = THREE.MathUtils.degToRad(90);

  const phaseFourBlock = box(scene, 10, 5, 5, "", 1, 1, 0x333333);
  phaseFourBlock.position.x = 5;

  const phaseFourCone = cone(scene, 2, 10, 6, "", 0x333333);
  phaseFourCone.rotation.z = THREE.MathUtils.degToRad(-90);
  phaseFourCone.position.x = 15;

  // const phaseFourContainer = new THREE.Object3D();
  // phaseFourContainer.add(phaseFourCylinder, phaseFourBlock, phaseFourCone);

  phaseFour.add(phaseFourCylinder, phaseFourBlock, phaseFourCone);

  phaseFour.position.x = 27.5;
  phaseFour.position.y = 27.5;
  phaseFour.position.z = -2.5;
  phaseFour.rotation.z = THREE.MathUtils.degToRad(-90);

  // scene.add(phaseFour);

  const robotObj = new THREE.Object3D();
  robotObj.add(basisGroup, phaseOne, phaseTwo, phaseThree, phaseFour);

  phaseOne.attach(phaseTwo);
  phaseTwo.attach(phaseThree);
  phaseThree.attach(phaseFour);

  robotObj.position.set(x, y, z);
  robotObj.rotation.y = THREE.MathUtils.degToRad(r);

  scene.add(robotObj);

  return { phaseOne, phaseTwo, phaseThree, phaseFour };

  // const phaseOneRotationSpeed = 0.01;
  // scene.onBeforeRender = function () {
  //   addSmoke(scene, new THREE.Vector3(100, 100, 0));
  // rotateAll.rotation.y += phaseOneRotationSpeed;
  // phaseTwo.rotation.z += phaseOneRotationSpeed;
  // phaseThree.rotation.z += phaseOneRotationSpeed;
  // phaseFour.rotation.z += phaseOneRotationSpeed;
  // };
}
