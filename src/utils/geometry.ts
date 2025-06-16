import * as THREE from 'three';

export function computeVolumeAndArea(object: THREE.Object3D) {
  let volume = 0;
  let area = 0;
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh) {
      const geometry = mesh.geometry.clone();
      geometry.computeBoundingBox();
      geometry.computeVertexNormals();
      const position = geometry.getAttribute('position');
      for (let i = 0; i < position.count; i += 3) {
        const p1 = new THREE.Vector3().fromBufferAttribute(position, i);
        const p2 = new THREE.Vector3().fromBufferAttribute(position, i + 1);
        const p3 = new THREE.Vector3().fromBufferAttribute(position, i + 2);
        volume += signedVolumeOfTriangle(p1, p2, p3);
        area += triangleArea(p1, p2, p3);
      }
    }
  });
  return { volume: Math.abs(volume), area };
}

function signedVolumeOfTriangle(p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3) {
  return p1.dot(p2.cross(p3)) / 6;
}

export function triangleArea(p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3) {
  return new THREE.Triangle(p1, p2, p3).getArea();
}
