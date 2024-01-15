import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { robot1 } from "./robot1";
import { robot2 } from "./robot2";
import { robot3 } from "./robot3";
import { addSmoke } from "./particles";
import { box } from "./meshes/Box";
import gsap from "gsap";

export function robots(scene, camera, controls) {
  let counter = 0;
  let tla = gsap.timeline();
  let secondTla = gsap.timeline();

  let particlesPosition = new THREE.Vector3(0, -40, 0);
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

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      // if(counter )
      counter += 1;
      console.log(counter);
      // 1

      if (counter === 1) {
        gsap
          .to(camera.position, {
            duration: 3,
            x: 100,
            y: 50,
            z: -150,
            // ease: "power1.in",
            onStart: () => {
              return gsap.to(controls.target, {
                duration: 3,
                x: 320,
                y: 50,
              });
            },
          })
          .then(() => {
            return gsap.to(camera.position, {
              duration: 2,
              x: 250,
              y: 50,
              z: -150,
              ease: "power1.inOut",
            });
          });

        gsap.to(ridingRobot.robotObj.position, {
          duration: 2,
          x: 275,
          ease: "power1.inOut",
          delay: 1.3,
          onComplete: () => {
            ridingRobot.phaseTwo.attach(element);
          },
        });
        gsap.to(ridingRobot.wheelsBack.rotation, {
          duration: 2,
          z: -400,
          delay: 1.3,
        });
        gsap.to(ridingRobot.wheelsFront.rotation, {
          duration: 2,
          z: -400,
          delay: 1.3,
        });
      }

      // 2

      if (counter === 2) {
        gsap.to(controls.target, {
          duration: 4,
          x: 100,
          y: 50,
          z: 0,
        });
        gsap.to(camera.position, {
          duration: 5,
          x: 100,
          y: 50,
          z: -150,
          ease: "power1.inOut",
        });

        gsap.to(ridingRobot.robotObj.position, {
          duration: 4,
          x: 105,
          ease: "power1.inOut",
          onComplete: () => {
            table.attach(element);
          },
        });
        gsap.to(ridingRobot.phaseTwo.rotation, {
          duration: 4,
          z: THREE.MathUtils.degToRad(180),
          ease: "power1.inOut",
          onComplete: () => {
            table.attach(element);
          },
        });
        gsap.to(ridingRobot.wheelsBack.rotation, {
          duration: 4,
          z: 200,
        });
        gsap.to(ridingRobot.wheelsFront.rotation, {
          duration: 4,
          z: 200,
        });
      }

      if (counter === 3) {
        gsap.to(camera.position, {
          duration: 2.5,
          x: 0,
          z: 140,
          y: 140,
          ease: "power1.inOut",
        });
        gsap.to(controls.target, {
          duration: 2.5,
          x: 50,
          y: 50,
          z: 0,
          ease: "power1.inOut",
        });
        gsap.to(ridingRobot.robotObj.position, {
          duration: 2,
          x: 200,
          ease: "power1.inOut",
        });
        gsap.to(ridingRobot.phaseTwo.rotation, {
          duration: 2,
          z: THREE.MathUtils.degToRad(0),
          ease: "power1.inOut",
        });
        gsap.to(ridingRobot.wheelsBack.rotation, {
          duration: 2,
          z: 200,
        });
        gsap.to(ridingRobot.wheelsFront.rotation, {
          duration: 2,
          z: 200,
        });
      }
    }

    if (counter === 4) {
      tla
        .to(helperRobot.phaseOne.rotation, {
          duration: 2,
          y: THREE.MathUtils.degToRad(0),
          ease: "power1.inOut",
        })
        .then(() => {
          tla
            .to(helperRobot.phaseTwo.rotation, {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(15),
              ease: "power1.inOut",
            })
            .to(
              helperRobot.phaseThree.rotation,
              {
                duration: 1.5,
                z: THREE.MathUtils.degToRad(-25),
                ease: "power1.inOut",
              },
              "-=1.5"
            )
            .to(
              helperRobot.phaseFour.rotation,
              {
                duration: 1.5,
                z: THREE.MathUtils.degToRad(10),
                ease: "power1.inOut",
                onComplete: () => {
                  helperRobot.phaseFour.attach(element);
                },
              },
              "-=1.5"
            );
        })
        .then(() => {
          tla
            .to(helperRobot.phaseTwo.rotation, {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(45),
              ease: "power1.inOut",
            })
            .to(
              helperRobot.phaseThree.rotation,
              {
                duration: 1.5,
                z: THREE.MathUtils.degToRad(-45),
                ease: "power1.inOut",
              },
              "-=1.5"
            )
            .to(
              helperRobot.phaseFour.rotation,
              {
                duration: 1.5,
                z: THREE.MathUtils.degToRad(0),
                ease: "power1.inOut",
              },
              "-=1.5"
            );
        });
    }

    if (counter === 5) {
      tla.clear();

      secondTla
        .to(controls.target, {
          duration: 2,
          z: -60,
          x: 0,
          y: 40,
          ease: "power1.inOut",
        })
        .to(
          camera.position,
          {
            duration: 2,
            x: 100,
            z: -60,
            y: 75,
            ease: "power1.inOut",
          },
          "-=2"
        );

      tla
        .to(
          helperRobot.phaseOne.rotation,
          {
            duration: 2,
            y: THREE.MathUtils.degToRad(90),
            ease: "power1.inOut",
          },
          "-=2"
        )
        .to(helperRobot.phaseTwo.rotation, {
          duration: 1.5,
          z: THREE.MathUtils.degToRad(15),
          ease: "power1.inOut",
        })
        .to(
          helperRobot.phaseThree.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(-25),
            ease: "power1.inOut",
          },
          "-=1.5"
        )
        .to(
          helperRobot.phaseFour.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(10),
            ease: "power1.inOut",
            onComplete: () => {
              table.attach(element);
            },
          },
          "-=1.5"
        )
        .to(helperRobot.phaseTwo.rotation, {
          duration: 1.5,
          z: THREE.MathUtils.degToRad(45),
          ease: "power1.inOut",
        })
        .to(
          helperRobot.phaseThree.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(-45),
            ease: "power1.inOut",
          },
          "-=1.5"
        )
        .to(
          helperRobot.phaseFour.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(0),
            ease: "power1.inOut",
          },
          "-=1.5"
        );
    }

    if (counter === 6) {
      tla.clear();

      tla
        .to(helperRobot.phaseOne.rotation, {
          duration: 2,
          y: THREE.MathUtils.degToRad(180),
          ease: "power1.inOut",
        })
        .to(
          weldingRobot2.phaseThree.rotation,
          {
            duration: 2,
            z: THREE.MathUtils.degToRad(-50),
            ease: "power1.inOut",
          },
          "-=1"
        )
        .to(weldingRobot2.phaseOne.rotation, {
          duration: 2.5,
          y: THREE.MathUtils.degToRad(0),
          ease: "power1.inOut",
        })
        .to(
          weldingRobot2.phaseTwo.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(110),
            ease: "power1.inOut",
          },
          "-=2.5"
        )
        .to(
          weldingRobot2.phaseThree.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(-75),
            ease: "power1.inOut",
          },
          "-=2.5"
        )
        .to(
          weldingRobot2.phaseFour.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(-125),
            ease: "power1.inOut",
            onComplete: () => {
              particlesPosition = new THREE.Vector3(3, 35, -60);
              controls.autoRotate = true;
              controls.autoRotateSpeed = -0.3;
            },
          },
          "-=2.5"
        );
    }

    if (counter === 7) {
      tla.clear();
      secondTla.clear();

      tla
        .to(weldingRobot2.phaseThree.rotation, {
          duration: 2,
          z: THREE.MathUtils.degToRad(-50),
          ease: "power1.inOut",
          onStart: () => {
            particlesPosition = new THREE.Vector3(0, -40, 0);
          },
        })
        .to(weldingRobot2.phaseOne.rotation, {
          duration: 2.5,
          y: THREE.MathUtils.degToRad(90),
          ease: "power1.inOut",
        })
        .to(
          weldingRobot2.phaseFour.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(-90),
            ease: "power1.inOut",
          },
          "-=2"
        )
        .to(
          weldingRobot2.phaseThree.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(-135),
            ease: "power1.inOut",
          },
          "-=2"
        )
        .to(
          weldingRobot2.phaseTwo.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(135),
            ease: "power1.inOut",
          },
          "-=2"
        )
        .to(helperRobot.phaseOne.rotation, {
          duration: 2,
          y: THREE.MathUtils.degToRad(90),
          ease: "power1.inOut",
        })
        .to(helperRobot.phaseTwo.rotation, {
          duration: 1.5,
          z: THREE.MathUtils.degToRad(15),
          ease: "power1.inOut",
        })
        .to(
          helperRobot.phaseThree.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(-25),
            ease: "power1.inOut",
            onComplete: () => {
              helperRobot.phaseFour.attach(element);
            },
          },
          "-=1.5"
        )
        .to(
          helperRobot.phaseFour.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(10),
            ease: "power1.inOut",
          },
          "-=1.5"
        )
        .to(helperRobot.phaseTwo.rotation, {
          duration: 1.5,
          z: THREE.MathUtils.degToRad(45),
          ease: "power1.inOut",
        })
        .to(
          helperRobot.phaseThree.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(-45),
            ease: "power1.inOut",
          },
          "-=1.5"
        )
        .to(
          helperRobot.phaseFour.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(0),
            ease: "power1.inOut",
            onComplete: () => {
              controls.autoRotate = false;
            },
          },
          "-=1.5"
        )
        .to(controls.target, {
          duration: 3,
          x: 0,
          y: 40,
          z: 60,
          ease: "power1.inOut",
        })
        .to(
          camera.position,
          {
            duration: 3,
            x: 80,
            z: 80,
            y: 80,
            ease: "power1.inOut",
          },
          "-=3"
        )
        .to(
          helperRobot.phaseOne.rotation,
          {
            duration: 3,
            y: THREE.MathUtils.degToRad(-90),
            ease: "power1.inOut",
          },
          "-=3"
        );
    }

    if (counter === 8) {
      tla.clear();

      tla
        .to(helperRobot.phaseTwo.rotation, {
          duration: 1.5,
          z: THREE.MathUtils.degToRad(15),
          ease: "power1.inOut",
        })
        .to(
          helperRobot.phaseThree.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(-25),
            ease: "power1.inOut",
          },
          "-=1.5"
        )
        .to(
          helperRobot.phaseFour.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(10),
            ease: "power1.inOut",
            onComplete: () => {
              table.attach(element);
            },
          },
          "-=1.5"
        )
        .to(helperRobot.phaseTwo.rotation, {
          duration: 1.5,
          z: THREE.MathUtils.degToRad(45),
          ease: "power1.inOut",
        })
        .to(
          helperRobot.phaseThree.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(-45),
            ease: "power1.inOut",
          },
          "-=1.5"
        )
        .to(
          helperRobot.phaseFour.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(0),
            ease: "power1.inOut",
          },
          "-=1.5"
        )
        .to(helperRobot.phaseOne.rotation, {
          duration: 1.5,
          y: THREE.MathUtils.degToRad(-180),
          ease: "power1.inOut",
        })
        .to(
          weldingRobot1.phaseThree.rotation,
          {
            duration: 2,
            z: THREE.MathUtils.degToRad(-50),
            ease: "power1.inOut",
          },
          "-=1"
        )
        .to(weldingRobot1.phaseOne.rotation, {
          duration: 2.5,
          y: THREE.MathUtils.degToRad(0),
          ease: "power1.inOut",
        })
        .to(
          weldingRobot1.phaseTwo.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(110),
            ease: "power1.inOut",
          },
          "-=2.5"
        )
        .to(
          weldingRobot1.phaseThree.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(-75),
            ease: "power1.inOut",
          },
          "-=2.5"
        )
        .to(
          weldingRobot1.phaseFour.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(-125),
            ease: "power1.inOut",
            onComplete: () => {
              particlesPosition = new THREE.Vector3(-3, 35, 60);
              controls.autoRotate = true;
              controls.autoRotateSpeed = 0.3;
            },
          },
          "-=2.5"
        );
    }

    if (counter === 9) {
      tla.clear();

      tla
        .to(weldingRobot1.phaseThree.rotation, {
          duration: 2,
          z: THREE.MathUtils.degToRad(-50),
          ease: "power1.inOut",
          onStart: () => {
            particlesPosition = new THREE.Vector3(0, -40, 0);
          },
        })
        .to(weldingRobot1.phaseOne.rotation, {
          duration: 2.5,
          y: THREE.MathUtils.degToRad(90),
          ease: "power1.inOut",
        })
        .to(
          weldingRobot1.phaseFour.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(-90),
            ease: "power1.inOut",
          },
          "-=2"
        )
        .to(
          weldingRobot1.phaseThree.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(-135),
            ease: "power1.inOut",
          },
          "-=2"
        )
        .to(
          weldingRobot1.phaseTwo.rotation,
          {
            duration: 2.5,
            z: THREE.MathUtils.degToRad(135),
            ease: "power1.inOut",
          },
          "-=2"
        )
        .to(helperRobot.phaseOne.rotation, {
          duration: 2,
          y: THREE.MathUtils.degToRad(-90),
          ease: "power1.inOut",
        })
        .to(helperRobot.phaseTwo.rotation, {
          duration: 1.5,
          z: THREE.MathUtils.degToRad(15),
          ease: "power1.inOut",
        })
        .to(
          helperRobot.phaseThree.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(-25),
            ease: "power1.inOut",
          },
          "-=1.5"
        )
        .to(
          helperRobot.phaseFour.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(10),
            ease: "power1.inOut",
            onComplete: () => {
              helperRobot.phaseFour.attach(element);
            },
          },
          "-=1.5"
        )
        .to(helperRobot.phaseTwo.rotation, {
          duration: 1.5,
          z: THREE.MathUtils.degToRad(45),
          ease: "power1.inOut",
        })
        .to(
          helperRobot.phaseThree.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(-45),
            ease: "power1.inOut",
            onComplete: () => {
              controls.autoRotate = false;
            },
          },
          "-=1.5"
        )
        .to(
          helperRobot.phaseFour.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(0),
            ease: "power1.inOut",
          },
          "-=1.5"
        );
    }

    if (counter === 10) {
      tla.clear();

      tla
        .to(controls.target, {
          duration: 3,
          x: 50,
          y: 40,
          z: 0,
          ease: "power1.inOut",
        })
        .to(
          camera.position,
          {
            duration: 3,
            x: 120,
            z: 80,
            y: 80,
            ease: "power1.inOut",
          },
          "-=3"
        )
        .to(
          helperRobot.phaseOne.rotation,
          {
            duration: 1.5,
            y: THREE.MathUtils.degToRad(0),
            ease: "power1.inOut",
          },
          "-=3"
        )
        .to(helperRobot.phaseTwo.rotation, {
          duration: 1.5,
          z: THREE.MathUtils.degToRad(15),
          ease: "power1.inOut",
        })
        .to(
          helperRobot.phaseThree.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(-25),
            ease: "power1.inOut",
          },
          "-=1.5"
        )
        .to(
          helperRobot.phaseFour.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(10),
            ease: "power1.inOut",
            onComplete: () => {
              table.attach(element);
            },
          },
          "-=1.5"
        )
        .to(helperRobot.phaseTwo.rotation, {
          duration: 1.5,
          z: THREE.MathUtils.degToRad(45),
          ease: "power1.inOut",
        })
        .to(
          helperRobot.phaseThree.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(-45),
            ease: "power1.inOut",
          },
          "-=1.5"
        )
        .to(
          helperRobot.phaseFour.rotation,
          {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(0),
            ease: "power1.inOut",
          },
          "-=1.5"
        );
    }

    if (counter === 11) {
      tla.clear();

      tla
        .to(helperRobot.phaseOne.rotation, {
          duration: 1.5,
          y: THREE.MathUtils.degToRad(180),
          ease: "power1.inOut",
        })
        .to(camera.position, {
          duration: 2.5,
          x: 140,
          y: 80,
          z: -150,
          ease: "power1.inOut",
        })
        .to(
          controls.target,
          {
            duration: 2.5,
            x: 100,
            z: 0,
            y: 50,
            ease: "power1.inOut",
          },
          "-=2.5"
        )
        .to(
          ridingRobot.robotObj.position,
          {
            duration: 3,
            x: 105,
            ease: "power1.inOut",
          },
          "-=2.5"
        )
        .to(
          ridingRobot.phaseTwo.rotation,
          {
            duration: 3,
            z: THREE.MathUtils.degToRad(180),
            ease: "power1.inOut",
            onComplete: () => {
              ridingRobot.phaseTwo.attach(element);
            },
          },
          "-=3"
        )
        .to(
          ridingRobot.wheelsBack.rotation,
          {
            duration: 3,
            z: 200,
          },
          "-=3"
        )
        .to(
          ridingRobot.wheelsFront.rotation,
          {
            duration: 3,
            z: 200,
          },
          "-=3"
        );
    }

    if (counter === 12) {
      tla.clear();

      tla
        .to(camera.position, {
          duration: 4,
          x: 250,
          y: 50,
          z: -150,
        })
        .to(
          controls.target,
          {
            duration: 4,
            x: 320,
            y: 50,
            ease: "power1.inOut",
          },
          "-=4"
        )
        .to(
          ridingRobot.robotObj.position,
          {
            duration: 4,
            x: 275,
            ease: "power1.inOut",
          },
          "-=4"
        )
        .to(
          ridingRobot.phaseTwo.rotation,
          {
            duration: 4,
            z: THREE.MathUtils.degToRad(0),
            ease: "power1.inOut",
            onComplete: () => {
              table2.attach(element);
            },
            onStart: () => {
              ridingRobot.phaseTwo.attach(element);
            },
          },
          "-=4"
        )
        .to(
          ridingRobot.wheelsBack.rotation,
          {
            duration: 4,
            z: -400,
            ease: "power1.inOut",
          },
          "-=4"
        )
        .to(
          ridingRobot.wheelsFront.rotation,
          {
            duration: 4,
            z: -400,
            ease: "power1.inOut",
          },
          "-=4"
        );
    }

    if (counter === 13) {
      tla.clear();

      tla
        .to(controls.target, {
          duration: 3,
          x: 0,
          y: 50,
          ease: "power1.inOut",
        })
        .to(
          camera.position,
          {
            duration: 3,
            x: 0,
            y: 100,
            z: 200,
            ease: "power1.inOut",
          },
          "-=3"
        )
        .to(
          ridingRobot.robotObj.position,
          {
            duration: 2,
            x: 200,
            ease: "power1.inOut",
            onStart: () => {
              table2.attach(element);
            },
          },
          "-=3"
        )
        .to(
          ridingRobot.wheelsBack.rotation,
          {
            duration: 2,
            z: 0,
          },
          "-=3"
        )
        .to(
          ridingRobot.wheelsFront.rotation,
          {
            duration: 2,
            z: 0,
          },
          "-=3"
        );
    }

    //---------------------------------------------------------------------------------------

    if (e.key === "ArrowLeft") {
      if (counter > 0) counter -= 1;
      console.log(counter);

      // 1

      if (counter === 0) {
        gsap.to(controls.target, {
          duration: 3,
          x: 0,
          y: 50,
          ease: "power1.inOut",
        });
        gsap.to(camera.position, {
          duration: 2,
          x: 0,
          y: 100,
          z: 200,
          ease: "power1.inOut",
        });
        gsap.to(ridingRobot.robotObj.position, {
          duration: 2,
          x: 200,
          ease: "power1.inOut",
          onStart: () => {
            table2.attach(element);
          },
        });
        gsap.to(ridingRobot.wheelsBack.rotation, {
          duration: 2,
          z: 0,
        });
        gsap.to(ridingRobot.wheelsFront.rotation, {
          duration: 2,
          z: 0,
        });
      }

      // 2 r

      if (counter === 1) {
        gsap.to(camera.position, {
          duration: 4,
          x: 250,
          y: 50,
          z: -150,
          onStart: () => {
            return gsap.to(controls.target, {
              duration: 4,
              x: 320,
              y: 50,
              ease: "power1.inOut",
            });
          },
        });

        gsap.to(ridingRobot.robotObj.position, {
          duration: 4,
          x: 275,
          ease: "power1.inOut",
          onStart: () => {
            ridingRobot.phaseTwo.attach(element);
          },
        });
        gsap.to(ridingRobot.phaseTwo.rotation, {
          duration: 4,
          z: THREE.MathUtils.degToRad(0),
          ease: "power1.inOut",
          onComplete: () => {
            table.attach(element);
          },
        });
        gsap.to(ridingRobot.wheelsBack.rotation, {
          duration: 4,
          z: -400,
          delay: 1.3,
        });
        gsap.to(ridingRobot.wheelsFront.rotation, {
          duration: 4,
          z: -400,
          delay: 1.3,
        });
      }

      //3 r

      if (counter === 2) {
        console.log(counter);
        gsap.to(camera.position, {
          duration: 2.5,
          x: 100,
          y: 50,
          z: -150,
          ease: "power1.inOut",
        });
        gsap.to(controls.target, {
          duration: 2.5,
          x: 100,
          z: 0,
          y: 50,
          ease: "power1.inOut",
        });
        gsap.to(ridingRobot.robotObj.position, {
          duration: 4,
          x: 105,
          ease: "power1.inOut",
          onComplete: () => {
            ridingRobot.phaseTwo.attach(element);
          },
        });
        gsap.to(ridingRobot.phaseTwo.rotation, {
          duration: 4,
          z: THREE.MathUtils.degToRad(180),
          ease: "power1.inOut",
        });
        gsap.to(ridingRobot.wheelsBack.rotation, {
          duration: 4,
          z: 200,
        });
        gsap.to(ridingRobot.wheelsFront.rotation, {
          duration: 4,
          z: 200,
        });
      }

      // 4 r

      if (counter === 3) {
        // const tl = gsap.timeline();
        tla.clear();

        tla
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(15),
            ease: "power1.inOut",
          })
          .to(
            helperRobot.phaseThree.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(-25),
              ease: "power1.inOut",
              onComplete: () => {
                table.attach(element);
              },
            },
            "-=1.5"
          )
          .to(
            helperRobot.phaseFour.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(10),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .then(() => {
            tla
              .to(helperRobot.phaseTwo.rotation, {
                duration: 1.5,
                z: THREE.MathUtils.degToRad(45),
                ease: "power1.inOut",
              })
              .to(
                helperRobot.phaseThree.rotation,
                {
                  duration: 1.5,
                  z: THREE.MathUtils.degToRad(-45),
                  ease: "power1.inOut",
                },
                "-=1.5"
              )
              .to(
                helperRobot.phaseFour.rotation,
                {
                  duration: 1.5,
                  z: THREE.MathUtils.degToRad(0),
                  ease: "power1.inOut",
                },
                "-=1.5"
              );
          })
          .then(() => {
            tla.to(helperRobot.phaseOne.rotation, {
              duration: 2,
              y: THREE.MathUtils.degToRad(180),
              ease: "power1.inOut",
            });
          });
      }

      if (counter === 4) {
        tla.clear();
        secondTla.clear();

        secondTla
          .to(controls.target, {
            duration: 2,
            x: 50,
            y: 50,
            z: 0,
            ease: "power1.inOut",
          })
          .to(
            camera.position,
            {
              duration: 2,
              x: 0,
              z: 140,
              y: 140,
              ease: "power1.inOut",
            },
            "-=2"
          );

        tla
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(15),
            ease: "power1.inOut",
          })
          .to(
            helperRobot.phaseThree.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(-25),
              ease: "power1.inOut",
              onComplete: () => {
                helperRobot.phaseFour.attach(element);
              },
            },
            "-=1.5"
          )
          .to(
            helperRobot.phaseFour.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(10),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .then(() => {
            tla
              .to(helperRobot.phaseTwo.rotation, {
                duration: 1.5,
                z: THREE.MathUtils.degToRad(45),
                ease: "power1.inOut",
              })
              .to(
                helperRobot.phaseThree.rotation,
                {
                  duration: 1.5,
                  z: THREE.MathUtils.degToRad(-45),
                  ease: "power1.inOut",
                },
                "-=1.5"
              )
              .to(
                helperRobot.phaseFour.rotation,
                {
                  duration: 1.5,
                  z: THREE.MathUtils.degToRad(0),
                  ease: "power1.inOut",
                },
                "-=1.5"
              );
          })
          .then(() => {
            tla.to(helperRobot.phaseOne.rotation, {
              duration: 2,
              y: THREE.MathUtils.degToRad(0),
              ease: "power1.inOut",
            });
          });
      }

      if (counter === 5) {
        tla.clear();

        tla
          .to(weldingRobot2.phaseThree.rotation, {
            duration: 2,
            z: THREE.MathUtils.degToRad(-50),
            ease: "power1.inOut",
            onStart: () => {
              particlesPosition = new THREE.Vector3(0, -40, 0);
              controls.autoRotate = false;
            },
          })
          .to(weldingRobot2.phaseOne.rotation, {
            duration: 2.5,
            y: THREE.MathUtils.degToRad(90),
            ease: "power1.inOut",
          })
          .to(
            weldingRobot2.phaseFour.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(-90),
              ease: "power1.inOut",
            },
            "-=2"
          )
          .to(
            weldingRobot2.phaseThree.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(-135),
              ease: "power1.inOut",
            },
            "-=2"
          )
          .to(
            weldingRobot2.phaseTwo.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(135),
              ease: "power1.inOut",
            },
            "-=2"
          )
          .to(helperRobot.phaseOne.rotation, {
            duration: 2,
            y: THREE.MathUtils.degToRad(90),
            ease: "power1.inOut",
          });
      }

      if (counter === 6) {
        tla.clear();

        tla
          .to(controls.target, {
            duration: 3,
            x: 0,
            y: 40,
            z: -60,
            ease: "power1.inOut",
          })
          .to(
            camera.position,
            {
              duration: 3,
              x: 100,
              z: -60,
              y: 75,
              ease: "power1.inOut",
            },
            "-=3"
          )
          .to(
            helperRobot.phaseOne.rotation,
            {
              duration: 3,
              y: THREE.MathUtils.degToRad(90),
              ease: "power1.inOut",
              onComplete: () => {
                controls.autoRotate = true;
              },
            },
            "-=3"
          )
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(15),
            ease: "power1.inOut",
          })
          .to(
            helperRobot.phaseThree.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(-25),
              ease: "power1.inOut",
              onComplete: () => {
                table.attach(element);
              },
            },
            "-=1.5"
          )
          .to(
            helperRobot.phaseFour.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(10),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(45),
            ease: "power1.inOut",
          })
          .to(
            helperRobot.phaseThree.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(-45),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(
            helperRobot.phaseFour.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(0),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(helperRobot.phaseOne.rotation, {
            duration: 2,
            y: THREE.MathUtils.degToRad(180),
            ease: "power1.inOut",
          })
          .to(
            weldingRobot2.phaseThree.rotation,
            {
              duration: 2,
              z: THREE.MathUtils.degToRad(-50),
              ease: "power1.inOut",
            },
            "-=1"
          )
          .to(weldingRobot2.phaseOne.rotation, {
            duration: 2.5,
            y: THREE.MathUtils.degToRad(0),
            ease: "power1.inOut",
          })
          .to(
            weldingRobot2.phaseTwo.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(110),
              ease: "power1.inOut",
            },
            "-=2.5"
          )
          .to(
            weldingRobot2.phaseThree.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(-75),
              ease: "power1.inOut",
            },
            "-=2.5"
          )
          .to(
            weldingRobot2.phaseFour.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(-125),
              ease: "power1.inOut",
              onComplete: () => {
                particlesPosition = new THREE.Vector3(3, 35, -60);
                controls.autoRotate = true;
                controls.autoRotateSpeed = -0.3;
              },
            },
            "-=2.5"
          );
      }

      if (counter === 7) {
        tla.clear();

        tla
          .to(weldingRobot1.phaseThree.rotation, {
            duration: 2,
            z: THREE.MathUtils.degToRad(-50),
            ease: "power1.inOut",
            onStart: () => {
              particlesPosition = new THREE.Vector3(0, -40, 0);
              controls.autoRotate = false;
            },
          })
          .to(weldingRobot1.phaseOne.rotation, {
            duration: 2.5,
            y: THREE.MathUtils.degToRad(90),
            ease: "power1.inOut",
          })
          .to(
            weldingRobot1.phaseFour.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(-90),
              ease: "power1.inOut",
            },
            "-=2"
          )
          .to(
            weldingRobot1.phaseThree.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(-135),
              ease: "power1.inOut",
            },
            "-=2"
          )
          .to(
            weldingRobot1.phaseTwo.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(135),
              ease: "power1.inOut",
            },
            "-=2"
          )
          .to(helperRobot.phaseOne.rotation, {
            duration: 2,
            y: THREE.MathUtils.degToRad(-90),
            ease: "power1.inOut",
          })
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(15),
            ease: "power1.inOut",
          })
          .to(
            helperRobot.phaseThree.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(-25),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(
            helperRobot.phaseFour.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(10),
              ease: "power1.inOut",
              onComplete: () => {
                helperRobot.phaseFour.attach(element);
              },
            },
            "-=1.5"
          )
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(45),
            ease: "power1.inOut",
          })
          .to(
            helperRobot.phaseThree.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(-45),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(
            helperRobot.phaseFour.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(0),
              ease: "power1.inOut",
            },
            "-=1.5"
          );
      }

      if (counter === 8) {
        tla.clear();

        tla
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(15),
            ease: "power1.inOut",
          })
          .to(
            helperRobot.phaseThree.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(-25),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(
            helperRobot.phaseFour.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(10),
              ease: "power1.inOut",
              onComplete: () => {
                table.attach(element);
              },
            },
            "-=1.5"
          )
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(45),
            ease: "power1.inOut",
          })
          .to(
            helperRobot.phaseThree.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(-45),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(
            helperRobot.phaseFour.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(0),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(helperRobot.phaseOne.rotation, {
            duration: 1.5,
            y: THREE.MathUtils.degToRad(-180),
            ease: "power1.inOut",
          })
          .to(
            weldingRobot1.phaseThree.rotation,
            {
              duration: 2,
              z: THREE.MathUtils.degToRad(-50),
              ease: "power1.inOut",
            },
            "-=1"
          )
          .to(weldingRobot1.phaseOne.rotation, {
            duration: 2.5,
            y: THREE.MathUtils.degToRad(0),
            ease: "power1.inOut",
          })
          .to(
            weldingRobot1.phaseTwo.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(110),
              ease: "power1.inOut",
            },
            "-=2.5"
          )
          .to(
            weldingRobot1.phaseThree.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(-75),
              ease: "power1.inOut",
            },
            "-=2.5"
          )
          .to(
            weldingRobot1.phaseFour.rotation,
            {
              duration: 2.5,
              z: THREE.MathUtils.degToRad(-125),
              ease: "power1.inOut",
              onComplete: () => {
                particlesPosition = new THREE.Vector3(-3, 35, 60);
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.3;
              },
            },
            "-=2.5"
          );
      }

      if (counter === 9) {
        tla.clear();

        tla
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(15),
            ease: "power1.inOut",
          })
          .to(
            helperRobot.phaseThree.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(-25),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(
            helperRobot.phaseFour.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(10),
              ease: "power1.inOut",
              onComplete: () => {
                helperRobot.phaseFour.attach(element);
              },
            },
            "-=1.5"
          )
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(45),
            ease: "power1.inOut",
          })
          .to(
            helperRobot.phaseThree.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(-45),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(
            helperRobot.phaseFour.rotation,
            {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(0),
              ease: "power1.inOut",
            },
            "-=1.5"
          )
          .to(controls.target, {
            duration: 3,
            x: 0,
            y: 40,
            z: 60,
            ease: "power1.inOut",
          })
          .to(
            camera.position,
            {
              duration: 3,
              x: 80,
              z: 80,
              y: 80,
              ease: "power1.inOut",
            },
            "-=3"
          )
          .to(
            helperRobot.phaseOne.rotation,
            {
              duration: 1.5,
              y: THREE.MathUtils.degToRad(-90),
              ease: "power1.inOut",
            },
            "-=3"
          );
      }

      if (counter === 10) {
        tla.clear();

        tla
          .to(ridingRobot.robotObj.position, {
            duration: 3,
            x: 200,
            ease: "power1.inOut",
            onStart: () => {
              table.attach(element);
            },
          })
          .to(
            ridingRobot.phaseTwo.rotation,
            {
              duration: 3,
              z: THREE.MathUtils.degToRad(0),
              ease: "power1.inOut",
            },
            "-=3"
          )
          .to(
            ridingRobot.wheelsBack.rotation,
            {
              duration: 3,
              z: -400,
            },
            "-=3"
          )
          .to(
            ridingRobot.wheelsFront.rotation,
            {
              duration: 3,
              z: -400,
            },
            "-=3"
          )
          .to(controls.target, {
            duration: 3,
            x: 50,
            y: 40,
            z: 0,
            ease: "power1.inOut",
          })
          .to(
            camera.position,
            {
              duration: 3,
              x: 120,
              z: 80,
              y: 80,
              ease: "power1.inOut",
            },
            "-=3"
          )
          .to(
            helperRobot.phaseOne.rotation,
            {
              duration: 1.5,
              y: THREE.MathUtils.degToRad(0),
              ease: "power1.inOut",
            },
            "-=3"
          );
      }

      if (counter === 11) {
        tla.clear();

        tla
          .to(camera.position, {
            duration: 2.5,
            x: 140,
            y: 80,
            z: -150,
            ease: "power1.inOut",
          })
          .to(
            controls.target,
            {
              duration: 2.5,
              x: 100,
              z: 0,
              y: 50,
              ease: "power1.inOut",
            },
            "-=2.5"
          )
          .to(
            ridingRobot.robotObj.position,
            {
              duration: 4,
              x: 105,
              ease: "power1.inOut",
            },
            "-=2.5"
          )
          .to(
            ridingRobot.phaseTwo.rotation,
            {
              duration: 4,
              z: THREE.MathUtils.degToRad(180),
              ease: "power1.inOut",
              onStart: () => {
                ridingRobot.phaseTwo.attach(element);
              },
              onComplete: () => {
                table.attach(element);
              },
            },
            "-=4"
          )
          .to(
            ridingRobot.wheelsBack.rotation,
            {
              duration: 4,
              z: 200,
              ease: "power1.inOut",
            },
            "-=4"
          )
          .to(
            ridingRobot.wheelsFront.rotation,
            {
              duration: 4,
              z: 200,
              ease: "power1.inOut",
            },
            "-=4"
          );
      }

      if (counter === 12) {
        tla.clear();

        tla
          .to(ridingRobot.robotObj.position, {
            duration: 2,
            x: 275,
            ease: "power1.inOut",
            delay: 1.3,
            onComplete: () => {
              ridingRobot.phaseTwo.attach(element);
            },
          })
          .to(
            ridingRobot.wheelsBack.rotation,
            {
              duration: 2,
              z: -400,
              ease: "power1.inOut",
            },
            "-=2"
          )
          .to(
            ridingRobot.wheelsFront.rotation,
            {
              duration: 2,
              z: -400,
              ease: "power1.inOut",
            },
            "-=2"
          )
          .to(
            camera.position,
            {
              duration: 3,
              x: 100,
              y: 50,
              z: -150,
            },
            "-=2"
          )
          .to(
            controls.target,
            {
              duration: 3,
              x: 320,
              y: 50,
            },
            "-=2"
          )
          .to(camera.position, {
            duration: 2,
            x: 250,
            y: 50,
            z: -150,
            ease: "power1.inOut",
          });
      }
    }
  });

  // const tweenR2GetFormStart = new TWEEN.Tween({
  //   yRotate: THREE.MathUtils.degToRad(180),
  // })
  //   .to({ yRotate: THREE.MathUtils.degToRad(0) }, 1500)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseOne.rotation.y = coords.yRotate;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(0);
  //   });

  // const tweenR2GetToR1 = new TWEEN.Tween({
  //   yRotate: THREE.MathUtils.degToRad(0),
  // })
  //   .to({ yRotate: THREE.MathUtils.degToRad(90) }, 750)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseOne.rotation.y = coords.yRotate;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);
  //   });

  // const tweenR2BackToDefaultFromR1 = new TWEEN.Tween({
  //   yRotate: THREE.MathUtils.degToRad(90),
  // })
  //   .to({ yRotate: THREE.MathUtils.degToRad(180) }, 750)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseOne.rotation.y = coords.yRotate;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(180);
  //   });

  // const tweenR2BackToDefaultFromR2 = new TWEEN.Tween({
  //   yRotate: THREE.MathUtils.degToRad(-90),
  // })
  //   .to({ yRotate: THREE.MathUtils.degToRad(-180) }, 750)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseOne.rotation.y = coords.yRotate;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(-180);
  //   });

  // const tweenR2BackFromDefaulttoR2 = new TWEEN.Tween({
  //   yRotate: THREE.MathUtils.degToRad(-180),
  // })
  //   .to({ yRotate: THREE.MathUtils.degToRad(-90) }, 750)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseOne.rotation.y = coords.yRotate;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(-90);
  //   });

  // const tweenR2BackFromR2ToTable = new TWEEN.Tween({
  //   yRotate: THREE.MathUtils.degToRad(-90),
  // })
  //   .to({ yRotate: THREE.MathUtils.degToRad(0) }, 750)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseOne.rotation.y = coords.yRotate;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(0);
  //   });

  // const tweenR2BackFromTableToDefault = new TWEEN.Tween({
  //   yRotate: THREE.MathUtils.degToRad(0),
  // })
  //   .to({ yRotate: THREE.MathUtils.degToRad(180) }, 750)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseOne.rotation.y = coords.yRotate;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(180);
  //   });

  // const tweenR2GetFromR1ToR2 = new TWEEN.Tween({
  //   yRotate: THREE.MathUtils.degToRad(180),
  // })
  //   .to({ yRotate: THREE.MathUtils.degToRad(90) }, 750)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseOne.rotation.y = coords.yRotate;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);
  //   });

  // const tweenR2GetFromR1ToR22 = new TWEEN.Tween({
  //   yRotate: THREE.MathUtils.degToRad(90),
  // })
  //   .to({ yRotate: THREE.MathUtils.degToRad(-90) }, 750)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseOne.rotation.y = coords.yRotate;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseOne.rotation.y = THREE.MathUtils.degToRad(-90);
  //   });

  // const tweenR2GetFormTableDown = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(45),
  //   zRotThree: THREE.MathUtils.degToRad(-45),
  //   zRotFour: THREE.MathUtils.degToRad(0),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(15),
  //       zRotThree: THREE.MathUtils.degToRad(-25),
  //       zRotFour: THREE.MathUtils.degToRad(10),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(15);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-25);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(10);
  //     helperRobot.phaseFour.attach(element);
  //   });

  // const tweenR2GetFormTableDown2 = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(45),
  //   zRotThree: THREE.MathUtils.degToRad(-45),
  //   zRotFour: THREE.MathUtils.degToRad(0),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(15),
  //       zRotThree: THREE.MathUtils.degToRad(-25),
  //       zRotFour: THREE.MathUtils.degToRad(10),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(15);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-25);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(10);
  //     table.attach(element);
  //   });

  // const tweenR2GetFormTableDown3 = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(45),
  //   zRotThree: THREE.MathUtils.degToRad(-45),
  //   zRotFour: THREE.MathUtils.degToRad(0),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(15),
  //       zRotThree: THREE.MathUtils.degToRad(-25),
  //       zRotFour: THREE.MathUtils.degToRad(10),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(15);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-25);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(10);
  //     helperRobot.phaseFour.attach(element);
  //   });

  // const tweenR2GetFormTableDown4 = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(45),
  //   zRotThree: THREE.MathUtils.degToRad(-45),
  //   zRotFour: THREE.MathUtils.degToRad(0),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(15),
  //       zRotThree: THREE.MathUtils.degToRad(-25),
  //       zRotFour: THREE.MathUtils.degToRad(10),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(15);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-25);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(10);
  //     table.attach(element);
  //   });

  // const tweenR2GetFormTableDown5 = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(45),
  //   zRotThree: THREE.MathUtils.degToRad(-45),
  //   zRotFour: THREE.MathUtils.degToRad(0),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(15),
  //       zRotThree: THREE.MathUtils.degToRad(-25),
  //       zRotFour: THREE.MathUtils.degToRad(10),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(15);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-25);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(10);
  //     helperRobot.phaseFour.attach(element);
  //   });

  // const tweenR2GetFormTableDown6 = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(45),
  //   zRotThree: THREE.MathUtils.degToRad(-45),
  //   zRotFour: THREE.MathUtils.degToRad(0),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(15),
  //       zRotThree: THREE.MathUtils.degToRad(-25),
  //       zRotFour: THREE.MathUtils.degToRad(10),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(15);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-25);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(10);
  //     table.attach(element);
  //   });

  // const tweenR2GetFormTableUp = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(15),
  //   zRotThree: THREE.MathUtils.degToRad(-25),
  //   zRotFour: THREE.MathUtils.degToRad(10),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(45),
  //       zRotThree: THREE.MathUtils.degToRad(-45),
  //       zRotFour: THREE.MathUtils.degToRad(0),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(45);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-45);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(0);
  //   });

  // const tweenR2GetFormTableUp2 = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(15),
  //   zRotThree: THREE.MathUtils.degToRad(-25),
  //   zRotFour: THREE.MathUtils.degToRad(10),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(45),
  //       zRotThree: THREE.MathUtils.degToRad(-45),
  //       zRotFour: THREE.MathUtils.degToRad(0),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(45);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-45);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(0);
  //   });

  // const tweenR2GetFormTableUp3 = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(15),
  //   zRotThree: THREE.MathUtils.degToRad(-25),
  //   zRotFour: THREE.MathUtils.degToRad(10),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(45),
  //       zRotThree: THREE.MathUtils.degToRad(-45),
  //       zRotFour: THREE.MathUtils.degToRad(0),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(45);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-45);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(0);
  //   });

  // const tweenR2GetFormTableUp4 = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(15),
  //   zRotThree: THREE.MathUtils.degToRad(-25),
  //   zRotFour: THREE.MathUtils.degToRad(10),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(45),
  //       zRotThree: THREE.MathUtils.degToRad(-45),
  //       zRotFour: THREE.MathUtils.degToRad(0),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(45);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-45);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(0);
  //   });

  // const tweenR2GetFormTableUp5 = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(15),
  //   zRotThree: THREE.MathUtils.degToRad(-25),
  //   zRotFour: THREE.MathUtils.degToRad(10),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(45),
  //       zRotThree: THREE.MathUtils.degToRad(-45),
  //       zRotFour: THREE.MathUtils.degToRad(0),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(45);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-45);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(0);
  //   });

  // const tweenR2GetFormTableUp6 = new TWEEN.Tween({
  //   zRotTwo: THREE.MathUtils.degToRad(15),
  //   zRotThree: THREE.MathUtils.degToRad(-25),
  //   zRotFour: THREE.MathUtils.degToRad(10),
  // })
  //   .to(
  //     {
  //       zRotTwo: THREE.MathUtils.degToRad(45),
  //       zRotThree: THREE.MathUtils.degToRad(-45),
  //       zRotFour: THREE.MathUtils.degToRad(0),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     helperRobot.phaseTwo.rotation.z = coords.zRotTwo;
  //     helperRobot.phaseThree.rotation.z = coords.zRotThree;
  //     helperRobot.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     helperRobot.phaseTwo.rotation.z = THREE.MathUtils.degToRad(45);
  //     helperRobot.phaseThree.rotation.z = THREE.MathUtils.degToRad(-45);
  //     helperRobot.phaseFour.rotation.z = THREE.MathUtils.degToRad(0);
  //   });

  // const tweenR1Up = new TWEEN.Tween({
  //   zRotThree: THREE.MathUtils.degToRad(-135),
  // })
  //   .to(
  //     {
  //       zRotThree: THREE.MathUtils.degToRad(-100),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     weldingRobot2.phaseThree.rotation.z = coords.zRotThree;
  //   })
  //   .onComplete(() => {
  //     weldingRobot2.phaseThree.rotation.z = THREE.MathUtils.degToRad(-100);
  //   });

  // const tweenR1Down = new TWEEN.Tween({
  //   zRotThree: THREE.MathUtils.degToRad(-100),
  // })
  //   .to(
  //     {
  //       zRotThree: THREE.MathUtils.degToRad(-135),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     weldingRobot2.phaseThree.rotation.z = coords.zRotThree;
  //   })
  //   .onComplete(() => {
  //     weldingRobot2.phaseThree.rotation.z = THREE.MathUtils.degToRad(-135);
  //   });

  // const tweenR31weldStart = new TWEEN.Tween({
  //   yRotOne: THREE.MathUtils.degToRad(90),
  //   zRotTwo: THREE.MathUtils.degToRad(135),
  //   zRotThree: THREE.MathUtils.degToRad(-100),
  //   zRotFour: THREE.MathUtils.degToRad(-90),
  // })
  //   .to(
  //     {
  //       yRotOne: THREE.MathUtils.degToRad(0),
  //       zRotTwo: THREE.MathUtils.degToRad(110),
  //       zRotThree: THREE.MathUtils.degToRad(-75),
  //       zRotFour: THREE.MathUtils.degToRad(-125),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     weldingRobot2.phaseOne.rotation.y = coords.yRotOne;
  //     weldingRobot2.phaseTwo.rotation.z = coords.zRotTwo;
  //     weldingRobot2.phaseThree.rotation.z = coords.zRotThree;
  //     weldingRobot2.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     weldingRobot2.phaseOne.rotation.y = THREE.MathUtils.degToRad(0);
  //     weldingRobot2.phaseTwo.rotation.z = THREE.MathUtils.degToRad(110);
  //     weldingRobot2.phaseThree.rotation.z = THREE.MathUtils.degToRad(-75);
  //     weldingRobot2.phaseFour.rotation.z = THREE.MathUtils.degToRad(-125);

  //     particlesPosition = new THREE.Vector3(3, 35, -60);
  //     setTimeout(() => {
  //       particlesPosition = new THREE.Vector3(0, -40, 0);
  //     }, 1500);
  //   });

  // const tweenR31weldEnd = new TWEEN.Tween({
  //   yRotOne: THREE.MathUtils.degToRad(0),
  //   zRotTwo: THREE.MathUtils.degToRad(110),
  //   zRotThree: THREE.MathUtils.degToRad(-75),
  //   zRotFour: THREE.MathUtils.degToRad(-125),
  // })
  //   .to(
  //     {
  //       yRotOne: THREE.MathUtils.degToRad(90),
  //       zRotTwo: THREE.MathUtils.degToRad(135),
  //       zRotThree: THREE.MathUtils.degToRad(-100),
  //       zRotFour: THREE.MathUtils.degToRad(-90),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     weldingRobot2.phaseOne.rotation.y = coords.yRotOne;
  //     weldingRobot2.phaseTwo.rotation.z = coords.zRotTwo;
  //     weldingRobot2.phaseThree.rotation.z = coords.zRotThree;
  //     weldingRobot2.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     weldingRobot2.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);
  //     weldingRobot2.phaseTwo.rotation.z = THREE.MathUtils.degToRad(135);
  //     weldingRobot2.phaseThree.rotation.z = THREE.MathUtils.degToRad(-100);
  //     weldingRobot2.phaseFour.rotation.z = THREE.MathUtils.degToRad(-90);
  //   });

  // const tweenR2Up = new TWEEN.Tween({
  //   zRotThree: THREE.MathUtils.degToRad(-135),
  // })
  //   .to(
  //     {
  //       zRotThree: THREE.MathUtils.degToRad(-100),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     weldingRobot1.phaseThree.rotation.z = coords.zRotThree;
  //   })
  //   .onComplete(() => {
  //     weldingRobot1.phaseThree.rotation.z = THREE.MathUtils.degToRad(-100);
  //   });

  // const tweenR2Down = new TWEEN.Tween({
  //   zRotThree: THREE.MathUtils.degToRad(-100),
  // })
  //   .to(
  //     {
  //       zRotThree: THREE.MathUtils.degToRad(-135),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     weldingRobot1.phaseThree.rotation.z = coords.zRotThree;
  //   })
  //   .onComplete(() => {
  //     weldingRobot1.phaseThree.rotation.z = THREE.MathUtils.degToRad(-135);
  //   });

  // const tweenR32weldStart = new TWEEN.Tween({
  //   yRotOne: THREE.MathUtils.degToRad(90),
  //   zRotTwo: THREE.MathUtils.degToRad(135),
  //   zRotThree: THREE.MathUtils.degToRad(-100),
  //   zRotFour: THREE.MathUtils.degToRad(-90),
  // })
  //   .to(
  //     {
  //       yRotOne: THREE.MathUtils.degToRad(0),
  //       zRotTwo: THREE.MathUtils.degToRad(110),
  //       zRotThree: THREE.MathUtils.degToRad(-75),
  //       zRotFour: THREE.MathUtils.degToRad(-125),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     weldingRobot1.phaseOne.rotation.y = coords.yRotOne;
  //     weldingRobot1.phaseTwo.rotation.z = coords.zRotTwo;
  //     weldingRobot1.phaseThree.rotation.z = coords.zRotThree;
  //     weldingRobot1.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     weldingRobot1.phaseOne.rotation.y = THREE.MathUtils.degToRad(0);
  //     weldingRobot1.phaseTwo.rotation.z = THREE.MathUtils.degToRad(110);
  //     weldingRobot1.phaseThree.rotation.z = THREE.MathUtils.degToRad(-75);
  //     weldingRobot1.phaseFour.rotation.z = THREE.MathUtils.degToRad(-125);

  //     particlesPosition = new THREE.Vector3(-3, 35, 60);
  //     setTimeout(() => {
  //       particlesPosition = new THREE.Vector3(0, -40, 0);
  //     }, 1500);
  //   });

  // const tweenR32weldEnd = new TWEEN.Tween({
  //   yRotOne: THREE.MathUtils.degToRad(0),
  //   zRotTwo: THREE.MathUtils.degToRad(110),
  //   zRotThree: THREE.MathUtils.degToRad(-75),
  //   zRotFour: THREE.MathUtils.degToRad(-125),
  // })
  //   .to(
  //     {
  //       yRotOne: THREE.MathUtils.degToRad(90),
  //       zRotTwo: THREE.MathUtils.degToRad(135),
  //       zRotThree: THREE.MathUtils.degToRad(-100),
  //       zRotFour: THREE.MathUtils.degToRad(-90),
  //     },
  //     2000
  //   )
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .onUpdate((coords) => {
  //     weldingRobot1.phaseOne.rotation.y = coords.yRotOne;
  //     weldingRobot1.phaseTwo.rotation.z = coords.zRotTwo;
  //     weldingRobot1.phaseThree.rotation.z = coords.zRotThree;
  //     weldingRobot1.phaseFour.rotation.z = coords.zRotFour;
  //   })
  //   .onComplete(() => {
  //     weldingRobot1.phaseOne.rotation.y = THREE.MathUtils.degToRad(90);
  //     weldingRobot1.phaseTwo.rotation.z = THREE.MathUtils.degToRad(135);
  //     weldingRobot1.phaseThree.rotation.z = THREE.MathUtils.degToRad(-100);
  //     weldingRobot1.phaseFour.rotation.z = THREE.MathUtils.degToRad(-90);
  //   });

  // tweenR1GetToMainTable1.start();
  // tweenR1GetToMainTable1.chain(tweenR1GetToMainTable2);
  // tweenR1GetToMainTable2.chain(tweenR1GetToMainTable3);
  // tweenR1GetToMainTable3.chain(tweenR2GetFormStart);
  // tweenR2GetFormStart.chain(tweenR2GetFormTableDown);
  // tweenR2GetFormTableDown.chain(tweenR2GetFormTableUp);
  // tweenR2GetFormTableUp.chain(tweenR2GetToR1);
  // tweenR2GetToR1.chain(tweenR2GetFormTableDown2);
  // tweenR2GetFormTableDown2.chain(tweenR2GetFormTableUp2);
  // tweenR2GetFormTableUp2.chain(tweenR2BackToDefaultFromR1);
  // tweenR2BackToDefaultFromR1.chain(tweenR1Up);
  // tweenR1Up.chain(tweenR31weldStart);

  // tweenR1Up.chain(tweenR31weldStart);
  // tweenR31weldStart.chain(tweenR31weldEnd.delay(2000));
  // tweenR31weldEnd.chain(tweenR1Down);
  // tweenR1Down.chain(tweenR2GetFromR1ToR2);
  // tweenR2GetFromR1ToR2.chain(tweenR2GetFormTableDown3);
  // tweenR2GetFormTableDown3.chain(tweenR2GetFormTableUp3);
  // tweenR2GetFormTableUp3.chain(tweenR2GetFromR1ToR22);
  // tweenR2GetFromR1ToR22.chain(tweenR2GetFormTableDown4);
  // tweenR2GetFormTableDown4.chain(tweenR2GetFormTableUp4);
  // tweenR2GetFormTableUp4.chain(tweenR2BackToDefaultFromR2);
  // tweenR2BackToDefaultFromR2.chain(tweenR2Up);
  // tweenR2Up.chain(tweenR32weldStart);
  // tweenR32weldStart.chain(tweenR32weldEnd.delay(2000));
  // tweenR32weldEnd.chain(tweenR2Down);
  // tweenR2Down.chain(tweenR2BackFromDefaulttoR2);
  // tweenR2BackFromDefaulttoR2.chain(tweenR2GetFormTableDown5);
  // tweenR2GetFormTableDown5.chain(tweenR2GetFormTableUp5);
  // tweenR2GetFormTableUp5.chain(tweenR2BackFromR2ToTable);
  // tweenR2BackFromR2ToTable.chain(tweenR2GetFormTableDown6);
  // tweenR2GetFormTableDown6.chain(tweenR2GetFormTableUp6);
  // tweenR2GetFormTableUp6.chain(tweenR2BackFromTableToDefault);
  // tweenR2BackFromTableToDefault.chain(tweenR1GetToBack1);
  // tweenR1GetToBack1.chain(tweenR1GetBack2);
  // tweenR1GetBack2.chain(tweenR1GetBack3);
  // tweenR1GetBack3.chain(tweenR1GetToMainTable1.delay(2000));

  if (counter === 2) {
    console.log(counter);
    gsap.to(camera.position, {
      duration: 2.5,
      x: 100,
      y: 50,
      z: -150,
      ease: "power1.inOut",
    });
    gsap.to(controls.target, {
      duration: 2.5,
      x: 100,
      z: 0,
      y: 50,
      ease: "power1.inOut",
    });
    gsap.to(ridingRobot.robotObj.position, {
      duration: 4,
      x: 105,
      ease: "power1.inOut",
      onComplete: () => {
        ridingRobot.phaseTwo.attach(element);
      },
    });
    gsap.to(ridingRobot.phaseTwo.rotation, {
      duration: 4,
      z: THREE.MathUtils.degToRad(180),
      ease: "power1.inOut",
    });
    gsap.to(ridingRobot.wheelsBack.rotation, {
      duration: 4,
      z: 200,
    });
    gsap.to(ridingRobot.wheelsFront.rotation, {
      duration: 4,
      z: 200,
    });
  }

  scene.onBeforeRender = function () {
    TWEEN.update();
    weldingParticles(particlesPosition);
  };
}
