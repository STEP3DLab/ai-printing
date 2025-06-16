import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { computeVolumeAndArea } from '../utils/geometry';

export interface ModelViewerProps {
  file: File | string;
  onAnalysis?: (data: { volume: number; area: number }) => void;
}

function Model({ url, onLoad }: { url: string; onLoad: (g: THREE.Object3D) => void }) {
  const ext = url.split('.').pop()?.toLowerCase();
  const geometry = useLoader(ext === 'stl' ? STLLoader : OBJLoader, url);
  useEffect(() => {
    const obj = ext === 'stl' ? new THREE.Mesh(geometry) : geometry;
    onLoad(obj);
  }, [geometry, ext, onLoad]);
  return ext === 'stl' ? <mesh geometry={geometry as any} /> : <primitive object={geometry} />;
}

export default function ModelViewer({ file, onAnalysis }: ModelViewerProps) {
  const url = typeof file === 'string' ? file : URL.createObjectURL(file);

  const handleLoad = (object: THREE.Object3D) => {
    const { volume, area } = computeVolumeAndArea(object);
    onAnalysis?.({ volume, area });
  };

  return (
    <div className="h-64 w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model url={url} onLoad={handleLoad} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
