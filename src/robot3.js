import * as THREE from "three";
import { box } from "./meshes/Box";
import { circle } from "./meshes/Circle";

export function robot3(scene, x, y, z) {
  const wheelsFront = new THREE.Group();
  const wheelsBack = new THREE.Group();
  const basis = new THREE.Group();
  const phaseOne = new THREE.Group();
  const phaseTwo = new THREE.Group();

  //wheels

  const wheel1 = circle(scene, 5, 5, 3, "wheel.jpg", 0x888888);
  wheel1.rotation.x = THREE.MathUtils.degToRad(90);
  wheel1.position.z = 15;
  wheelsFront.add(wheel1);

  const wheel2 = circle(scene, 5, 5, 3, "wheel.jpg", 0x888888);
  wheel2.rotation.x = THREE.MathUtils.degToRad(90);
  wheel2.position.z = -15;
  wheelsFront.add(wheel2);

  const wheel3 = circle(scene, 5, 5, 3, "wheel.jpg", 0x888888);
  wheel3.rotation.x = THREE.MathUtils.degToRad(90);
  wheel3.position.z = 15;
  wheelsBack.add(wheel3);

  const wheel4 = circle(scene, 5, 5, 3, "wheel.jpg", 0x888888);
  wheel4.rotation.x = THREE.MathUtils.degToRad(90);
  wheel4.position.z = -15;
  wheelsBack.add(wheel4);

  wheelsFront.position.x = 15;
  wheelsBack.position.x = -15;
  scene.add(wheelsFront);
  scene.add(wheelsBack);

  //basis

  const basisBlock = box(scene, 40, 10, 30, "robotTexture.jpg", 1, 1, 0xc18ddd);
  basisBlock.position.y = 4;

  basis.add(basisBlock);
  //   scene.add(basisBlock)

  //phase one

  const phaseOneCylinder = circle(scene, 5, 10, 15, "robotTexture.jpg", 0xaaffcc);
  phaseOneCylinder.position.y = 10;

  const phaseOneCylinder2 = circle(scene, 8, 8, 5, "robotTexture.jpg", 0xaaffcc);
  phaseOneCylinder2.position.y = 20;

  const phaseOneBlock = box(scene, 8, 15, 2, "robotTexture.jpg", 1, 1, 0xaaffcc);
  phaseOneBlock.position.y = 25;
  phaseOneBlock.position.z = -8;

  const phaseOneBlock2 = box(scene, 8, 15, 2, "robotTexture.jpg", 1, 1, 0xaaffcc);
  phaseOneBlock2.position.y = 25;
  phaseOneBlock2.position.z = 8;

  phaseOne.add(
    phaseOneCylinder,
    phaseOneCylinder2,
    phaseOneBlock,
    phaseOneBlock2
  );
  phaseOne.position.y = -3;
  //   phase two
  
  const phaseTwoCylinder1 = circle(scene, 5, 5, 15, "robotTexture.jpg", 0xbbd11d);
  phaseTwoCylinder1.rotation.x = THREE.MathUtils.degToRad(90);
  
  const phaseTwoBlock = box(scene, 30, 10, 7, "robotTexture.jpg", 1, 1, 0xbbd11d);
  phaseTwoBlock.position.x = 15;

  const phaseTwoBlock2 = box(scene, 5, 20, 10, "robotTexture.jpg", 1, 1, 0xbbd11d);
  phaseTwoBlock2.position.x = 30;
  phaseTwoBlock2.rotation.x = THREE.MathUtils.degToRad(90);
  
  phaseTwo.add(phaseTwoCylinder1, phaseTwoBlock, phaseTwoBlock2);
  phaseTwo.position.y = 25;
  //   phaseTwo.rotation.z = THREE.MathUtils.degToRad(45);
  
  const robotObj = new THREE.Object3D();
  robotObj.add(basis, wheelsFront, wheelsBack, phaseOne, phaseTwo);
  robotObj.position.set(x, y, z);
  scene.add(robotObj);
  
  phaseOne.attach(phaseTwo);
  
  return { robotObj, wheelsFront, wheelsBack, phaseOne, phaseTwo };
}
