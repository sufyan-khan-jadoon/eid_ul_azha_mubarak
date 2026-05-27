"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ───── Crescent Moon ───── */
function CrescentMoon() {
  const meshRef = useRef<THREE.Mesh>(null);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    // Outer circle
    s.absarc(0, 0, 1.8, 0, Math.PI * 2, false);
    // Inner circle (cut-out) offset to the right
    const hole = new THREE.Path();
    hole.absarc(0.7, 0.3, 1.5, 0, Math.PI * 2, true);
    s.holes.push(hole);
    return s;
  }, []);

  const geometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 8,
      }),
    [shape]
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05 - 0.2;
      meshRef.current.position.y =
        2.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} geometry={geometry} position={[0, 2.5, -2]} rotation={[0, 0, -0.2]}>
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Moon glow */}
      <pointLight position={[0, 2.8, -1]} color="#d4af37" intensity={2} distance={8} />
    </Float>
  );
}

/* ───── Star / small crescent accent ───── */
function StarAccent({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.06, 0]} />
      <meshStandardMaterial
        color="#f0d478"
        emissive="#f0d478"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

/* ───── Floating Lantern ───── */
function Lantern({ position, delay }: { position: [number, number, number]; delay: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime + delay;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.2;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Lantern body */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.2, 0.5, 8]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.12, 0.15, 8]} />
        <meshStandardMaterial color="#8b6914" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Inner glow */}
      <pointLight color="#f0d478" intensity={1.5} distance={3} />
    </group>
  );
}

/* ───── Golden Particles ───── */
function GoldenParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      sz[i] = Math.random() * 0.03 + 0.01;
    }
    return { positions: pos, sizes: sz };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const posArr = pointsRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d4af37"
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ───── Mouse-Reactive Camera ───── */
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y +=
      (-mouse.current.y * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  // Attach mouse listener
  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  return null;
}

/* ───── Main Scene ───── */
export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.15} color="#e8e0d0" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.3}
          color="#f0d478"
        />

        {/* Fog for depth */}
        <fog attach="fog" args={["#050505", 5, 18]} />

        {/* Camera rig */}
        <CameraRig />

        {/* Crescent Moon */}
        <CrescentMoon />

        {/* Star accents near moon */}
        <StarAccent position={[1.8, 3.2, -2]} />
        <StarAccent position={[2.2, 2.5, -2.5]} />
        <StarAccent position={[-1.5, 3.5, -3]} />

        {/* Background stars */}
        <Stars
          radius={50}
          depth={50}
          count={1500}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Golden particles */}
        <GoldenParticles count={150} />

        {/* Lanterns */}
        <Lantern position={[-3.5, 1, -3]} delay={0} />
        <Lantern position={[3.8, 0.5, -4]} delay={1.5} />
        <Lantern position={[-2, -1, -5]} delay={3} />
        <Lantern position={[2.5, 2, -3.5]} delay={2} />
      </Canvas>
    </div>
  );
}
