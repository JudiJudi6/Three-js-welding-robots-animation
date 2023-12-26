import * as THREE from 'three';

export function renderScene(scene) {
    const boxGeometry = new THREE.BoxGeometry(400, 1, 400);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    boxMesh.position.y = -1;
    boxMesh.receiveShadow = true;
    scene.add(boxMesh);

    // const textureLoader = new THREE.TextureLoader();
    // textureLoader.load(
    //     'floor.jpg',
    //     (texture) => {
    //         texture.wrapS = THREE.RepeatWrapping;
    //         texture.wrapT = THREE.RepeatWrapping;
    //         texture.repeat.set(10, 10)
    //         boxMaterial.map = texture;
    //         boxMaterial.needsUpdate = true;
    //     },
    //     undefined,
    //     (error) => {
    //         console.error('Błąd ładowania tekstury', error);
    //     }
    // );
}