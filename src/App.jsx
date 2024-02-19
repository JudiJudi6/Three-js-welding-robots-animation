import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import { renderScene } from "./renderScene";
import Stats from "three/examples/jsm/libs/stats.module";
import { blockButtonsFlag, robots } from "./robots";

function App() {
  const canvasRef = useRef();
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  const animations = useRef(null);
  const [toggleAutoAnimation, setToggleAutoAnimation] = useState();
  const width = window.innerWidth;
  const [openOptions, setOpenOptions] = useState(width > 600);

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((item, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  useEffect(() => {
    let renderer, stats, controls, ambientLight;

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
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.enableZoom = true;

    // Ambient Light
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // GUI
    const gui = new GUI();
    gui.closed = true;
    const alFolder = gui.addFolder("Ambient Light");
    alFolder.add(ambientLight, "intensity", 0, 1, 0.1);

    // Render Scene
    renderScene(scene, gui);
    animations.current = robots(scene, camera, controls);
    // Stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

    window.addEventListener("resize", onWindowResize, false);

    document.addEventListener("keydown", (e) => {
      if (!blockButtonsFlag) {
        if (e.key === "ArrowUp") {
          if (ambientLight.intensity < 0.7) ambientLight.intensity += 0.1;
          if (+ambientLight.intensity.toFixed(1) === 0.7) {
            toast.success(`Ambient light intensity - max`);
          } else {
            toast.success(
              `Ambient light intensity - ${+ambientLight.intensity.toFixed(1)}`
            );
          }
        }
        if (e.key === "ArrowDown") {
          if (ambientLight.intensity > 0.3) ambientLight.intensity -= 0.1;
          if (+ambientLight.intensity.toFixed(1) === 0.2) {
            toast.success(`Ambient light intensity - min`);
          } else {
            toast.success(
              `Ambient light intensity - ${+ambientLight.intensity.toFixed(1)}`
            );
          }
        }
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

  function stepForward() {
    const e = {
      key: "ArrowRight",
    };
    animations.current(e);
  }

  function stepBackward() {
    const e = {
      key: "ArrowLeft",
    };
    animations.current(e);
  }

  function autoAnimation() {
    const e = {
      key: "",
    };
    if (toggleAutoAnimation) {
      e.key = "ArrowLeft";
      setToggleAutoAnimation(false);
    } else {
      e.key = "a";
      setToggleAutoAnimation(true);
    }
    animations.current(e);
  }

  return (
    <div className="relative">
      <Toaster
        position="bottom-left"
        reverseOrder="true"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 1000,
          },
          loading: {
            duration: 1000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#333",
            color: "white",
          },
        }}
      />{" "}
      <div className="">
        <canvas ref={canvasRef} />
      </div>
      <div className="absolute bottom-2 right-2 z-[999] flex gap-2 text-xs sm:text-sm md:text-base p-2">
        <button
          onClick={stepForward}
          className="py-2 px-2 sm:py-3 sm:px-4 rounded-lg bg-blue-500 hover:bg-blue-800 transition-colors duration-300"
        >
          Forward
        </button>
        <button
          onClick={stepBackward}
          className="py-2 px-2 sm:py-3 sm:px-4 rounded-lg bg-blue-500 hover:bg-blue-800  transition-colors duration-300"
        >
          Backward
        </button>
        <button
          onClick={autoAnimation}
          className="py-2 px-2  sm:py-3 sm:px-4 rounded-lg bg-blue-500 hover:bg-blue-800  transition-colors duration-300"
        >
          {toggleAutoAnimation ? "Stop animation" : "Auto animation"}
        </button>
      </div>
      {width > 600 && (
        <button
          className="absolute right-0 p-2 top-1/2 -translate-y-1/2 flex flex-col bg-black"
          onClick={() => setOpenOptions(true)}
        >
          {" "}
          <span>H</span>
          <span>E</span>
          <span>L</span>
          <span>P</span>
        </button>
      )}
      {openOptions && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] flex flex-col justify-between items-center pb-10 gap-2 p-10 gap-4 bg-[#ececec] border-2 border-solid border-blue-500 rounded-xl">
          <p className="text-black text-center text-3xl">
            For better experience use device with large resolution
          </p>
          <p className="text-black">
            <span className="text-xl  leading-10">Controls:</span> <br />
            <span className="text-blue-500">Arrow Right</span> - animation one
            step forward <br />
            <span className="text-blue-500">Arrow Left</span> - animation one
            step backward <br />
            <span className="text-blue-500">Arrow Down</span> - dim ambient
            light
            <br />
            <span className="text-blue-500">Arrow Up </span>- brighten ambient
            light
            <br />
            <span className="text-blue-500">A</span> - turn on auto animation,
            to turn off press any arrow
            <br />
            <span className="text-blue-500">1-6</span> - control lamps
            <br />
            <span className="text-blue-500">Lamp number + "-" </span>- dim this
            lamp
            <br />
            <span className="text-blue-500">Lamp number + "+" </span>- brighten
            this lamp
            <br />
          </p>
          <button
            className="py-2 px-2 mx-20 sm:py-3 sm:px-4 rounded-lg border-solid border-2 border-blue-500 hover:bg-blue-500  transition-colors duration-300 text-black hover:text-white"
            onClick={() => setOpenOptions(false)}
          >
            I understand
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
