import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import { renderScene } from "./renderScene";
import Stats from "three/examples/jsm/libs/stats.module";
import { robots } from "./robots";
import { gsap } from "gsap";

function App() {
  const canvasRef = useRef();

  useEffect(() => {
    let renderer, stats, controls, ambientLight;

    // Scene initialization
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 200;
    camera.position.y = 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotateSpeed = -0.5;
    controls.enableDamping = true
    controls.dampingFactor = 0.12
    controls.enableZoom = true

    // controls.autoRotate = true;
    // controls.enabled = false;

    // Ambient Light
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // GUI
    const gui = new GUI();
    gui.closed = true
    const alFolder = gui.addFolder("Ambient Light");
    alFolder.add(ambientLight, "intensity", 0, 1, 0.1);

    // Render Scene
    renderScene(scene, gui);
    robots(scene, camera, controls);

    // Stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

    window.addEventListener("resize", onWindowResize, false);
    // window.addEventListener("mouseup", (e) => {
    //   if (e.button === 0) {
    //     counter += 1
    //     console.log(counter)
    //     console.log("Kliknięcie lewym przyciskiem myszy");
    //   }

    //   if (e.button === 2) {
    //     counter += 1
    //     console.log(counter)
    //     console.log("Kliknięcie prawym przyciskiem myszy");
    //   }
      // counter += 1;
      // tl.to(camera.position, {
      //   x: 150,
      //   z: 150,
      //   duration: 1.5,
      //   onUpdate: function () {
      //     camera.lookAt(200, 50, 0);
      //   },
      // });
      // tl.to(camera.lookAt, {
      //   z: Math.PI, // Obrót o 180 stopni wokół osi Y
      //   x: Math.PI,
      //   duration: 1.5,
      // });
      // gsap.to(camera.position, {
      //   duration: 2, // Czas trwania animacji w sekundach
      //   x: 200, // Nowa pozycja X kamery
      //   y: 100, // Nowa pozycja Y kamery
      //   z: 0, // Nowa pozycja Z kamery
      //   ease: "power1.inOut", // Funkcja łagodzenia animacji (opcjonalna)
      // });

      // if (counter === 2) {
      //   gsap.to(camera.position, {
      //     duration: 2, // Czas trwania animacji w sekundach
      //     x: 300, // Nowa pozycja X kamery
      //     y: 100, // Nowa pozycja Y kamery
      //     z: 0, // Nowa pozycja Z kamery
      //     ease: "power1.inOut", // Funkcja łagodzenia animacji (opcjonalna)
      //   });
      // }

      // if (counter === 3) {
      //   gsap.to(camera.rotation, {
      //     duration: 2,
      //     y: THREE.MathUtils.degToRad(90),
      //     ease: "power1.inOut",
      //     onUpdate: () => {
      //       // camera.lookAt(new THREE.Vector3(0, 0, 0));
      //       camera.lookAt(lookAtVector);
      //     },
      //   });
      // if (counter === 2) {
      //   gsap.to(controls.target, {
      //     duration: 3,
      //     x: 400,
      //     ease: "power1.inOut",
      //     onUpdate: () => {
      //       // camera.lookAt(new THREE.Vector3(0, 0, 0));
      //       // counter += 1;
      //       // camera.lookAt(lookAtVector);
      //       // console.log(counter);
      //     },
      //   });
      // }

      // if (counter === 4) {
      //   camera.lookAt(new THREE.Vector3(300, 300, 300));
      // }



      // Animacja kamery wokół okręgu za pomocą GSAP
      // gsap.to(
      //   {},
      //   {
      //     duration: 1, // Czas trwania animacji w sekundach
      //     repeat: -1, // Powtarzaj nieskończoność razy
      //     onUpdate: (progress) => {
      //       const theta = progress * Math.PI * 2; // 2 * PI odpowiada pełnemu obrotowi
      //       updateCameraPosition(theta);
      //       renderer.render(scene, camera);
      //     },
      //   }
      // );
      // .to(camera.position, {
      //   x: -150,
      //   duration: 3.5,
      //   onUpdate: function () {
      //     camera.lookAt(0, 0, 0);
      //   },
      // })
      // .to(camera.position, {
      //   x: -150,
      //   duration: 2.5,
      //   onUpdate: function () {
      //     camera.lookAt(0, 0, 0);
      //   },
      // })
      // .to(camera.position, {
      //   z: -150,
      //   duration: 1.5,
      //   onUpdate: function () {
      //     camera.lookAt(0, 0, 0);
      //   },
      // });
    // });
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        if (ambientLight.intensity < 0.7) ambientLight.intensity += 0.1;
      }
      if (e.key === "ArrowDown") {
        if (ambientLight.intensity > 0.3) ambientLight.intensity -= 0.1;
      }
    });

    // Animation
    animate();

    return () => {
      scene.children = [];
      gui.destroy();
    };

    function animate() {
      requestAnimationFrame(animate);
      render();
      stats.update();
      controls.update();
      // console.log(camera.lookAt)
      // gsap.updateRoot()
    }

    function render() {
      renderer.render(scene, camera);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, [canvasRef]);

  return (
    <div className="">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;