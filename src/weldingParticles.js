import * as THREE from "three";
// Inicjalizacja sceny, kamery i renderera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Dodanie światła typu spotlight
var spotlight = new THREE.SpotLight(0xffffff);
spotlight.position.set(5, 5, 5);
scene.add(spotlight);

// Załadowanie shaderów
var vertexShader = `
  varying vec3 vPos;

  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

var fragmentShader = `
  varying vec3 vPos;

  void main() {
    // Ustalenie koloru światła w zależności od pozycji
    vec3 color = vec3(sin(vPos.x + vPos.y + vPos.z));

    // Dodanie efektu migania przez sinus
    color *= 0.5 + 0.5 * sin(5.0 * time);

    gl_FragColor = vec4(color, 1.0);
  }
`;

// Tworzenie materiału z shaderami
var material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    time: { value: 0.0 },
  },
});

// Tworzenie geometrii
var geometry = new THREE.BoxGeometry();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Ustawienie pozycji kamery
camera.position.z = 5;

// Aktualizacja czasu w shaderze
var clock = new THREE.Clock();
var animate = function () {
  requestAnimationFrame(animate);

  // Aktualizacja czasu w shaderze
  material.uniforms.time.value += clock.getDelta();

  // Renderowanie sceny
  renderer.render(scene, camera);
};

// Rozpoczęcie animacji
animate();
