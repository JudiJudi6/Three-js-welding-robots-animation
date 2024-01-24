import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { robot1 } from "./robot1";
import { robot2 } from "./robot2";
import { robot3 } from "./robot3";
import { addSmoke } from "./particles";
import { box } from "./meshes/Box";
import gsap from "gsap";
import { toast } from "react-hot-toast";

export let blockButtonsFlag = false;

export function robots(scene, camera, controls) {
  let counter = 0;
  let tla = gsap.timeline();
  let secondTla = gsap.timeline();
  let autoFlag = false;

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

  document.addEventListener("keydown", animations);

  function animations(e) {
    if (
      (e?.key >= "1" && e?.key <= "6") ||
      e?.key === "+" ||
      e?.key === "-" ||
      e?.key === "ArrowUp" ||
      e?.key === "ArrowDown"
    ) {
      return;
    }

    if (e?.key === "a") {
      toast.success("Auto animation on");
      autoFlag = true;
    }
    if (autoFlag) {
      if (e?.key === "ArrowRight" || e?.key === "ArrowLeft") {
        toast.success("Auto animation off");
        autoFlag = false;
      }
    }

    if (!blockButtonsFlag) {
      tla.clear();
      secondTla.clear();

      if (e?.key === "ArrowRight" || autoFlag) {
        // if(counter )
        counter += 1;
        // console.log(counter);

        // 1

        if (counter === 1) {
          toast.loading(`Stage ${counter}`);

          gsap
            .to(camera.position, {
              duration: 3,
              x: 100,
              y: 50,
              z: -150,
              // ease: "power1.in",
              onStart: () => {
                blockButtonsFlag = true;
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
                onComplete: () => {
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                  if (autoFlag) {
                    animations();
                  }
                },
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
            z: -200,
            delay: 1.3,
          });
          gsap.to(ridingRobot.wheelsFront.rotation, {
            duration: 2,
            z: -200,
            delay: 1.3,
          });
        }

        // 2

        if (counter === 2) {
          toast.loading(`Stage ${counter}`);
          gsap.to(controls.target, {
            duration: 4,
            x: 100,
            y: 50,
            z: 0,
            onStart: () => {
              blockButtonsFlag = true;
            },
          });
          gsap.to(camera.position, {
            duration: 5,
            x: 100,
            y: 50,
            z: -150,
            ease: "power1.inOut",
            onComplete: () => {
              blockButtonsFlag = false;
              toast.success(`Stage ${counter}`);
              if (autoFlag) {
                animations();
              }
            },
          });

          gsap.to(ridingRobot.robotObj.position, {
            duration: 4,
            x: 105,
            ease: "power1.inOut",
            onStart: () => {
              ridingRobot.phaseTwo.attach(element);
            },
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
          toast.loading(`Stage ${counter}`);
          gsap.to(camera.position, {
            duration: 2.5,
            x: 0,
            z: 140,
            y: 140,
            ease: "power1.inOut",
            onStart: () => {
              blockButtonsFlag = true;
            },
            onComplete: () => {
              blockButtonsFlag = false;
              toast.success(`Stage ${counter}`);
              if (autoFlag) {
                animations();
              }
            },
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
            z: 0,
          });
          gsap.to(ridingRobot.wheelsFront.rotation, {
            duration: 2,
            z: 0,
          });
        }
      }

      if (counter === 4) {
        toast.loading(`Stage ${counter}`);
        tla.clear();

        tla
          .to(helperRobot.phaseOne.rotation, {
            duration: 2,
            y: THREE.MathUtils.degToRad(0),
            ease: "power1.inOut",
            onStart: () => {
              blockButtonsFlag = true;
            },
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
              onComplete: () => {
                blockButtonsFlag = false;
                toast.success(`Stage ${counter}`);
                if (autoFlag) {
                  animations();
                }
              },
            },
            "-=1.5"
          );
      }

      if (counter === 5) {
        toast.loading(`Stage ${counter}`);
        tla.clear();

        tla
          .to(controls.target, {
            duration: 2,
            z: -60,
            x: 0,
            y: 40,
            ease: "power1.inOut",
            onStart: () => {
              blockButtonsFlag = true;
            },
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
          )
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
              onComplete: () => {
                blockButtonsFlag = false;
                toast.success(`Stage ${counter}`);
                if (autoFlag) {
                  animations();
                }
              },
            },
            "-=1.5"
          );
      }

      if (counter === 6) {
        toast.loading(`Stage ${counter}`);
        tla.clear();

        tla
          .to(helperRobot.phaseOne.rotation, {
            duration: 2,
            y: THREE.MathUtils.degToRad(180),
            ease: "power1.inOut",
            onStart: () => {
              blockButtonsFlag = true;
            },
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
                particlesPosition = new THREE.Vector3(3, 36, -59);
                controls.autoRotate = true;
                controls.autoRotateSpeed = -0.3;
                blockButtonsFlag = false;
                toast.success(`Stage ${counter}`);
                if (autoFlag) {
                  setTimeout(() => {
                    animations();
                  }, 5000);
                }
              },
            },
            "-=2.5"
          );
      }

      if (counter === 7) {
        toast.loading(`Stage ${counter}`);
        tla.clear();
        secondTla.clear();

        tla
          .to(weldingRobot2.phaseThree.rotation, {
            duration: 2,
            z: THREE.MathUtils.degToRad(-50),
            ease: "power1.inOut",
            onStart: () => {
              particlesPosition = new THREE.Vector3(0, -40, 0);
              blockButtonsFlag = true;
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
                toast.success(`Stage ${counter}`);
                if (autoFlag) {
                  animations();
                }
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
              onComplete: () => {
                blockButtonsFlag = false;
                toast.success(`Stage ${counter}`);
                if (autoFlag) {
                  animations();
                }
              },
            },
            "-=3"
          );
      }

      if (counter === 8) {
        toast.loading(`Stage ${counter}`);
        tla.clear();

        tla
          .to(helperRobot.phaseTwo.rotation, {
            duration: 1.5,
            z: THREE.MathUtils.degToRad(15),
            ease: "power1.inOut",
            onStart: () => {
              blockButtonsFlag = true;
            },
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
                particlesPosition = new THREE.Vector3(-3, 36, 59);
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.3;
                blockButtonsFlag = false;
                toast.success(`Stage ${counter}`);
                if (autoFlag) {
                  setTimeout(() => {
                    animations();
                  }, 5000);
                }
              },
            },
            "-=2.5"
          );
      }

      if (counter === 9) {
        toast.loading(`Stage ${counter}`);
        tla.clear();

        tla
          .to(weldingRobot1.phaseThree.rotation, {
            duration: 2,
            z: THREE.MathUtils.degToRad(-50),
            ease: "power1.inOut",
            onStart: () => {
              particlesPosition = new THREE.Vector3(0, -40, 0);
              blockButtonsFlag = true;
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
              onComplete: () => {
                toast.success(`Stage ${counter}`);
                blockButtonsFlag = false;
                if (autoFlag) {
                  animations();
                }
              },
            },
            "-=1.5"
          );
      }

      if (counter === 10) {
        toast.loading(`Stage ${counter}`);
        tla.clear();

        tla
          .to(controls.target, {
            duration: 3,
            x: 50,
            y: 40,
            z: 0,
            ease: "power1.inOut",
            onStart: () => {
              blockButtonsFlag = true;
            },
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
              onComplete: () => {
                blockButtonsFlag = false;
                toast.success(`Stage ${counter}`);
                if (autoFlag) {
                  animations();
                }
              },
            },
            "-=1.5"
          );
      }

      if (counter === 11) {
        toast.loading(`Stage ${counter}`);
        tla.clear();

        tla
          .to(helperRobot.phaseOne.rotation, {
            duration: 1.5,
            y: THREE.MathUtils.degToRad(180),
            ease: "power1.inOut",
            onStart: () => {
              blockButtonsFlag = true;
            },
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
              onComplete: () => {
                blockButtonsFlag = false;
                toast.success(`Stage ${counter}`);
                if (autoFlag) {
                  animations();
                }
              },
            },
            "-=3"
          );
      }

      if (counter === 12) {
        toast.loading(`Stage ${counter}`);
        tla.clear();

        tla
          .to(camera.position, {
            duration: 4,
            x: 250,
            y: 50,
            z: -150,
            onStart: () => {
              blockButtonsFlag = true;
            },
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
              onComplete: () => {
                blockButtonsFlag = false;
                toast.success(`Stage ${counter}`);
                if (autoFlag) {
                  animations();
                }
              },
            },
            "-=4"
          );
      }

      if (counter === 13) {
        tla.clear();
        toast.loading(`Stage ${counter}`);

        tla
          .to(controls.target, {
            duration: 3,
            x: 0,
            y: 50,
            ease: "power1.inOut",
            onStart: () => {
              blockButtonsFlag = true;
            },
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
              onComplete: () => {
                blockButtonsFlag = false;
                toast.success(`Stage ${counter}`);
                setTimeout(() => {
                  autoFlag = false;
                  counter = 0;
                  toast.success("This is the end");
                }, 1000);
              },
            },
            "-=3"
          );
      }

      //---------------------------------------------------------------------------------------

      if (e?.key === "ArrowLeft") {
        if (counter > 0) counter -= 1;
        // console.log(counter);

        // 1

        if (counter === 0) {
          toast.loading(`Stage ${counter}`);
          gsap.to(controls.target, {
            duration: 3,
            x: 0,
            y: 50,
            ease: "power1.inOut",
            onStart: () => {
              blockButtonsFlag = true;
            },
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
            onComplete: () => {
              blockButtonsFlag = false;
              toast.success(`Stage ${counter}`);
            },
          });
        }

        // 2 r

        if (counter === 1) {
          toast.loading(`Stage ${counter}`);
          gsap.to(camera.position, {
            duration: 4,
            x: 250,
            y: 50,
            z: -150,
            onStart: () => {
              blockButtonsFlag = true;
              return gsap.to(controls.target, {
                duration: 4,
                x: 320,
                y: 50,
                ease: "power1.inOut",
                onComplete: () => {
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                },
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
          toast.loading(`Stage ${counter}`);
          // console.log(counter);
          gsap.to(camera.position, {
            duration: 2.5,
            x: 100,
            y: 50,
            z: -150,
            ease: "power1.inOut",
            onStart: () => {
              blockButtonsFlag = true;
            },
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
              blockButtonsFlag = false;
              toast.success(`Stage ${counter}`);
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
          toast.loading(`Stage ${counter}`);
          // const tl = gsap.timeline();
          tla.clear();

          tla
            .to(helperRobot.phaseTwo.rotation, {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(15),
              ease: "power1.inOut",
              onStart: () => {
                blockButtonsFlag = true;
              },
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
                onComplete: () => {
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                },
              });
            });
        }

        if (counter === 4) {
          toast.loading(`Stage ${counter}`);
          tla.clear();
          secondTla.clear();

          secondTla
            .to(controls.target, {
              duration: 2,
              x: 50,
              y: 50,
              z: 0,
              ease: "power1.inOut",
              onStart: () => {
                blockButtonsFlag = true;
              },
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
                onComplete: () => {
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                },
              });
            });
        }

        if (counter === 5) {
          toast.loading(`Stage ${counter}`);
          tla.clear();

          tla
            .to(weldingRobot2.phaseThree.rotation, {
              duration: 2,
              z: THREE.MathUtils.degToRad(-50),
              ease: "power1.inOut",
              onStart: () => {
                particlesPosition = new THREE.Vector3(0, -40, 0);
                controls.autoRotate = false;
                blockButtonsFlag = true;
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
              onComplete: () => {
                blockButtonsFlag = false;
                toast.success(`Stage ${counter}`);
              },
            });
        }

        if (counter === 6) {
          toast.loading(`Stage ${counter}`);
          tla.clear();

          tla
            .to(controls.target, {
              duration: 3,
              x: 0,
              y: 40,
              z: -60,
              ease: "power1.inOut",
              onStart: () => {
                blockButtonsFlag = true;
              },
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
                  particlesPosition = new THREE.Vector3(3, 36, -59);
                  controls.autoRotate = true;
                  controls.autoRotateSpeed = -0.3;
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                },
              },
              "-=2.5"
            );
        }

        if (counter === 7) {
          toast.loading(`Stage ${counter}`);
          tla.clear();

          tla
            .to(weldingRobot1.phaseThree.rotation, {
              duration: 2,
              z: THREE.MathUtils.degToRad(-50),
              ease: "power1.inOut",
              onStart: () => {
                particlesPosition = new THREE.Vector3(0, -40, 0);
                blockButtonsFlag = true;
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
                onComplete: () => {
                  controls.autoRotate = false;
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                },
              },
              "-=1.5"
            );
        }

        if (counter === 8) {
          toast.loading(`Stage ${counter}`);
          tla.clear();

          tla
            .to(helperRobot.phaseTwo.rotation, {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(15),
              ease: "power1.inOut",
              onStart: () => {
                blockButtonsFlag = true;
              },
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
                  particlesPosition = new THREE.Vector3(-3, 36, 59);
                  controls.autoRotate = true;
                  controls.autoRotateSpeed = 0.3;
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                },
              },
              "-=2.5"
            );
        }

        if (counter === 9) {
          toast.loading(`Stage ${counter}`);
          tla.clear();

          tla
            .to(helperRobot.phaseTwo.rotation, {
              duration: 1.5,
              z: THREE.MathUtils.degToRad(15),
              ease: "power1.inOut",
              onStart: () => {
                blockButtonsFlag = true;
              },
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
                onComplete: () => {
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                },
              },
              "-=3"
            );
        }

        if (counter === 10) {
          toast.loading(`Stage ${counter}`);
          tla.clear();

          tla
            .to(ridingRobot.robotObj.position, {
              duration: 3,
              x: 200,
              ease: "power1.inOut",
              onStart: () => {
                table.attach(element);
                blockButtonsFlag = true;
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
                onComplete: () => {
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                },
              },
              "-=3"
            );
        }

        if (counter === 11) {
          toast.loading(`Stage ${counter}`);
          tla.clear();

          tla
            .to(camera.position, {
              duration: 2.5,
              x: 140,
              y: 80,
              z: -150,
              ease: "power1.inOut",
              onStart: () => {
                blockButtonsFlag = true;
              },
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
                onComplete: () => {
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                },
              },
              "-=4"
            );
        }

        if (counter === 12) {
          toast.loading(`Stage ${counter}`);
          gsap
            .to(camera.position, {
              duration: 3,
              x: 100,
              y: 50,
              z: -150,
              // ease: "power1.in",
              onStart: () => {
                blockButtonsFlag = true;
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
                onComplete: () => {
                  blockButtonsFlag = false;
                  toast.success(`Stage ${counter}`);
                },
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
      }
    }
  }
  scene.onBeforeRender = function () {
    TWEEN.update();
    weldingParticles(particlesPosition);
  };
}
