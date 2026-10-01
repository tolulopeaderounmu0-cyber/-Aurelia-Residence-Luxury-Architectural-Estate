import { useRef } from 'react';
import * as THREE from 'three';

/**
 * Realistic Architectural Lighting System
 * Prioritizes realistic sun/sky illumination, soft shadows, and high performance.
 */
export function Lighting() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {/* Sky / Ground ambient hemisphere scatter for natural outdoor fill */}
      <hemisphereLight
        color="#eef2f7"
        groundColor="#1e1c1a"
        intensity={0.45}
      />

      {/* Balanced neutral ambient baseline */}
      <ambientLight intensity={0.4} color="#ece7e1" />

      {/* Primary Architectural Sun — low coastal golden hour angle */}
      <directionalLight
        ref={dirLightRef}
        position={[28, 24, 18]}
        intensity={1.65}
        color="#fff4e4"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={90}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
        shadow-bias={-0.0002}
        shadow-radius={2}
      />

      {/* Coastal horizon bounce light for softening harsh shadow contrasts */}
      <directionalLight
        position={[-20, 14, -18]}
        intensity={0.35}
        color="#7ca4cc"
      />

      {/* Living Room Hearth Warm Interior Glow */}
      <pointLight
        position={[3.5, 1.4, 0.5]}
        intensity={0.9}
        distance={12}
        decay={2}
        color="#ffaa55"
      />

      {/* Kitchen Island Task Warm Accent */}
      <pointLight
        position={[-1, 2.5, 0.5]}
        intensity={0.6}
        distance={9}
        decay={2}
        color="#ffe3ba"
      />

      {/* Infinity Seawater Basin Shimmer Fill */}
      <pointLight
        position={[5, 1.0, -7]}
        intensity={0.5}
        distance={10}
        decay={2}
        color="#5ec5db"
      />
    </>
  );
}
