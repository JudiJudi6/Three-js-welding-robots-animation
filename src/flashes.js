import * as THREE from "three";

// Funkcja do generowania błysków światła
export function generateLightFlashes(scene, coordinates) {
  // Tworzenie światła punktowego
  const light = new THREE.PointLight(0xffffff, 100000, 10);
  light.position.set(coordinates.x, coordinates.y, coordinates.z);

  // Dodanie światła do sceny
  scene.add(light);

  // Animacja błysków światła (opcjonalne)
  const flashDuration = 0.5; // Czas trwania błysku w sekundach
  const flashIntensity = 2; // Intensywność błysku

  function animateFlash() {
    const currentTime = Date.now() * 0.001; // Konwersja czasu na sekundy
    const elapsedTime = (Math.sin(currentTime * 10) + 1) / 2; // Symulacja pulsacji błysku

    if (elapsedTime < flashDuration) {
      light.intensity = flashIntensity * (1 - elapsedTime / flashDuration);
    } else {
      light.intensity = 0;
    }
  }

  scene.onBeforeRender = function () {
    animateFlash();
  };
}
