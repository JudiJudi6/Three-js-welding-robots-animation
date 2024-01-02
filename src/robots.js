import * as THREE from "three";
import { createConveyorBelt } from "./belt";
import { robot1 } from "./robot1";
import { robot2 } from "./robot2";
import { addSmoke } from "./particles";
import { generateLightFlashes } from "./flashes";

export function robots(scene) {
  const weldingRobot1 = robot1(scene, 0, 0, 100, 90);
  const weldingRobot2 = robot1(scene, 0, 0, -100, -90);

  createConveyorBelt(scene, new THREE.Vector3(100,0,0), new THREE.Vector3(-100,0,0));

 const helperRobot = robot2(scene)

  const phaseOneRotationSpeed = 0.01;
  scene.onBeforeRender = function () {
    addSmoke(scene, new THREE.Vector3(0, 30, 62));
    // generateLightFlashes(scene, new THREE.Vector3(200, 30,0));
    // weldingRobot1.phaseOne.rotation.y += phaseOneRotationSpeed;
    // weldingRobot1.phaseTwo.rotation.z += phaseOneRotationSpeed;
    // weldingRobot1.phaseThree.rotation.z += phaseOneRotationSpeed;
    // weldingRobot1.phaseFour.rotation.z += phaseOneRotationSpeed;
    
    weldingRobot1.phaseTwo.rotation.z = THREE.MathUtils.degToRad(120);
    weldingRobot1.phaseThree.rotation.z = THREE.MathUtils.degToRad(-90);
    weldingRobot1.phaseFour.rotation.z = THREE.MathUtils.degToRad(240);

    weldingRobot2.phaseTwo.rotation.z = THREE.MathUtils.degToRad(120);
    weldingRobot2.phaseThree.rotation.z = THREE.MathUtils.degToRad(-90);
    weldingRobot2.phaseFour.rotation.z = THREE.MathUtils.degToRad(240);

    helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(240);
    // helperRobot.phaseTwo.rotation.z += phaseOneRotationSpeed
    // helperRobot.phaseThree.rotation.z += phaseOneRotationSpeed
    // helperRobot.phaseFour.rotation.z += phaseOneRotationSpeed
    // conveyorBelt1()

  };
}
