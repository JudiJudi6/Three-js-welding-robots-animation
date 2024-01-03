import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { robot1 } from "./robot1";
import { robot2 } from "./robot2";
import { robot3 } from "./robot3";
import { addSmoke } from "./particles";
import { box } from "./meshes/Box";

export function robots(scene) {
  //animowany blok
  let elementPosition;
  let weldFlag1;
  let weldFlag2;
  const element = box(scene, 25, 10, 25, "metal.jpg");
  element.position.y = 32;
  element.position.x = 320;

  const table = box(scene, 150, 25, 150);
  table.position.y = 12.5;

  const weldingRobot1 = robot1(scene, 0, 0, 100, 90);
  weldingRobot1.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);
  const weldingRobot2 = robot1(scene, 0, 0, -100, -90);
  weldingRobot2.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);

  // createConveyorBelt(scene, new THREE.Vector3(100,0,0), new THREE.Vector3(-100,0,0));
  const helperRobot = robot2(scene, 0, 0, 0);
  helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(180);
  const ridingRobot = robot3(scene, 200, 6, 0);

  const weldingParticles = addSmoke(scene, new THREE.Vector3(0, 40, -62));

  // const phaseOneRotationSpeed = 0.01;

  // const tween1 = new TWEEN.Tween({ x: 100 })
  //   .to({ x: 300 }, 2000)
  //   .onUpdate((coords) => {
  //     ridingRobot.robotObj.position.x = coords.x;
  //   })
  //   .yoyo(true)
  //   .start();

  const tweenR1GetToMainTable1 = new TWEEN.Tween({ xPos: 200 })
    .to({ xPos: 275 }, 1000)
    .onUpdate((coords) => {
      ridingRobot.robotObj.position.x = coords.xPos;
    })
    .onComplete(() => {
      ridingRobot.robotObj.position.x = 275;
      ridingRobot.phaseTwo.attach(element);
    });

  const tweenR1GetToMainTable2 = new TWEEN.Tween({
    xPos: 275,
    yRot: THREE.MathUtils.degToRad(0),
  })
    .to({ xPos: 105, yRot: THREE.MathUtils.degToRad(180) }, 3500)
    .onUpdate((coords) => {
      ridingRobot.robotObj.position.x = coords.xPos;
      ridingRobot.phaseTwo.rotation.z = coords.yRot;
    })
    .onComplete(() => {
      ridingRobot.robotObj.position.x = 105;
      ridingRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(180);

      table.attach(element);
    });

  const tweenR1GetToMainTable3 = new TWEEN.Tween({
    xPos: 105,
    yRot: THREE.MathUtils.degToRad(180),
  })
    .to({ xPos: 200, yRot: THREE.MathUtils.degToRad(0) }, 2000)
    .onUpdate((coords) => {
      ridingRobot.robotObj.position.x = coords.xPos;
      ridingRobot.phaseTwo.rotation.z = coords.yRot;
    })
    .onComplete(() => {
      ridingRobot.robotObj.position.x = 200;
      ridingRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(0);
    });

  const tweenR2GetFormStart = new TWEEN.Tween({
    yRotate: THREE.MathUtils.degToRad(180),
  })
    .to({ yRotate: THREE.MathUtils.degToRad(0) }, 1500)
    .onUpdate((coords) => {
      helperRobot.phaseOne.rotation.y = coords.yRotate;
    })
    .onComplete(() => {
      helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(0);
    });

  const tweenR2GetToR1 = new TWEEN.Tween({
    yRotate: THREE.MathUtils.degToRad(0),
  })
    .to({ yRotate: THREE.MathUtils.degToRad(90) }, 750)
    .onUpdate((coords) => {
      helperRobot.phaseOne.rotation.y = coords.yRotate;
    })
    .onComplete(() => {
      helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);
    });

  const tweenR2BackToDefaultFromR1 = new TWEEN.Tween({
    yRotate: THREE.MathUtils.degToRad(90),
  })
    .to({ yRotate: THREE.MathUtils.degToRad(180) }, 750)
    .onUpdate((coords) => {
      helperRobot.phaseOne.rotation.y = coords.yRotate;
    })
    .onComplete(() => {
      helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(180);
    });

  const tweenR2GetFormTableDown = new TWEEN.Tween({
    zRotTwo: THREE.MathUtils.degToRad(45),
    zRotThree: THREE.MathUtils.degToRad(-45),
    zRotFour: THREE.MathUtils.degToRad(0),
  })
    .to(
      {
        zRotTwo: THREE.MathUtils.degToRad(15),
        zRotThree: THREE.MathUtils.degToRad(-25),
        zRotFour: THREE.MathUtils.degToRad(10),
      },
      2000
    )
    .onUpdate((coords) => {
      helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
      helperRobot.phaseThree.rotation.z = coords.zRotThree;
      helperRobot.phaseFour.rotation.z = coords.zRotFour;
    })
    .onComplete(() => {
      helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(15);
      helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-25);
      helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(10);
      helperRobot.phaseFour.attach(element);
    });

  const tweenR2GetFormTableDown2 = new TWEEN.Tween({
    zRotTwo: THREE.MathUtils.degToRad(45),
    zRotThree: THREE.MathUtils.degToRad(-45),
    zRotFour: THREE.MathUtils.degToRad(0),
  })
    .to(
      {
        zRotTwo: THREE.MathUtils.degToRad(15),
        zRotThree: THREE.MathUtils.degToRad(-25),
        zRotFour: THREE.MathUtils.degToRad(10),
      },
      2000
    )
    .onUpdate((coords) => {
      helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
      helperRobot.phaseThree.rotation.z = coords.zRotThree;
      helperRobot.phaseFour.rotation.z = coords.zRotFour;
    })
    .onComplete(() => {
      helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(15);
      helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-25);
      helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(10);
      table.attach(element);
    });

  const tweenR2GetFormTableUp = new TWEEN.Tween({
    zRotTwo: THREE.MathUtils.degToRad(15),
    zRotThree: THREE.MathUtils.degToRad(-25),
    zRotFour: THREE.MathUtils.degToRad(10),
  })
    .to(
      {
        zRotTwo: THREE.MathUtils.degToRad(45),
        zRotThree: THREE.MathUtils.degToRad(-45),
        zRotFour: THREE.MathUtils.degToRad(0),
      },
      2000
    )
    .onUpdate((coords) => {
      helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
      helperRobot.phaseThree.rotation.z = coords.zRotThree;
      helperRobot.phaseFour.rotation.z = coords.zRotFour;
    })
    .onComplete(() => {
      helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(45);
      helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-45);
      helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(0);
    });

  const tweenR2GetFormTableUp2 = new TWEEN.Tween({
    zRotTwo: THREE.MathUtils.degToRad(15),
    zRotThree: THREE.MathUtils.degToRad(-25),
    zRotFour: THREE.MathUtils.degToRad(10),
  })
    .to(
      {
        zRotTwo: THREE.MathUtils.degToRad(45),
        zRotThree: THREE.MathUtils.degToRad(-45),
        zRotFour: THREE.MathUtils.degToRad(0),
      },
      2000
    )
    .onUpdate((coords) => {
      helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
      helperRobot.phaseThree.rotation.z = coords.zRotThree;
      helperRobot.phaseFour.rotation.z = coords.zRotFour;
    })
    .onComplete(() => {
      helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(45);
      helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-45);
      helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(0);
      // helperRobot.phaseOne.attach(element)
    });

  const tweenR1Up = new TWEEN.Tween({
    zRotThree: THREE.MathUtils.degToRad(-135),
  })
    .to(
      {
        zRotThree: THREE.MathUtils.degToRad(-100),
      },
      2000
    )
    .onUpdate((coords) => {
      weldingRobot2.phaseThree.rotation.z = coords.zRotThree;
    })
    .onComplete(() => {
      weldingRobot2.phaseThree.rotation.z = THREE.MathUtils.degToRad(-100);
    });

  const tweenR31weldStart = new TWEEN.Tween({
    yRotOne: THREE.MathUtils.degToRad(90),
    zRotTwo: THREE.MathUtils.degToRad(135),
    zRotThree: THREE.MathUtils.degToRad(-100),
    zRotFour: THREE.MathUtils.degToRad(-90),
  })
    .to(
      {
        yRotOne: THREE.MathUtils.degToRad(0),
        zRotTwo: THREE.MathUtils.degToRad(110),
        zRotThree: THREE.MathUtils.degToRad(-75),
        zRotFour: THREE.MathUtils.degToRad(-125),
      },
      2000
    )
    .onUpdate((coords) => {
      weldingRobot2.phaseOne.rotation.y = coords.yRotOne;
      weldingRobot2.phaseTwo.rotation.z = coords.zRotTwo;
      weldingRobot2.phaseThree.rotation.z = coords.zRotThree;
      weldingRobot2.phaseFour.rotation.z = coords.zRotFour;
    })
    .onComplete(() => {
      weldingRobot2.phaseOne.rotation.y = THREE.MathUtils.degToRad(0);
      weldingRobot2.phaseTwo.rotation.z = THREE.MathUtils.degToRad(110);
      weldingRobot2.phaseThree.rotation.z = THREE.MathUtils.degToRad(-75);
      weldingRobot2.phaseFour.rotation.z = THREE.MathUtils.degToRad(-125);
      weldFlag1 = true;
      setTimeout(() => {
        weldFlag1 = false;
      }, 1500);
    });

  tweenR1GetToMainTable1.start();
  tweenR1GetToMainTable1.chain(tweenR1GetToMainTable2);
  tweenR1GetToMainTable2.chain(tweenR1GetToMainTable3);
  tweenR2GetFormStart.delay(4500).start();
  tweenR2GetFormStart.chain(tweenR2GetFormTableDown);
  tweenR2GetFormTableDown.chain(tweenR2GetFormTableUp);
  tweenR2GetFormTableUp.chain(tweenR2GetToR1);
  tweenR2GetToR1.chain(tweenR2GetFormTableDown2);
  tweenR2GetFormTableDown2.chain(tweenR2GetFormTableUp2);
  tweenR2GetFormTableUp2.chain(tweenR2BackToDefaultFromR1);
  tweenR2BackToDefaultFromR1.chain(tweenR1Up);
  tweenR1Up.chain(tweenR31weldStart);

  // tweenR1Up.start();
  // tweenR1Up.chain(tweenR31weldStart)

  scene.onBeforeRender = function () {
    TWEEN.update();
    if (weldFlag1) {
      weldingParticles();
    }
  };
}
