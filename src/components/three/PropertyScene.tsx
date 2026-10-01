import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { PropertyModel } from './PropertyModel';
import { CameraController } from './CameraController';

interface PropertySceneProps {
  mode?: 'scroll' | 'orbit';
  scrollProgress?: number;
  activeViewpointId: string;
  autoRotate?: boolean;
  onCameraUpdate?: (coords: { x: number; y: number; z: number }) => void;
  onActiveSpaceChange?: (spaceId: string) => void;
  modelUrl?: string;
}

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0c0d0e]/85 backdrop-blur-xs z-10">
      <div className="flex flex-col items-center gap-3 text-stone-300">
        <div className="w-8 h-8 border border-white/20 border-t-[#c5a880] rounded-full animate-spin" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#c5a880]">
          Initializing Architectural Volumes
        </span>
      </div>
    </div>
  );
}

export function PropertyScene({
  mode = 'scroll',
  scrollProgress = 0,
  activeViewpointId,
  autoRotate = false,
  onCameraUpdate,
  onActiveSpaceChange,
  modelUrl,
}: PropertySceneProps) {
  return (
    <div className="relative w-full h-full select-none bg-[#0c0d0e]">
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          shadows={{ type: THREE.PCFSoftShadowMap }}
          camera={{
            position: [14, 8, 16],
            fov: 42,
            near: 0.1,
            far: 220,
          }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false,
          }}
          className={`w-full h-full ${mode === 'orbit' ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
        >
          <Environment />
          <Lighting />
          <PropertyModel modelUrl={modelUrl} activeZone={activeViewpointId} />
          <CameraController
            mode={mode}
            scrollProgress={scrollProgress}
            activeViewpointId={activeViewpointId}
            autoRotate={autoRotate}
            onCameraUpdate={onCameraUpdate}
            onActiveSpaceChange={onActiveSpaceChange}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
