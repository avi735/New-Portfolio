'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef();
  const { mouse } = useThree();
  const particleCount = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  // For auto-rotation tracking
  const autoRotate = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Update auto rotation
    autoRotate.current.x += delta * 0.03;
    autoRotate.current.y += delta * 0.05;

    // Interactive mouse parallax
    const targetX = (mouse.y * Math.PI) / 6;
    const targetY = (mouse.x * Math.PI) / 6;
    
    // Easing the rotation towards (autoRotation + mouseTarget)
    pointsRef.current.rotation.x += ((autoRotate.current.x + targetX) - pointsRef.current.rotation.x) * 0.1;
    pointsRef.current.rotation.y += ((autoRotate.current.y + targetY) - pointsRef.current.rotation.y) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
