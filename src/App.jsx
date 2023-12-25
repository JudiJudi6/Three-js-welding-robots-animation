import { useEffect } from 'react';
import * as THREE from 'three';
import SceneInit from './lib/SceneInit';

function addSmoke(scene) {
  const smokeGeometry = new THREE.BufferGeometry();
  const smokeMaterial = new THREE.PointsMaterial({
    size: 1,
    color: 0xff5a00,
    transparent: true,
    opacity: 1,
  });

  const smokeParticles = new THREE.Points(smokeGeometry, smokeMaterial);
  const particlesData = [];

  for (let i = 0; i < 200; i++) {
    particlesData.push({
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5),
      lifespan: Math.random() * 0.5,
      age: 1,
    });
  }

  const positions = new Float32Array(particlesData.length * 3);

  for (let i = 0; i < particlesData.length; i++) {
    positions[i * 3] = particlesData[i].position.x;
    positions[i * 3 + 1] = particlesData[i].position.y;
    positions[i * 3 + 2] = particlesData[i].position.z;
  }

  smokeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  scene.add(smokeParticles);

  function updateSmoke() {
    for (let i = 0; i < particlesData.length; i++) {
      const particle = particlesData[i];
      particle.position.add(particle.velocity);
      particle.age += 0.02;

      if (particle.age > particle.lifespan) {
        particle.position.set(0, 0, 0);
        particle.age = 0;
      }
    }

    for (let i = 0; i < particlesData.length; i++) {
      const particle = particlesData[i];
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
    }

    smokeGeometry.attributes.position.needsUpdate = true;
  }

  scene.onBeforeRender = updateSmoke;
}

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // Dodaj efekt dymu
    addSmoke(test.scene);

    return () => {
      test.scene.children = []; // Usuń wszystkie elementy ze sceny
    };
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
