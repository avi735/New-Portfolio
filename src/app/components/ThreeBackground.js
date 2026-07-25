'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/** Adaptive particle count based on device capability */
function getParticleCount() {
  if (typeof window === 'undefined') return 1000;
  const isMobile = window.innerWidth < 768;
  if (isMobile) return 500;
  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores <= 4) return 1000;
  return 1500;
}

function Particles() {
  const pointsRef = useRef();
  const { mouse } = useThree();
  const particleCount = useMemo(() => getParticleCount(), []);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, [particleCount]);

  const autoRotate = useRef({ x: 0, y: 0 });
  // Frame counter for throttling — only update rotation every 2nd frame
  const frameCount = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return; // skip odd frames

    autoRotate.current.x += delta * 0.03;
    autoRotate.current.y += delta * 0.05;

    const targetX = (mouse.y * Math.PI) / 6;
    const targetY = (mouse.x * Math.PI) / 6;
    
    pointsRef.current.rotation.x +=
      ((autoRotate.current.x + targetX) - pointsRef.current.rotation.x) * 0.1;
    pointsRef.current.rotation.y +=
      ((autoRotate.current.y + targetY) - pointsRef.current.rotation.y) * 0.1;
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
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);

  // Defer mounting by one tick to prevent blocking initial paint
  useEffect(() => {
    // requestIdleCallback vs setTimeout: track which type was used for cleanup
    let id;
    let usedIdleCallback = false;

    if (typeof requestIdleCallback !== 'undefined') {
      usedIdleCallback = true;
      id = requestIdleCallback(() => setMounted(true), { timeout: 2000 });
    } else {
      id = setTimeout(() => setMounted(true), 100);
    }

    return () => {
      if (usedIdleCallback) {
        cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);

  // Pause Three.js rendering when the tab is not visible — saves battery and CPU
  useEffect(() => {
    if (!mounted) return;
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const onVisibilityChange = () => {
      if (document.hidden) {
        canvas.style.visibility = 'hidden';
      } else {
        canvas.style.visibility = 'visible';
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 opacity-40" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 1.2]}
        gl={{
          antialias: false,
          powerPreference: 'default',
          alpha: true,
          stencil: false,
          depth: false,
        }}
        frameloop="always"
      >
        <Particles />
      </Canvas>
    </div>
  );
}
