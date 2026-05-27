"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ───── Realistic Moon ───── */
function RealisticMoon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Procedural moon texture
  const moonTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Base lunar surface color
    const baseGrad = ctx.createRadialGradient(
      size * 0.45, size * 0.42, 0,
      size * 0.5, size * 0.5, size * 0.5
    );
    baseGrad.addColorStop(0, "#e8e4dc");
    baseGrad.addColorStop(0.3, "#d6d0c4");
    baseGrad.addColorStop(0.6, "#c4bdb0");
    baseGrad.addColorStop(0.85, "#a89f90");
    baseGrad.addColorStop(1, "#706860");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Add craters (dark maria)
    const craters = [
      { x: 0.35, y: 0.3, r: 0.12, opacity: 0.15 },
      { x: 0.55, y: 0.45, r: 0.08, opacity: 0.12 },
      { x: 0.4, y: 0.55, r: 0.1, opacity: 0.1 },
      { x: 0.6, y: 0.3, r: 0.06, opacity: 0.13 },
      { x: 0.3, y: 0.65, r: 0.07, opacity: 0.11 },
      { x: 0.5, y: 0.2, r: 0.05, opacity: 0.09 },
      { x: 0.65, y: 0.6, r: 0.09, opacity: 0.14 },
      { x: 0.25, y: 0.45, r: 0.06, opacity: 0.1 },
      { x: 0.7, y: 0.45, r: 0.04, opacity: 0.08 },
      { x: 0.45, y: 0.7, r: 0.05, opacity: 0.1 },
    ];

    for (const c of craters) {
      const grad = ctx.createRadialGradient(
        c.x * size, c.y * size, 0,
        c.x * size, c.y * size, c.r * size
      );
      grad.addColorStop(0, `rgba(80, 70, 60, ${c.opacity})`);
      grad.addColorStop(0.6, `rgba(90, 80, 70, ${c.opacity * 0.6})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }

    // Small craters for texture
    for (let i = 0; i < 60; i++) {
      const cx = Math.random() * size;
      const cy = Math.random() * size;
      const cr = Math.random() * 8 + 2;
      const dist = Math.sqrt((cx - size / 2) ** 2 + (cy - size / 2) ** 2);
      if (dist > size * 0.48) continue;

      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${70 + Math.random() * 40}, ${65 + Math.random() * 35}, ${55 + Math.random() * 30}, ${0.08 + Math.random() * 0.1})`;
      ctx.fill();
    }

    // Subtle terminator shadow (makes it look like a slightly gibbous moon)
    const termGrad = ctx.createLinearGradient(size * 0.7, 0, size, 0);
    termGrad.addColorStop(0, "transparent");
    termGrad.addColorStop(0.5, "rgba(20, 18, 15, 0.15)");
    termGrad.addColorStop(1, "rgba(10, 8, 5, 0.4)");
    ctx.fillStyle = termGrad;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        state.clock.elapsedTime * 0.02 + 0.5;
      meshRef.current.position.y =
        3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.position.y =
        3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
      <group position={[2, 3, -5]}>
        {/* Moon sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.6, 64, 64]} />
          <meshStandardMaterial
            map={moonTexture}
            emissive="#c8bfa8"
            emissiveIntensity={0.08}
            roughness={0.9}
            metalness={0}
          />
        </mesh>

        {/* Soft lunar glow ring */}
        <mesh ref={glowRef} scale={[2.2, 2.2, 1]}>
          <circleGeometry args={[1.6, 64]} />
          <meshBasicMaterial
            color="#d4cfc0"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Moonlight */}
        <pointLight
          position={[0, 0, 2]}
          color="#e0d8c8"
          intensity={1.5}
          distance={12}
        />
      </group>
    </Float>
  );
}

/* ───── Star / small accent ───── */
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
function Lantern({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
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
        <meshStandardMaterial
          color="#8b6914"
          metalness={0.8}
          roughness={0.2}
        />
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
        posArr[i * 3 + 1] +=
          Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
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

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y +=
      (-mouse.current.y * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

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
        <ambientLight intensity={0.2} color="#e8e0d0" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.4}
          color="#f0e8d8"
        />

        {/* Fog for depth */}
        <fog attach="fog" args={["#050505", 6, 20]} />

        {/* Camera rig */}
        <CameraRig />

        {/* Realistic Moon */}
        <RealisticMoon />

        {/* Star accents near moon */}
        <StarAccent position={[4.2, 4, -4]} />
        <StarAccent position={[0.5, 3.8, -5]} />
        <StarAccent position={[-1.5, 3.5, -6]} />

        {/* Background stars */}
        <Stars
          radius={50}
          depth={50}
          count={2000}
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
        <Lantern position={[2.5, -0.5, -3.5]} delay={2} />
      </Canvas>
    </div>
  );
}
