import { useEffect } from "react";
import * as THREE from "three";
import SceneInit from "./lib/SceneInit";
import { renderScene } from "./renderScene";
import { GUI } from "dat.gui";
import { robots } from "./robots";


function App() {
  
  useEffect(() => {
    const gui = new GUI();
    const project = new SceneInit("canvas");
    project.initialize();
    project.animate();

    const al = new THREE.AmbientLight(0xffffff, 0.3);
    project.scene.add(al);

    const alFolder = gui.addFolder("Ambient Light");
    alFolder.add(al, "intensity", 0, 1, 0.1);

    renderScene(project.scene, gui);
    robots(project.scene);

    return () => {
      project.scene.children = [];
      gui.destroy();
    };
  }, []);

  return (
    <div className="">
      <canvas id="canvas" />
    </div>
  );
}

export default App;
