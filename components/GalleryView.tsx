'use client';

import { useGalleryContext } from '@/context/GalleryContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import UserControl from './UserControl';

function InteractiveModel({ url }: { url: string }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url); // must be inside <Suspense>
  return <primitive object={scene} ref={ref} />;
}

export default function GalleryView() {
  const { selectedGallery } = useGalleryContext();

  if (!selectedGallery) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700 text-lg">No gallery selected.</p>
      </div>
    );
  }

  // Optional: Preload model when gallery is selected
  // useGLTF.preload(selectedGallery.modelPath);

  return (
    <div className="relative w-full h-screen">
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 50 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 5, 2]} intensity={1.2} />
        <Suspense fallback={<LoadingOverlay />}>
          <InteractiveModel url={selectedGallery.modelPath} />
          <OrbitControls enablePan enableRotate enableZoom />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
        <UserControl modelPath={selectedGallery.modelPath} />
      </div>
    </div>
  );
}

function LoadingOverlay() {
  return (
    <mesh>
        <div className="text-white text-lg bg-black bg-opacity-50 px-4 py-2 rounded">
          Loading model...
        </div>
    </mesh>
  );
}
