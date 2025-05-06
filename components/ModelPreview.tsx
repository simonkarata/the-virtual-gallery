'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  url: string;
};

function SpinningModel({ url }: { url: string }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return <primitive object={scene} ref={ref} />;
}

// Required for proper GLTF handling
useGLTF.preload('/models/example.glb');

export default function ModelPreview({ url }: Props) {
  if (!url) return null;

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 3], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <Suspense fallback={null}>
          <SpinningModel url={url} />
        </Suspense>
      </Canvas>
    </div>
  );
}
