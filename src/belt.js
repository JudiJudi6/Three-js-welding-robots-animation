import * as THREE from "three";
import { box } from "./meshes/Box";

// Funkcja do tworzenia tasomierza
export function createConveyorBelt(scene) {
    const block = box(scene,150,25,150)
    block.position.y = 12.5

    //   const conveyorGeometry = new THREE.TubeGeometry(
//     new THREE.LineCurve3(
//       new THREE.Vector3(0, 0, 0),
//       new THREE.Vector3(0, 0, -50)
//     ), // Krzywa trasy tasomierza
//     100, // Liczba segmentów rury
//     10, // Średnica rury
//     15, // Liczba segmentów w poprzek
//     true // Zamknięcie rury
//   );

//   const conveyorMaterial = new THREE.MeshBasicMaterial({
//     color: 0x333333,
//     side: THREE.DoubleSide,
//   });
//   const conveyorMesh = new THREE.Mesh(conveyorGeometry, conveyorMaterial);

//   scene.add(conveyorMesh);
//   return conveyorMesh;

  // Animacja tasomierza
//   function animateConveyor() {
//     conveyorMesh.rotation.z += 0.01; // Zmiana rotacji tasomierza
//   }
}
