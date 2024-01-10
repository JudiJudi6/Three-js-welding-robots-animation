import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { robot1 } from "./robot1";
import { robot2 } from "./robot2";
import { robot3 } from "./robot3";
import { addSmoke } from "./particles";
import { box } from "./meshes/Box";

export function robots(scene) {
  let particlesPosition = new THREE.Vector3(0, -40, 0);
  let weldFlag1;
  let weldFlag2;
  const element = box(scene, 25, 10, 25, "metal.jpg");
  element.position.y = 32;
  element.position.x = 320;

  const table = box(scene, 150, 25, 150);
  table.position.y = 12.5;

  const table2 = box(scene, 100, 25, 100);
  table2.position.y = 12.5;
  table2.position.x = 350;

  const weldingRobot1 = robot1(scene, 0, 0, 100, 90);
  weldingRobot1.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);
  const weldingRobot2 = robot1(scene, 0, 0, -100, -90);
  weldingRobot2.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);

  const helperRobot = robot2(scene, 0, 0, 0);
  helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(180);
  const ridingRobot = robot3(scene, 200, 6, 0);

  const weldingParticles = addSmoke(scene, particlesPosition);

  const tweenR1GetToMainTable1 = new TWEEN.Tween({
    xPos: 200,
    zRot: THREE.MathUtils.degToRad(0),
  })
    .to({ xPos: 275, zRot: THREE.MathUtils.degToRad(-600) }, 1500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      ridingRobot.robotObj.position.x = coords.xPos;
      ridingRobot.wheelsFront.rotation.z = coords.zRot;
      ridingRobot.wheelsBack.rotation.z = coords.zRot;
    })
    .onComplete(() => {
      ridingRobot.robotObj.position.x = 275;
      ridingRobot.phaseTwo.attach(element);
      ridingRobot.wheelsFront.rotation.z = THREE.MathUtils.degToRad(-600);
      ridingRobot.wheelsBack.rotation.z = THREE.MathUtils.degToRad(-600);
    });

  const tweenR1GetToMainTable2 = new TWEEN.Tween({
    xPos: 275,
    yRot: THREE.MathUtils.degToRad(0),
    zRot: THREE.MathUtils.degToRad(-600),
  })
    .to(
      {
        xPos: 105,
        yRot: THREE.MathUtils.degToRad(180),
        zRot: THREE.MathUtils.degToRad(400),
      },
      3500
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      ridingRobot.robotObj.position.x = coords.xPos;
      ridingRobot.phaseTwo.rotation.z = coords.yRot;
      ridingRobot.wheelsFront.rotation.z = coords.zRot;
      ridingRobot.wheelsBack.rotation.z = coords.zRot;
    })
    .onComplete(() => {
      ridingRobot.robotObj.position.x = 105;
      ridingRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(180);
      ridingRobot.wheelsFront.rotation.z = THREE.MathUtils.degToRad(400);
      ridingRobot.wheelsBack.rotation.z = THREE.MathUtils.degToRad(400);

      table.attach(element);
    });

  const tweenR1GetToMainTable3 = new TWEEN.Tween({
    xPos: 105,
    yRot: THREE.MathUtils.degToRad(180),
    zRot: THREE.MathUtils.degToRad(400),
  })
    .to(
      {
        xPos: 200,
        yRot: THREE.MathUtils.degToRad(0),
        zRot: THREE.MathUtils.degToRad(0),
      },
      2000
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      ridingRobot.robotObj.position.x = coords.xPos;
      ridingRobot.phaseTwo.rotation.z = coords.yRot;
      ridingRobot.wheelsFront.rotation.z = coords.zRot;
      ridingRobot.wheelsBack.rotation.z = coords.zRot;
    })
    .onComplete(() => {
      ridingRobot.robotObj.position.x = 200;
      ridingRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(0);
      ridingRobot.wheelsFront.rotation.z = THREE.MathUtils.degToRad(0);
      ridingRobot.wheelsBack.rotation.z = THREE.MathUtils.degToRad(0);
    });

  const tweenR1GetToBack1 = new TWEEN.Tween({
    xPos: 200,
    yRot: THREE.MathUtils.degToRad(0),
    zRot: THREE.MathUtils.degToRad(0),
  })
    .to(
      {
        xPos: 105,
        yRot: THREE.MathUtils.degToRad(180),
        zRot: THREE.MathUtils.degToRad(400),
      },
      2000
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      ridingRobot.robotObj.position.x = coords.xPos;
      ridingRobot.phaseTwo.rotation.z = coords.yRot;
      ridingRobot.wheelsFront.rotation.z = coords.zRot;
      ridingRobot.wheelsBack.rotation.z = coords.zRot;
    })
    .onComplete(() => {
      ridingRobot.robotObj.position.x = 105;
      ridingRobot.phaseTwo.attach(element);
      ridingRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(0);
      ridingRobot.wheelsFront.rotation.z = THREE.MathUtils.degToRad(400);
      ridingRobot.wheelsBack.rotation.z = THREE.MathUtils.degToRad(400);
    });

  const tweenR1GetBack2 = new TWEEN.Tween({
    xPos: 105,
    yRot: THREE.MathUtils.degToRad(180),
    zRot: THREE.MathUtils.degToRad(400),
  })
    .to(
      {
        xPos: 275,
        yRot: THREE.MathUtils.degToRad(0),
        zRot: THREE.MathUtils.degToRad(-600),
      },
      3500
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      ridingRobot.robotObj.position.x = coords.xPos;
      ridingRobot.phaseTwo.rotation.z = coords.yRot;
      ridingRobot.wheelsFront.rotation.z = coords.zRot;
      ridingRobot.wheelsBack.rotation.z = coords.zRot;
    })
    .onComplete(() => {
      ridingRobot.robotObj.position.x = 275;
      ridingRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(0);
      ridingRobot.wheelsFront.rotation.z = THREE.MathUtils.degToRad(-600);
      ridingRobot.wheelsBack.rotation.z = THREE.MathUtils.degToRad(-600);

      table2.attach(element);
    });

  const tweenR1GetBack3 = new TWEEN.Tween({
    xPos: 275,
    zRot: THREE.MathUtils.degToRad(-600),
  })
    .to({ xPos: 200, zRot: THREE.MathUtils.degToRad(0) }, 1500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      ridingRobot.robotObj.position.x = coords.xPos;
      ridingRobot.wheelsFront.rotation.z = coords.zRot;
      ridingRobot.wheelsBack.rotation.z = coords.zRot;
    })
    .onComplete(() => {
      ridingRobot.robotObj.position.x = 200;
      ridingRobot.wheelsFront.rotation.z = THREE.MathUtils.degToRad(0);
      ridingRobot.wheelsBack.rotation.z = THREE.MathUtils.degToRad(0);
    });

  const tweenR2GetFormStart = new TWEEN.Tween({
    yRotate: THREE.MathUtils.degToRad(180),
  })
    .to({ yRotate: THREE.MathUtils.degToRad(0) }, 1500)
    .easing(TWEEN.Easing.Quadratic.InOut)
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      helperRobot.phaseOne.rotation.y = coords.yRotate;
    })
    .onComplete(() => {
      helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(180);
    });

  const tweenR2BackToDefaultFromR2 = new TWEEN.Tween({
    yRotate: THREE.MathUtils.degToRad(-90),
  })
    .to({ yRotate: THREE.MathUtils.degToRad(-180) }, 750)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      helperRobot.phaseOne.rotation.y = coords.yRotate;
    })
    .onComplete(() => {
      helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(-180);
    });

  const tweenR2BackFromDefaulttoR2 = new TWEEN.Tween({
    yRotate: THREE.MathUtils.degToRad(-180),
  })
    .to({ yRotate: THREE.MathUtils.degToRad(-90) }, 750)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      helperRobot.phaseOne.rotation.y = coords.yRotate;
    })
    .onComplete(() => {
      helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(-90);
    });

  const tweenR2BackFromR2ToTable = new TWEEN.Tween({
    yRotate: THREE.MathUtils.degToRad(-90),
  })
    .to({ yRotate: THREE.MathUtils.degToRad(0) }, 750)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      helperRobot.phaseOne.rotation.y = coords.yRotate;
    })
    .onComplete(() => {
      helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(0);
    });

  const tweenR2BackFromTableToDefault = new TWEEN.Tween({
    yRotate: THREE.MathUtils.degToRad(0),
  })
    .to({ yRotate: THREE.MathUtils.degToRad(180) }, 750)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      helperRobot.phaseOne.rotation.y = coords.yRotate;
    })
    .onComplete(() => {
      helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(180);
    });

  const tweenR2GetFromR1ToR2 = new TWEEN.Tween({
    yRotate: THREE.MathUtils.degToRad(180),
  })
    .to({ yRotate: THREE.MathUtils.degToRad(90) }, 750)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      helperRobot.phaseOne.rotation.y = coords.yRotate;
    })
    .onComplete(() => {
      helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);
    });

  const tweenR2GetFromR1ToR22 = new TWEEN.Tween({
    yRotate: THREE.MathUtils.degToRad(90),
  })
    .to({ yRotate: THREE.MathUtils.degToRad(-90) }, 750)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      helperRobot.phaseOne.rotation.y = coords.yRotate;
    })
    .onComplete(() => {
      helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(-90);
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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

  const tweenR2GetFormTableDown3 = new TWEEN.Tween({
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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

  const tweenR2GetFormTableDown4 = new TWEEN.Tween({
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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

  const tweenR2GetFormTableDown5 = new TWEEN.Tween({
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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

  const tweenR2GetFormTableDown6 = new TWEEN.Tween({
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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

  const tweenR2GetFormTableUp3 = new TWEEN.Tween({
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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

  const tweenR2GetFormTableUp4 = new TWEEN.Tween({
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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

  const tweenR2GetFormTableUp5 = new TWEEN.Tween({
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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

  const tweenR2GetFormTableUp6 = new TWEEN.Tween({
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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

  const tweenR1Up = new TWEEN.Tween({
    zRotThree: THREE.MathUtils.degToRad(-135),
  })
    .to(
      {
        zRotThree: THREE.MathUtils.degToRad(-100),
      },
      2000
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      weldingRobot2.phaseThree.rotation.z = coords.zRotThree;
    })
    .onComplete(() => {
      weldingRobot2.phaseThree.rotation.z = THREE.MathUtils.degToRad(-100);
    });

  const tweenR1Down = new TWEEN.Tween({
    zRotThree: THREE.MathUtils.degToRad(-100),
  })
    .to(
      {
        zRotThree: THREE.MathUtils.degToRad(-135),
      },
      2000
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      weldingRobot2.phaseThree.rotation.z = coords.zRotThree;
    })
    .onComplete(() => {
      weldingRobot2.phaseThree.rotation.z = THREE.MathUtils.degToRad(-135);
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
    .easing(TWEEN.Easing.Quadratic.InOut)
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

      particlesPosition = new THREE.Vector3(3, 35, -60);
      setTimeout(() => {
        particlesPosition = new THREE.Vector3(0, -40, 0);
      }, 1500);
    });

  const tweenR31weldEnd = new TWEEN.Tween({
    yRotOne: THREE.MathUtils.degToRad(0),
    zRotTwo: THREE.MathUtils.degToRad(110),
    zRotThree: THREE.MathUtils.degToRad(-75),
    zRotFour: THREE.MathUtils.degToRad(-125),
  })
    .to(
      {
        yRotOne: THREE.MathUtils.degToRad(90),
        zRotTwo: THREE.MathUtils.degToRad(135),
        zRotThree: THREE.MathUtils.degToRad(-100),
        zRotFour: THREE.MathUtils.degToRad(-90),
      },
      2000
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      weldingRobot2.phaseOne.rotation.y = coords.yRotOne;
      weldingRobot2.phaseTwo.rotation.z = coords.zRotTwo;
      weldingRobot2.phaseThree.rotation.z = coords.zRotThree;
      weldingRobot2.phaseFour.rotation.z = coords.zRotFour;
    })
    .onComplete(() => {
      weldingRobot2.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);
      weldingRobot2.phaseTwo.rotation.z = THREE.MathUtils.degToRad(135);
      weldingRobot2.phaseThree.rotation.z = THREE.MathUtils.degToRad(-100);
      weldingRobot2.phaseFour.rotation.z = THREE.MathUtils.degToRad(-90);
    });

  const tweenR2Up = new TWEEN.Tween({
    zRotThree: THREE.MathUtils.degToRad(-135),
  })
    .to(
      {
        zRotThree: THREE.MathUtils.degToRad(-100),
      },
      2000
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      weldingRobot1.phaseThree.rotation.z = coords.zRotThree;
    })
    .onComplete(() => {
      weldingRobot1.phaseThree.rotation.z = THREE.MathUtils.degToRad(-100);
    });

  const tweenR2Down = new TWEEN.Tween({
    zRotThree: THREE.MathUtils.degToRad(-100),
  })
    .to(
      {
        zRotThree: THREE.MathUtils.degToRad(-135),
      },
      2000
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      weldingRobot1.phaseThree.rotation.z = coords.zRotThree;
    })
    .onComplete(() => {
      weldingRobot1.phaseThree.rotation.z = THREE.MathUtils.degToRad(-135);
    });

  const tweenR32weldStart = new TWEEN.Tween({
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
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      weldingRobot1.phaseOne.rotation.y = coords.yRotOne;
      weldingRobot1.phaseTwo.rotation.z = coords.zRotTwo;
      weldingRobot1.phaseThree.rotation.z = coords.zRotThree;
      weldingRobot1.phaseFour.rotation.z = coords.zRotFour;
    })
    .onComplete(() => {
      weldingRobot1.phaseOne.rotation.y = THREE.MathUtils.degToRad(0);
      weldingRobot1.phaseTwo.rotation.z = THREE.MathUtils.degToRad(110);
      weldingRobot1.phaseThree.rotation.z = THREE.MathUtils.degToRad(-75);
      weldingRobot1.phaseFour.rotation.z = THREE.MathUtils.degToRad(-125);
      weldFlag1 = true;

      particlesPosition = new THREE.Vector3(-3, 35, 60);
      setTimeout(() => {
        particlesPosition = new THREE.Vector3(0, -40, 0);
      }, 1500);
    });

  const tweenR32weldEnd = new TWEEN.Tween({
    yRotOne: THREE.MathUtils.degToRad(0),
    zRotTwo: THREE.MathUtils.degToRad(110),
    zRotThree: THREE.MathUtils.degToRad(-75),
    zRotFour: THREE.MathUtils.degToRad(-125),
  })
    .to(
      {
        yRotOne: THREE.MathUtils.degToRad(90),
        zRotTwo: THREE.MathUtils.degToRad(135),
        zRotThree: THREE.MathUtils.degToRad(-100),
        zRotFour: THREE.MathUtils.degToRad(-90),
      },
      2000
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((coords) => {
      weldingRobot1.phaseOne.rotation.y = coords.yRotOne;
      weldingRobot1.phaseTwo.rotation.z = coords.zRotTwo;
      weldingRobot1.phaseThree.rotation.z = coords.zRotThree;
      weldingRobot1.phaseFour.rotation.z = coords.zRotFour;
    })
    .onComplete(() => {
      weldingRobot1.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);
      weldingRobot1.phaseTwo.rotation.z = THREE.MathUtils.degToRad(135);
      weldingRobot1.phaseThree.rotation.z = THREE.MathUtils.degToRad(-100);
      weldingRobot1.phaseFour.rotation.z = THREE.MathUtils.degToRad(-90);
    });

  tweenR1GetToMainTable1.start();
  tweenR1GetToMainTable1.chain(tweenR1GetToMainTable2);
  tweenR1GetToMainTable2.chain(tweenR1GetToMainTable3);
  tweenR1GetToMainTable3.chain(tweenR2GetFormStart);
  tweenR2GetFormStart.chain(tweenR2GetFormTableDown);
  tweenR2GetFormTableDown.chain(tweenR2GetFormTableUp);
  tweenR2GetFormTableUp.chain(tweenR2GetToR1);
  tweenR2GetToR1.chain(tweenR2GetFormTableDown2);
  tweenR2GetFormTableDown2.chain(tweenR2GetFormTableUp2);
  tweenR2GetFormTableUp2.chain(tweenR2BackToDefaultFromR1);
  tweenR2BackToDefaultFromR1.chain(tweenR1Up);
  tweenR1Up.chain(tweenR31weldStart);

  tweenR1Up.chain(tweenR31weldStart);
  tweenR31weldStart.chain(tweenR31weldEnd.delay(2000));
  tweenR31weldEnd.chain(tweenR1Down);
  tweenR1Down.chain(tweenR2GetFromR1ToR2);
  tweenR2GetFromR1ToR2.chain(tweenR2GetFormTableDown3);
  tweenR2GetFormTableDown3.chain(tweenR2GetFormTableUp3);
  tweenR2GetFormTableUp3.chain(tweenR2GetFromR1ToR22);
  tweenR2GetFromR1ToR22.chain(tweenR2GetFormTableDown4);
  tweenR2GetFormTableDown4.chain(tweenR2GetFormTableUp4);
  tweenR2GetFormTableUp4.chain(tweenR2BackToDefaultFromR2);
  tweenR2BackToDefaultFromR2.chain(tweenR2Up);
  tweenR2Up.chain(tweenR32weldStart);
  tweenR32weldStart.chain(tweenR32weldEnd.delay(2000));
  tweenR32weldEnd.chain(tweenR2Down);
  tweenR2Down.chain(tweenR2BackFromDefaulttoR2);
  tweenR2BackFromDefaulttoR2.chain(tweenR2GetFormTableDown5);
  tweenR2GetFormTableDown5.chain(tweenR2GetFormTableUp5);
  tweenR2GetFormTableUp5.chain(tweenR2BackFromR2ToTable);
  tweenR2BackFromR2ToTable.chain(tweenR2GetFormTableDown6);
  tweenR2GetFormTableDown6.chain(tweenR2GetFormTableUp6);
  tweenR2GetFormTableUp6.chain(tweenR2BackFromTableToDefault);
  tweenR2BackFromTableToDefault.chain(tweenR1GetToBack1);
  tweenR1GetToBack1.chain(tweenR1GetBack2);
  tweenR1GetBack2.chain(tweenR1GetBack3);
  tweenR1GetBack3.chain(tweenR1GetToMainTable1.delay(2000));

  scene.onBeforeRender = function () {
    TWEEN.update();
    weldingParticles(particlesPosition);
  };
}
