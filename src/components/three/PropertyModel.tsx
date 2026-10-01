import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface PropertyModelProps {
  modelUrl?: string;
  activeZone?: string;
}

export function PropertyModel({ activeZone }: PropertyModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // High-performance calibrated PBR materials
  const materials = useMemo(() => {
    return {
      // Warm Travertine Stone
      travertine: new THREE.MeshStandardMaterial({
        color: '#d6cfc5',
        roughness: 0.88,
        metalness: 0.04,
      }),
      // Light Travertine for Ceilings / Soffits
      travertineLight: new THREE.MeshStandardMaterial({
        color: '#dfd9cf',
        roughness: 0.85,
        metalness: 0.02,
      }),
      // Basalt / Blackened Architectural Steel Exoskeleton
      basalt: new THREE.MeshStandardMaterial({
        color: '#202124',
        roughness: 0.65,
        metalness: 0.25,
      }),
      // Floor-to-Ceiling Structural Glass
      glass: new THREE.MeshPhysicalMaterial({
        color: '#a3c8d8',
        transparent: true,
        opacity: 0.32,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.65,
        ior: 1.5,
      }),
      // Teak Wood Terrace & Louvers
      teak: new THREE.MeshStandardMaterial({
        color: '#846244',
        roughness: 0.6,
        metalness: 0.05,
      }),
      // Smoked European White Oak (Interiors)
      oak: new THREE.MeshStandardMaterial({
        color: '#a8947f',
        roughness: 0.75,
        metalness: 0.02,
      }),
      // Calacatta Marble (Island & Hearth)
      marble: new THREE.MeshStandardMaterial({
        color: '#f4f2ee',
        roughness: 0.28,
        metalness: 0.08,
      }),
      // Linen Upholstery (Sofa & Bedding)
      linen: new THREE.MeshStandardMaterial({
        color: '#cfcac2',
        roughness: 0.95,
        metalness: 0.0,
      }),
      // Heated Seawater Surface
      water: new THREE.MeshStandardMaterial({
        color: '#1b7a9e',
        roughness: 0.12,
        metalness: 0.8,
      }),
      // Linear Fire Hearth Glow
      fire: new THREE.MeshBasicMaterial({
        color: '#ff8a3d',
      }),
    };
  }, []);

  return (
    <group ref={groupRef} name="Aurelia-Estate-Architecture">
      {/* ============================================================ */}
      {/* 1. FOUNDATION, PODIUM & MAIN TERRACE                         */}
      {/* ============================================================ */}
      {/* Main Travertine Podium Platform */}
      <mesh position={[0, 0.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[28, 0.4, 24]} />
        <primitive object={materials.travertine} attach="material" />
      </mesh>

      {/* Sunken Teak Outdoor Terrace Deck */}
      <mesh position={[4, 0.42, 4]} receiveShadow>
        <boxGeometry args={[14, 0.05, 11]} />
        <primitive object={materials.teak} attach="material" />
      </mesh>

      {/* Sunken Lounge Steps */}
      <mesh position={[4, 0.3, 9.6]} receiveShadow>
        <boxGeometry args={[10, 0.2, 1.2]} />
        <primitive object={materials.travertine} attach="material" />
      </mesh>

      {/* ============================================================ */}
      {/* 2. STRUCTURAL EXOSKELETON & MONOLITHIC SPINE                 */}
      {/* ============================================================ */}
      {/* Monolithic Basalt Stone Fireplace Spine & Utility Core */}
      <mesh position={[-3.2, 3.2, -1]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 6.4, 13]} />
        <primitive object={materials.basalt} attach="material" />
      </mesh>

      {/* Ground Floor Travertine Roof Slab & Deep Cantilever Overhang */}
      <mesh position={[2, 3.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[19, 0.32, 15]} />
        <primitive object={materials.travertineLight} attach="material" />
      </mesh>

      {/* Architectural Louvers on South Facade */}
      <group position={[8, 3.8, 5.5]}>
        {[-3, -2, -1, 0, 1, 2, 3].map((z, idx) => (
          <mesh key={`trellis-${idx}`} position={[0, 0, z * 0.6]} castShadow>
            <boxGeometry args={[5, 0.08, 0.18]} />
            <primitive object={materials.teak} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Slender Structural Steel Columns */}
      {[-1, 4, 8.5].map((x, i) => (
        <mesh key={`col-${i}`} position={[x, 2, 4.8]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 3.4, 16]} />
          <primitive object={materials.basalt} attach="material" />
        </mesh>
      ))}

      {/* Floor-to-Ceiling Structural Glass Walls (Great Room) */}
      <mesh position={[3, 2, 4.7]}>
        <boxGeometry args={[12.5, 3.3, 0.06]} />
        <primitive object={materials.glass} attach="material" />
      </mesh>

      <mesh position={[9.2, 2, 0]}>
        <boxGeometry args={[0.06, 3.3, 9.4]} />
        <primitive object={materials.glass} attach="material" />
      </mesh>

      {/* ============================================================ */}
      {/* 3. LIVING ROOM INTERIOR ARCHITECTURE                         */}
      {/* ============================================================ */}
      {/* Floating French Limestone Hearth */}
      <mesh position={[3.6, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.28, 1.4]} />
        <primitive object={materials.marble} attach="material" />
      </mesh>
      {/* Linear Fire Ribbon */}
      <mesh position={[3.6, 0.82, 0]}>
        <boxGeometry args={[2.4, 0.05, 0.25]} />
        <primitive object={materials.fire} attach="material" />
      </mesh>

      {/* Low-profile Minimalist Modular Sofa */}
      <mesh position={[3.6, 0.55, 2.2]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.35, 1.6]} />
        <primitive object={materials.linen} attach="material" />
      </mesh>
      {/* Sofa Backrest */}
      <mesh position={[3.6, 0.85, 2.9]} castShadow>
        <boxGeometry args={[4.2, 0.35, 0.4]} />
        <primitive object={materials.linen} attach="material" />
      </mesh>

      {/* Low Marble Coffee Table */}
      <mesh position={[3.6, 0.48, 1.0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.16, 0.8]} />
        <primitive object={materials.marble} attach="material" />
      </mesh>

      {/* Smoked Oak Floor Planks inside Living Room */}
      <mesh position={[3.5, 0.41, 0.8]} receiveShadow>
        <boxGeometry args={[10, 0.02, 6.5]} />
        <primitive object={materials.oak} attach="material" />
      </mesh>

      {/* ============================================================ */}
      {/* 4. CULINARY PAVILION (KITCHEN)                               */}
      {/* ============================================================ */}
      {/* 16ft Monolithic Calacatta Marble Island */}
      <mesh position={[-0.8, 0.9, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.92, 5.2]} />
        <primitive object={materials.marble} attach="material" />
      </mesh>

      {/* Walnut Preparation Back Wall Cabinetry */}
      <mesh position={[-2.3, 1.85, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 2.7, 5.2]} />
        <primitive object={materials.teak} attach="material" />
      </mesh>

      {/* Suspended Minimalist Linear Architectural Light above Island */}
      <mesh position={[-0.8, 2.6, 0.6]}>
        <boxGeometry args={[0.08, 0.08, 4.4]} />
        <primitive object={materials.basalt} attach="material" />
      </mesh>

      {/* Counter Stools */}
      {[-1.2, 0, 1.2].map((z, idx) => (
        <group key={`stool-${idx}`} position={[0.4, 0.6, 0.6 + z]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
            <primitive object={materials.linen} attach="material" />
          </mesh>
          <mesh position={[0, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.6, 12]} />
            <primitive object={materials.basalt} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ============================================================ */}
      {/* 5. UPPER LEVEL: MASTER SUITE SANTUARY CANTILEVER             */}
      {/* ============================================================ */}
      {/* Cantilevered Master Suite Wing */}
      <mesh position={[1, 5.4, -2]} castShadow receiveShadow>
        <boxGeometry args={[16.5, 2.8, 9.5]} />
        <primitive object={materials.travertine} attach="material" />
      </mesh>

      {/* Master Bedroom Floor-to-Ceiling Ocean Glazing */}
      <mesh position={[5.2, 5.3, 2.8]}>
        <boxGeometry args={[8.0, 2.4, 0.06]} />
        <primitive object={materials.glass} attach="material" />
      </mesh>

      {/* Master Suite Cantilevered Roof Slab */}
      <mesh position={[1, 6.9, -1.6]} castShadow receiveShadow>
        <boxGeometry args={[18.5, 0.32, 11.5]} />
        <primitive object={materials.travertineLight} attach="material" />
      </mesh>

      {/* Master Suite Private Terrace Deck */}
      <mesh position={[7.8, 4.05, -2]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.18, 7.5]} />
        <primitive object={materials.teak} attach="material" />
      </mesh>

      {/* Minimalist Glass Balustrade on Master Deck */}
      <mesh position={[9.3, 4.6, -2]}>
        <boxGeometry args={[0.04, 0.95, 7.5]} />
        <primitive object={materials.glass} attach="material" />
      </mesh>

      {/* Master Platform Bed Interior Cue */}
      <mesh position={[4.5, 4.5, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.35, 2.6]} />
        <primitive object={materials.linen} attach="material" />
      </mesh>
      {/* Headboard */}
      <mesh position={[4.5, 5.0, -2.85]} castShadow>
        <boxGeometry args={[3.2, 0.7, 0.2]} />
        <primitive object={materials.oak} attach="material" />
      </mesh>

      {/* ============================================================ */}
      {/* 6. INFINITY SEAWATER POOL & CLIFFSIDE BASIN                  */}
      {/* ============================================================ */}
      {/* Travertine Pool Basin Rim & Cantilever */}
      <mesh position={[5, 0.3, -7.5]} castShadow receiveShadow>
        <boxGeometry args={[15, 0.6, 5.5]} />
        <primitive object={materials.travertine} attach="material" />
      </mesh>

      {/* Heated Seawater Water Plane */}
      <mesh position={[5, 0.56, -7.5]}>
        <boxGeometry args={[14.2, 0.08, 4.7]} />
        <primitive object={materials.water} attach="material" />
      </mesh>

      {/* Acrylic Glass Vanishing Edge */}
      <mesh position={[5, 0.58, -10.26]}>
        <boxGeometry args={[14.2, 0.52, 0.06]} />
        <primitive object={materials.glass} attach="material" />
      </mesh>

      {/* Luxury Sun Loungers by the Pool */}
      {[-3, 0, 3].map((x, i) => (
        <group key={`lounger-${i}`} position={[5 + x, 0.65, -4.5]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.12, 0.7]} />
            <primitive object={materials.linen} attach="material" />
          </mesh>
          <mesh position={[-0.7, 0.18, 0]} rotation={[0, 0, 0.25]} castShadow>
            <boxGeometry args={[0.6, 0.12, 0.7]} />
            <primitive object={materials.linen} attach="material" />
          </mesh>
        </group>
      ))}

      {/* Active Zone Spatial Marker Accent */}
      {activeZone && (
        <group name="active-zone-marker">
          {activeZone === 'pool' && (
            <mesh position={[5, 0.8, -7.5]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.8, 1.9, 32]} />
              <meshBasicMaterial color="#c5a880" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
          )}
          {activeZone === 'living' && (
            <mesh position={[3.6, 0.6, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[2.0, 2.1, 32]} />
              <meshBasicMaterial color="#c5a880" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
          )}
          {activeZone === 'kitchen' && (
            <mesh position={[-0.8, 1.2, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.6, 1.7, 32]} />
              <meshBasicMaterial color="#c5a880" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
          )}
          {activeZone === 'bedroom' && (
            <mesh position={[5.2, 4.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[2.0, 2.1, 32]} />
              <meshBasicMaterial color="#c5a880" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
          )}
        </group>
      )}
    </group>
  );
}
