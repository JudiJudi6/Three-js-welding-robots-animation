import * as THREE from "three";
import { box } from "./meshes/Box";
import { metalFrame } from "./metalFrame";
import { light } from "./light";
import { lamp } from "./meshes/Lamp";
import { blockButtonsFlag } from "./robots";
import toast from "react-hot-toast";

export function renderScene(scene, gui) {
  let isPressed = false;
  let currentNumberKey = null;

  const groundMesh = box(scene, 800, 1, 400, "floor.jpg", 10, 5);

  const wallMeshOne = box(scene, 800, 150, 1, "wall.jpg", 2, 1);
  wallMeshOne.position.z = -200;
  wallMeshOne.position.y = 75;

  const wallMeshTwo = box(scene, 800, 150, 1, "wall.jpg", 2, 1);
  wallMeshTwo.position.z = 200;
  wallMeshTwo.position.y = 75;

  const wallMeshThree = box(scene, 1, 300, 400, "wall.jpg", 1, 2);
  wallMeshThree.position.x = 400;
  wallMeshThree.position.y = 150;

  const wallMeshFour = box(scene, 1, 300, 400, "wall.jpg", 1, 2);
  wallMeshFour.position.x = -400;
  wallMeshFour.position.y = 150;

  const gateMesh = box(scene, 1, 75, 125, "gate.jpg");
  gateMesh.position.x = -399;
  gateMesh.position.y = 37;

  const sheetCeilingOneMesh = box(scene, 800, 1, 250, "sheet.jpg", 20, 20);
  sheetCeilingOneMesh.position.z = 100;
  sheetCeilingOneMesh.position.y = 195;
  sheetCeilingOneMesh.rotation.x = THREE.MathUtils.degToRad(25);

  const sheetCeilingTwoMesh = box(scene, 800, 1, 250, "sheet.jpg", 20, 20);
  sheetCeilingTwoMesh.position.z = -100;
  sheetCeilingTwoMesh.position.y = 195;
  sheetCeilingTwoMesh.rotation.x = THREE.MathUtils.degToRad(-25);

  metalFrame(scene, 0);
  metalFrame(scene, 200);
  metalFrame(scene, -200);
  metalFrame(scene, 395);
  metalFrame(scene, -395);

  const l1 = light(scene, 203, 120, 190, -1);
  lamp(scene, 203, 205, 105, 30, l1);
  const l1Folder = gui.addFolder("Lamp 1");
  l1Folder.add(l1, "visible");
  l1Folder.add(l1, "intensity", 5000, 50000, 1000);

  const l2 = light(scene, 3, 120, 190, -1);
  lamp(scene, 3, 205, 105, 30, l2);
  const l2Folder = gui.addFolder("Lamp 2");
  l2Folder.add(l2, "visible");
  l2Folder.add(l2, "intensity", 5000, 50000, 1000);

  const l3 = light(scene, -203, 120, 190, -1);
  lamp(scene, -203, 205, 105, 30, l3);
  const l3Folder = gui.addFolder("Lamp 3");
  l3Folder.add(l3, "visible");
  l3Folder.add(l3, "intensity", 5000, 50000, 1000);

  const l4 = light(scene, -203, 120, -190, 1);
  lamp(scene, -203, 205, -105, -30, l4);
  const l4Folder = gui.addFolder("Lamp 4");
  l4Folder.add(l4, "visible");
  l4Folder.add(l4, "intensity", 5000, 50000, 1000);

  const l5 = light(scene, 3, 120, -190, 1);
  lamp(scene, 3, 205, -105, -30, l5);
  const l5Folder = gui.addFolder("Lamp 5");
  l5Folder.add(l5, "visible");
  l5Folder.add(l5, "intensity", 5000, 50000, 1000);

  const l6 = light(scene, 203, 120, -190, 1);
  lamp(scene, 203, 205, -105, -30, l6);
  const l6Folder = gui.addFolder("Lamp 6");
  l6Folder.add(l6, "visible");
  l6Folder.add(l6, "intensity", 5000, 50000, 1000);

  const block = box(scene, 150, 25, 150);
  block.position.y = 12.5;

  const block2 = box(scene, 100, 25, 100);
  block2.position.y = 12.5;
  block2.position.x = 350;

  document.addEventListener("keydown", (e) => {
    if (isPressed) {
      return;
    }

    isPressed = true;

    if (e.key >= "1" && e.key <= "6") {
      currentNumberKey = e.key;

      switch (currentNumberKey) {
        case "1":
          if (!blockButtonsFlag) {
            toggleLamp(l1);
            lamp(scene, 203, 205, 105, 30, l1);
            if (!l1.visible) {
              toast.success("Lamp 1 - off");
            } else {
              toast.success("Lamp 1 - on");
            }
          }
          break;
        case "2":
          if (!blockButtonsFlag) {
            toggleLamp(l2);
            lamp(scene, 3, 205, 105, 30, l2);
            if (!l2.visible) {
              toast.success("Lamp 2 - off");
            } else {
              toast.success("Lamp 2 - on");
            }
          }
          break;
        case "3":
          if (!blockButtonsFlag) {
            toggleLamp(l3);
            lamp(scene, -203, 205, 105, 30, l3);
            if (!l3.visible) {
              toast.success("Lamp 3 - off");
            } else {
              toast.success("Lamp 3 - on");
            }
          }
          break;
        case "4":
          if (!blockButtonsFlag) {
            toggleLamp(l4);
            lamp(scene, -203, 205, -105, -30, l4);
            if (!l4.visible) {
              toast.success("Lamp 4 - off");
            } else {
              toast.success("Lamp 4 - on");
            }
          }
          break;
        case "5":
          if (!blockButtonsFlag) {
            toggleLamp(l5);
            lamp(scene, 3, 205, -105, -30, l5);
            if (!l5.visible) {
              toast.success("Lamp 5 - off");
            } else {
              toast.success("Lamp 5 - on");
            }
          }
          break;
        case "6":
          if (!blockButtonsFlag) {
            toast.success("Lamp 6 - off");
            toggleLamp(l6);
            lamp(scene, 203, 205, -105, -30, l6);
            if (!l6.visible) {
              toast.success("Lamp 6 - off");
            } else {
              toast.success("Lamp 6 - on");
            }
          }
          break;
      }
    }

    if (currentNumberKey && e.key === "+") {
      switch (currentNumberKey) {
        case "1":
          if (l1.intensity < 70000) l1.intensity += 5000;
          if (l1.intensity === 70000) {
            toast.success(`Lamp 1 intensity - max`);
          } else {
            toast.success(`Lamp 1 intensity - ${l1.intensity}`);
          }

          break;
        case "2":
          if (l2.intensity < 70000) l2.intensity += 5000;
          if (l2.intensity === 70000) {
            toast.success(`Lamp 2 intensity - max`);
          } else {
            toast.success(`Lamp 2 intensity - ${l2.intensity}`);
          }

          break;
        case "3":
          if (l3.intensity < 70000) l3.intensity += 5000;
          if (l3.intensity === 70000) {
            toast.success(`Lamp 3 intensity - max`);
          } else {
            toast.success(`Lamp 3 intensity - ${l3.intensity}`);
          }
          break;
        case "4":
          if (l4.intensity < 70000) l4.intensity += 5000;
          if (l4.intensity === 70000) {
            toast.success(`Lamp 4 intensity - max`);
          } else {
            toast.success(`Lamp 4 intensity - ${l4.intensity}`);
          }
          break;
        case "5":
          if (l5.intensity < 70000) l5.intensity += 5000;
          if (l5.intensity === 70000) {
            toast.success(`Lamp 5 intensity - max`);
          } else {
            toast.success(`Lamp 5 intensity - ${l5.intensity}`);
          }
          break;
        case "6":
          if (l6.intensity < 70000) l6.intensity += 5000;
          if (l6.intensity === 70000) {
            toast.success(`Lamp 6 intensity - max`);
          } else {
            toast.success(`Lamp 6 intensity - ${l6.intensity}`);
          }
          break;
      }
    }

    if (currentNumberKey && e.key === "-") {
      switch (currentNumberKey) {
        case "1":
          if (l1.intensity > 5000) l1.intensity -= 5000;
          if (l1.intensity === 5000) {
            toast.success(`Lamp 1 intensity - min`);
          } else {
            toast.success(`Lamp 1 intensity - ${l1.intensity}`);
          }
          break;
        case "2":
          if (l2.intensity > 5000) l2.intensity -= 5000;
          if (l2.intensity === 5000) {
            toast.success(`Lamp 2 intensity - min`);
          } else {
            toast.success(`Lamp 2 intensity - ${l2.intensity}`);
          }
          break;
        case "3":
          if (l3.intensity > 5000) l3.intensity -= 5000;
          if (l3.intensity === 5000) {
            toast.success(`Lamp 3 intensity - min`);
          } else {
            toast.success(`Lamp 3 intensity - ${l3.intensity}`);
          }
          break;
        case "4":
          if (l4.intensity > 5000) l4.intensity -= 5000;
          if (l4.intensity === 5000) {
            toast.success(`Lamp 4 intensity - min`);
          } else {
            toast.success(`Lamp 4 intensity - ${l4.intensity}`);
          }
          break;
        case "5":
          if (l5.intensity > 5000) l5.intensity -= 5000;
          if (l5.intensity === 5000) {
            toast.success(`Lamp 5 intensity - min`);
          } else {
            toast.success(`Lamp 5 intensity - ${l5.intensity}`);
          }
          break;
        case "6":
          if (l6.intensity > 5000) l6.intensity -= 5000;
          if (l6.intensity === 5000) {
            toast.success(`Lamp 6 intensity - min`);
          } else {
            toast.success(`Lamp 6 intensity - ${l6.intensity}`);
          }
          break;
      }
    }

    gui.updateDisplay();
  });

  document.addEventListener("keyup", (e) => {
    isPressed = false;

    if (e.key >= "1" && e.key <= "6") {
      currentNumberKey = null;
    }
  });

  function toggleLamp(lamp) {
    lamp.visible = !lamp.visible;
  }
}
