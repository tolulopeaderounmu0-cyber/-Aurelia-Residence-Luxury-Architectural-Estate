import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import gsap from 'gsap';
import { CameraPosition, PROPERTY_INFO } from '../../lib/propertyData';

interface CameraControllerProps {
  mode: 'scroll' | 'orbit';
  scrollProgress: number; // 0 to 1 from ScrollTrigger
  activeViewpointId: string;
  autoRotate?: boolean;
  onCameraUpdate?: (coords: { x: number; y: number; z: number }) => void;
  onActiveSpaceChange?: (spaceId: string) => void;
}

// 5 Predefined Choreographed Waypoints in Chronological Sequence
const WAYPOINTS: CameraPosition[] = [
  PROPERTY_INFO.cameraPositions.find((c) => c.id === 'exterior')!,
  PROPERTY_INFO.cameraPositions.find((c) => c.id === 'living')!,
  PROPERTY_INFO.cameraPositions.find((c) => c.id === 'kitchen')!,
  PROPERTY_INFO.cameraPositions.find((c) => c.id === 'bedroom')!,
  PROPERTY_INFO.cameraPositions.find((c) => c.id === 'pool')!,
];

export function CameraController({
  mode,
  scrollProgress,
  activeViewpointId,
  autoRotate = false,
  onCameraUpdate,
  onActiveSpaceChange,
}: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const currentTweenRef = useRef<gsap.core.Tween | null>(null);

  // Dynamic targets for smooth frame-by-frame interpolation
  const targetCamPos = useRef(new THREE.Vector3(...WAYPOINTS[0].position));
  const targetLookAt = useRef(new THREE.Vector3(...WAYPOINTS[0].target));
  const currentLookAt = useRef(new THREE.Vector3(...WAYPOINTS[0].target));
  const lastActiveSpaceRef = useRef<string>('exterior');

  // Hermite smoothstep for organic easing between waypoints
  const smoothStep = (t: number) => t * t * (3 - 2 * t);

  // Update target coordinates whenever scrollProgress changes in 'scroll' mode
  useEffect(() => {
    if (mode !== 'scroll') return;

    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    const numSegments = WAYPOINTS.length - 1; // 4 segments for 5 waypoints
    const rawIndex = clampedProgress * numSegments;
    const segIndex = Math.min(Math.floor(rawIndex), numSegments - 1);
    const segT = rawIndex - segIndex;
    const easedT = smoothStep(segT);

    const fromWP = WAYPOINTS[segIndex];
    const toWP = WAYPOINTS[segIndex + 1];

    // Interpolate camera position
    targetCamPos.current.set(
      THREE.MathUtils.lerp(fromWP.position[0], toWP.position[0], easedT),
      THREE.MathUtils.lerp(fromWP.position[1], toWP.position[1], easedT),
      THREE.MathUtils.lerp(fromWP.position[2], toWP.position[2], easedT)
    );

    // Interpolate target lookAt
    targetLookAt.current.set(
      THREE.MathUtils.lerp(fromWP.target[0], toWP.target[0], easedT),
      THREE.MathUtils.lerp(fromWP.target[1], toWP.target[1], easedT),
      THREE.MathUtils.lerp(fromWP.target[2], toWP.target[2], easedT)
    );

    // Interpolate field of view
    if ('fov' in camera && typeof camera.fov === 'number') {
      const targetFov = THREE.MathUtils.lerp(fromWP.fov, toWP.fov, easedT);
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }

    // Determine current active space for editorial UI updates
    const currentActiveIndex = Math.min(
      Math.round(clampedProgress * numSegments),
      WAYPOINTS.length - 1
    );
    const activeId = WAYPOINTS[currentActiveIndex].id;

    if (activeId !== lastActiveSpaceRef.current) {
      lastActiveSpaceRef.current = activeId;
      if (onActiveSpaceChange) {
        onActiveSpaceChange(activeId);
      }
    }
  }, [mode, scrollProgress, camera, onActiveSpaceChange]);

  // Handle manual viewpoint click when in 'orbit' mode
  useEffect(() => {
    if (mode !== 'orbit') return;

    const targetConfig = PROPERTY_INFO.cameraPositions.find((cp) => cp.id === activeViewpointId);
    if (!targetConfig || !controlsRef.current) return;

    if (currentTweenRef.current) {
      currentTweenRef.current.kill();
    }

    const controls = controlsRef.current;
    const targetPos = {
      x: targetConfig.position[0],
      y: targetConfig.position[1],
      z: targetConfig.position[2],
    };
    const targetLook = {
      x: targetConfig.target[0],
      y: targetConfig.target[1],
      z: targetConfig.target[2],
    };

    currentTweenRef.current = gsap.to(
      {
        cx: camera.position.x,
        cy: camera.position.y,
        cz: camera.position.z,
        tx: controls.target.x,
        ty: controls.target.y,
        tz: controls.target.z,
      },
      {
        cx: targetPos.x,
        cy: targetPos.y,
        cz: targetPos.z,
        tx: targetLook.x,
        ty: targetLook.y,
        tz: targetLook.z,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: function () {
          const vals = this.targets()[0];
          camera.position.set(vals.cx, vals.cy, vals.cz);
          controls.target.set(vals.tx, vals.ty, vals.tz);
          controls.update();

          if (onCameraUpdate) {
            onCameraUpdate({
              x: Math.round(vals.cx * 10) / 10,
              y: Math.round(vals.cy * 10) / 10,
              z: Math.round(vals.cz * 10) / 10,
            });
          }
        },
      }
    );

    return () => {
      if (currentTweenRef.current) {
        currentTweenRef.current.kill();
      }
    };
  }, [mode, activeViewpointId, camera, onCameraUpdate]);

  // Three.js animation frame loop
  useFrame((_, delta) => {
    if (mode === 'scroll') {
      // High-performance smooth damping (lambda = 5.5) avoids scroll micro-jitter
      const dampFactor = Math.min(delta * 5.5, 1);

      camera.position.lerp(targetCamPos.current, dampFactor);
      currentLookAt.current.lerp(targetLookAt.current, dampFactor);
      camera.lookAt(currentLookAt.current);

      if (controlsRef.current) {
        controlsRef.current.target.copy(currentLookAt.current);
      }

      if (onCameraUpdate) {
        onCameraUpdate({
          x: Math.round(camera.position.x * 10) / 10,
          y: Math.round(camera.position.y * 10) / 10,
          z: Math.round(camera.position.z * 10) / 10,
        });
      }
    } else if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={mode === 'orbit'}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.04}
      minDistance={4}
      maxDistance={45}
      autoRotate={autoRotate && mode === 'orbit'}
      autoRotateSpeed={0.6}
      makeDefault
    />
  );
}
