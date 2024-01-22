import * as THREE from "three";

export function addSmoke(scene, startPosition = new THREE.Vector3()) {
  const pointLight = new THREE.PointLight(0xe4e4d5, 8000, 200);
  const spotLightHelper = new THREE.PointLightHelper(pointLight);
  pointLight.position.copy(startPosition);
  scene.add(spotLightHelper);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const smokeGeometry = new THREE.BufferGeometry();
  const smokeMaterial = new THREE.PointsMaterial({
    size: 1,
    color: 0xff5a00,
    transparent: true,
    opacity: 1,
  });

  const smokeParticles = new THREE.Points(smokeGeometry, smokeMaterial);
  const particlesData = [];

  for (let i = 0; i < 300; i++) {
    particlesData.push({
      position: startPosition.clone(),
      velocity: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ),
      lifespan: Math.random() * 0.5,
      age: 1,
    });
  }

  const positions = new Float32Array(particlesData.length * 3);

  for (let i = 0; i < particlesData.length; i++) {
    positions[i * 30] = particlesData[i].position.x;
    positions[i * 30 + 10] = particlesData[i].position.y;
    positions[i * 30 + 20] = particlesData[i].position.z;
  }

  smokeGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  scene.add(smokeParticles);

  function updateSmoke(pos) {
    // Aktualizacja intensywności point light na losową wartość z przedziału [5000, 10000]
    pointLight.intensity = Math.random() * 4000 + 500;

    // Aktualizacja pozycji point light
    pointLight.position.copy(pos);

    for (let i = 0; i < particlesData.length; i++) {
      const particle = particlesData[i];
      particle.position.add(particle.velocity);
      particle.age += 0.02;

      if (particle.age > particle.lifespan) {
        particle.position.copy(pos);
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

  return updateSmoke;
}
