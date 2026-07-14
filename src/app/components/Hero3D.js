'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function Geometry() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.8, 1]} />
        <meshStandardMaterial 
          color="#f59e0b" 
          wireframe={true} 
          emissive="#f43f5e"
          emissiveIntensity={0.8}
          transparent={true}
          opacity={0.15}
        />
      </mesh>
      
      {/* Inner solid core */}
      <mesh>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#18181b" 
          emissive="#f59e0b"
          emissiveIntensity={0.1}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center lg:justify-end lg:pr-32 opacity-60">
      <div className="w-full max-w-[800px] h-[800px]">
        <Canvas 
          camera={{ position: [0, 0, 10] }} 
          dpr={[1, 1.5]} 
          gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        >
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#f59e0b" />
          <Geometry />
        </Canvas>
      </div>
    </div>
  );
}
