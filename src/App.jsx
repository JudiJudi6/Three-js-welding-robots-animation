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

    // Ambient Light
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // GUI
    const gui = new GUI();
    const alFolder = gui.addFolder("Ambient Light");
    alFolder.add(ambientLight, "intensity", 0, 1, 0.1);

    // Render Scene
    renderScene(scene, gui);
    robots(scene);

    // Stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

    const tl = gsap.timeline();
    // Event Listener
    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("mousedown", () => {
      tl.to(camera.position, {
        x: 150,
        z: 150,
        duration: 1.5,
        onUpdate: function () {
          camera.lookAt(200, 50, 0);
        },
      });
      tl.to(camera.lookAt, {
        z: Math.PI, // Obrót o 180 stopni wokół osi Y
        x: Math.PI,
        duration: 1.5,
      });
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
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "+") {
        if (ambientLight.intensity < 0.7) ambientLight.intensity += 0.1;
      }
      if (e.key === "-") {
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
