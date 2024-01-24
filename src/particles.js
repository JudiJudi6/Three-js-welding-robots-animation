import * as THREE from "three";

export function addSmoke(scene, startPosition = new THREE.Vector3()) {
  const pointLight = new THREE.PointLight(0xe4e4d5, 8000, 200);
  pointLight.position.copy(startPosition);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const textureLoader = new THREE.TextureLoader();
  const smokeTexture = textureLoader.load("smoke3.png");

  const smokeMaterial = new THREE.PointsMaterial({
    size: 4,
    transparent: true,
    opacity: 0.4,
    map: smokeTexture, 
    premultipliedAlpha: true,
    generateMipmaps: true,
    alphaTest: 0.2,
  });

  const smokeGeometry = new THREE.BufferGeometry();
  const smokeParticles = new THREE.Points(smokeGeometry, smokeMaterial);

  const sparkleGeometry = new THREE.BufferGeometry();
  const sparkleMaterial = new THREE.PointsMaterial({
    size: 0.5,
    color: 0xffc744,
    transparent: true,
    opacity: 1,
  });

  const sparkleParticles = new THREE.Points(sparkleGeometry, sparkleMaterial);
  smokeParticles.frustumCulled = false;
  sparkleParticles.frustumCulled = false;
  const sparklesData = [];
  const smokeData = [];

  for (let i = 0; i < 1000; i++) {
    sparklesData.push({
      position: startPosition.clone(),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 2, 
        Math.random() * 0.5 + 0.5, 
        (Math.random() - 0.5) * 2 
      ),
      lifespan: Math.random() * 0.5,
      age: 1,
    });
  }

  for (let j = 0; j < 10; j++) {
    smokeData.push({
      position: startPosition.clone(),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1, 
        (Math.random() * 0.5 + 0.5) * 0.1, 
        (Math.random() - 0.5) * 0.1 
      ),
      lifespan: Math.random() * 10,
      age: 10,
    });
  }

  const sparklesPositions = new Float32Array(sparklesData.length * 3);
  const smokePositions = new Float32Array(smokeData.length * 3);

  for (let i = 0; i < sparklesData.length; i++) {
    sparklesPositions[i * 30] = sparklesData[i].position.x;
    sparklesPositions[i * 30 + 10] = sparklesData[i].position.y;
    sparklesPositions[i * 30 + 20] = sparklesData[i].position.z;
  }

  for (let i = 0; i < smokeData.length; i++) {
    smokePositions[i * 3] = smokeData[i].position.x;
    smokePositions[i * 3 + 1] = smokeData[i].position.y;
    smokePositions[i * 3 + 2] = smokeData[i].position.z;
  }

  sparkleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(sparklesPositions, 3)
  );

  smokeGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(smokePositions, 3)
  );

  scene.add(sparkleParticles);
  scene.add(smokeParticles);

  function updateParticles(pos) {
    pointLight.intensity = Math.random() * 4000 + 500;

    pointLight.position.copy(pos);

    for (let i = 0; i < sparklesData.length; i++) {
      const particle = sparklesData[i];
      particle.position.add(particle.velocity);
      particle.age += 0.02;

      if (particle.age > particle.lifespan) {
        particle.position.copy(pos);
        particle.age = 0;
      }
    }

    for (let i = 0; i < smokeData.length; i++) {
      const particle = smokeData[i];
      particle.position.add(particle.velocity);
      particle.age += 0.02;

      if (particle.age > particle.lifespan) {
        particle.position.copy(pos);
        particle.age = 0;
      }
    }

    for (let i = 0; i < sparklesData.length; i++) {
      const particle = sparklesData[i];
      sparklesPositions[i * 3] = particle.position.x;
      sparklesPositions[i * 3 + 1] = particle.position.y;
      sparklesPositions[i * 3 + 2] = particle.position.z;
    }

    for (let i = 0; i < smokeData.length; i++) {
      const particle = smokeData[i];
      smokePositions[i * 3] = particle.position.x;
      smokePositions[i * 3 + 1] = particle.position.y;
      smokePositions[i * 3 + 2] = particle.position.z;
    }

    smokeGeometry.attributes.position.needsUpdate = true;
    sparkleGeometry.attributes.position.needsUpdate = true;
  }

  return updateParticles;
}
