"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  const particleCount = 4000;
  
  const [positions] = useState(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
       // Spread particles in a large cube
       arr[i * 3] = (Math.random() - 0.5) * 20;
       arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
       arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  });

  const { mouse, viewport } = useThree();

  useFrame((state, delta) => {
    if (ref.current) {
        // Drifting rotation
        ref.current.rotation.y -= delta * 0.05;
        ref.current.rotation.x -= delta * 0.02;

        // Magnetic Parallax effect on cursor
        const targetX = mouse.x * viewport.width * 0.05;
        const targetY = mouse.y * viewport.height * 0.05;
        
        ref.current.position.x += (targetX - ref.current.position.x) * 0.02;
        ref.current.position.y += (targetY - ref.current.position.y) * 0.02;
    }
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8C4A2A"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function SentientVoid() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <fog attach="fog" args={["#050505", 2, 10]} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
