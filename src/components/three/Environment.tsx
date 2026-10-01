import { useMemo } from 'react';
import * as THREE from 'three';

export function Environment() {
  // Cliffside podium stone texture parameters
  const groundGeometry = useMemo(() => new THREE.PlaneGeometry(160, 160), []);
  const oceanGeometry = useMemo(() => new THREE.PlaneGeometry(300, 300), []);

  return (
    <>
      {/* Deep atmosphere fog to blend horizons seamlessly */}
      <color attach="background" args={['#0e1013']} />
      <fog attach="fog" args={['#0e1013', 25, 110]} />

      {/* Promontory Cliff Foundation Platform */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        receiveShadow
      >
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial
          color="#1e1e20"
          roughness={0.92}
          metalness={0.08}
        />
      </mesh>

      {/* Terrains and surrounding rocky promontory steps */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <boxGeometry args={[42, 1, 38]} />
        <meshStandardMaterial
          color="#17181a"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Horizon Ocean Surface below cliff */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -4.5, -40]}
        receiveShadow
      >
        <primitive object={oceanGeometry} attach="geometry" />
        <meshStandardMaterial
          color="#0a1219"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Subtle architectural grid ground guide for spatial depth */}
      <gridHelper
        args={[80, 40, '#2f3238', '#1a1b1f']}
        position={[0, -0.03, 0]}
      />
    </>
  );
}
