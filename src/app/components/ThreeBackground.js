'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Starfield({ count = 2000, radius = 20, color = "#22d3ee", size = 0.05, speed = 1, rotationSpeed = 20 }) {
  const ref = useRef();
  
  const sphere = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.cbrt(Math.random()) * radius;
      
      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = r * Math.cos(phi);
    }
    return temp;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= (delta / rotationSpeed) * speed;
      ref.current.rotation.y -= (delta / (rotationSpeed * 1.5)) * speed;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function WireframeShape({ position, speed = 1, color = "#22d3ee", scale = 1 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15 * speed;
      meshRef.current.rotation.y += delta * 0.2 * speed;
      meshRef.current.rotation.z += delta * 0.1 * speed;
    }
  });

  return (
    <mesh position={position} ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial color={color} wireframe={true} transparent opacity={0.12} />
    </mesh>
  );
}

function CameraController() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to -1 to +1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    // Target camera position based on mouse (subtle parallax)
    const targetX = mouse.current.x * 1.5;
    const targetY = mouse.current.y * 1.5;
    
    // Lerp camera for smooth movement
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-[#080c18]" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <fog attach="fog" args={['#080c18', 5, 25]} />
        
        <CameraController />
        
        {/* Distant background stars (Violet) */}
        <Starfield count={3000} radius={25} color="#818cf8" size={0.03} speed={0.4} rotationSpeed={25} />
        {/* Mid-ground stars (Cyan) */}
        <Starfield count={1500} radius={18} color="#22d3ee" size={0.05} speed={0.8} rotationSpeed={20} />
        {/* Foreground sparse bright stars (White/Cyan) */}
        <Starfield count={300} radius={10} color="#f1f5f9" size={0.08} speed={1.5} rotationSpeed={15} />
        
        {/* Floating 3D Wireframe Geometries */}
        <WireframeShape position={[-6, 3, -8]} color="#818cf8" speed={0.6} scale={1.2} />
        <WireframeShape position={[7, -2, -12]} color="#22d3ee" speed={0.8} scale={1.5} />
        <WireframeShape position={[-5, -4, -15]} color="#22d3ee" speed={0.4} scale={1.8} />
        <WireframeShape position={[6, 5, -10]} color="#818cf8" speed={0.5} scale={1.0} />
      </Canvas>
    </div>
  );
}
