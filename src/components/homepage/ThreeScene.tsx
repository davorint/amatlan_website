'use client'

import { useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// Fixed positions to prevent hydration mismatches
const particlePositions = [
  [0.8, 0.5, -0.5],
  [-0.5, -0.3, 0.8],
  [1.2, -0.8, 0.2],
  [-1.1, 0.6, -0.8],
  [0.3, 1.0, 0.6]
] as const

// Floating particles component
function FloatingParticles() {
  return (
    <>
      {particlePositions.map((position, i) => (
        <Float
          key={i}
          speed={1 + i * 0.5}
          rotationIntensity={0.5}
          floatIntensity={1}
          floatingRange={[-0.1, 0.1]}
        >
          <Sphere args={[0.05 + i * 0.02, 16, 16]} position={position}>
            <MeshDistortMaterial
              color="#f97316"
              attach="material"
              distort={0.3}
              speed={2}
              opacity={0.6}
              transparent
            />
          </Sphere>
        </Float>
      ))}
    </>
  )
}

// Animated background orb
function AnimatedOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 4
      meshRef.current.rotation.y = Math.PI / 4
    }
  }, [])

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#fbbf24"
          attach="material"
          distort={0.4}
          speed={1.5}
          opacity={0.15}
          transparent
        />
      </Sphere>
    </Float>
  )
}

export default function ThreeScene() {
  return (
    <Suspense fallback={null}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedOrb />
        <FloatingParticles />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </Suspense>
  )
}