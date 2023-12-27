import { useEffect } from "react";
import * as THREE from "three";
import * as TWEEN from "tween.js" 
import SceneInit from "./lib/SceneInit";
import { addSmoke } from "./particles";
import { renderScene } from "./renderScene";
import { GUI } from "dat.gui";
import { robot1 } from "./robot1";

function App() {
  useEffect(() => {
    const project = new SceneInit("canvas");
    project.initialize();
    project.animate();


    
    const gui = new GUI();

    const al = new THREE.AmbientLight(0xffffff, 0.3);
    project.scene.add(al);

    // set up ambient light gui
    const alFolder = gui.addFolder("ambient light");
    const alSettings = { color: al.color.getHex() };
    alFolder.add(al, "visible");
    alFolder.add(al, "intensity", 0, 1, 0.1);
    alFolder
      .addColor(alSettings, "color")
      .onChange((value) => al.color.set(value));
    alFolder.open();

    // const dl = new THREE.DirectionalLight(0xffffff, 0.5);
    // dl.position.set(0, 30, 200);
    // dl.intensity = 10
    // dl.castShadow = true;

    // dl.shadow.mapSize.width = 2000;
    // dl.shadow.mapSize.height = 2000;
    // dl.shadow.camera.near = 1;
    // dl.shadow.camera.far = 500;

    // const dlHelper = new THREE.DirectionalLightHelper(project.directionalLight, 3);
    // project.scene.add(project.directionalLight);
    // project.scene.add(dlHelper);

    // const dlSettings = {
    //   visible: true,
    //   color: project.directionalLight.color.getHex(),
    // };
    // const dlFolder = gui.addFolder("directional light");
    // dlFolder.add(dlSettings, "visible").onChange((value) => {
    //   project.directionalLight.visible = value;
    //   dlHelper.visible = value;
    // });
    // dlFolder.add(project.directionalLight, "intensity", 0, 10, 0.25);
    // dlFolder.add(project.directionalLight.position, "y", 1, 400, 10);
    // dlFolder.add(project.directionalLight.position, "x", 1, 400, 10);
    // dlFolder.add(project.directionalLight, "castShadow");
    // dlFolder
    //   .addColor(dlSettings, "color")
    //   .onChange((value) => project.directionalLight.color.set(value));
    // dlFolder.open();

    // Dodaj efekt dymu
    // addSmoke(test.scene);

    // const boxGeometry = new THREE.BoxGeometry()
    // const boxMaterial = new THREE.MeshNormalMaterial()
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    // boxMesh.receiveShadow = true
    // boxMesh.castShadow = true
    // project.scene.add(boxMesh)

    renderScene(project.scene);
    robot1(project.scene);

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
