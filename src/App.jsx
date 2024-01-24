import  { useRef, useEffect } from "react";
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
    robots(scene, camera, controls);

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
    </div>
  );
}

export default App;
