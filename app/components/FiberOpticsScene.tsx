'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  CatmullRomCurve3,
  TubeGeometry,
  Vector3,
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  Color,
  Group,
  PointLight,
  Mesh,
  DoubleSide,
  MeshStandardMaterial
} from 'three';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { Environment, PerspectiveCamera, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { BlendFunction } from 'postprocessing';

// Smooth easing function
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Ultra-minimal data packet
function DataPacket({
  curve,
  speed = 0.08,
  color = '#00c0ff',
  delay = 0,
  size = 0.015
}: {
  curve: CatmullRomCurve3;
  speed?: number;
  color?: string;
  delay?: number;
  size?: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const progressRef = useRef(-delay);

  useFrame((_, delta) => {
    progressRef.current += delta * speed;

    if (progressRef.current > 1.15) {
      progressRef.current = -0.15;
    }

    const t = Math.max(0, Math.min(1, progressRef.current));

    if (progressRef.current >= 0 && progressRef.current <= 1) {
      const point = curve.getPointAt(easeInOutCubic(t));

      if (meshRef.current) {
        meshRef.current.position.copy(point);
      }
    } else if (meshRef.current) {
      meshRef.current.position.set(0, -100, 0);
    }
  });

  return (
    <group>
      {/* Main packet - ultra-small and bright */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size * 0.8, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={4}
          transparent
          opacity={0.98}
          toneMapped={false}
        />
      </mesh>

      {/* Minimal glow */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size * 1.5, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.25}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Ultra-realistic modern fiber optic cable
function FiberOpticCable({
  startPoint,
  endPoint,
  controlPoints,
  coreColor = '#00c0ff',
  index = 0
}: {
  startPoint: Vector3;
  endPoint: Vector3;
  controlPoints: Vector3[];
  coreColor?: string;
  index?: number;
}) {
  const cableRef = useRef<Group>(null);
  const innerCoreRef = useRef<Mesh>(null);

  const curve = useMemo(() => {
    const allPoints = [startPoint, ...controlPoints, endPoint];
    return new CatmullRomCurve3(allPoints, false, 'catmullrom', 0.6);
  }, [startPoint, endPoint, controlPoints]);

  const { glassGeometry, lightCoreGeometry, innerLightGeometry, glowGeometry } = useMemo(() => {
    const segments = 200; // Ultra-high segments for ultra-smooth curves
    const radialSegments = 16;
    const glass = new TubeGeometry(curve, segments, 0.018, radialSegments, false); // Slightly thicker for visibility
    const lightCore = new TubeGeometry(curve, segments, 0.008, 8, false); // More visible light core
    const innerLight = new TubeGeometry(curve, segments, 0.003, 6, false); // Brighter center
    const glow = new TubeGeometry(curve, segments, 0.022, 8, false); // Subtle outer glow
    return {
      glassGeometry: glass,
      lightCoreGeometry: lightCore,
      innerLightGeometry: innerLight,
      glowGeometry: glow
    };
  }, [curve]);

  // Ultra-subtle pulse
  useFrame((state) => {
    if (innerCoreRef.current) {
      const material = innerCoreRef.current.material as MeshStandardMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 3.5 + Math.sin(state.clock.elapsedTime * 0.8 + index * 0.3) * 0.4;
      }
    }
  });

  const packetCount = 1; // Minimal packets

  return (
    <group ref={cableRef}>
      {/* Subtle outer glow for visibility */}
      <mesh geometry={glowGeometry}>
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={0.06}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* Ultra-thin glass fiber - realistic glass */}
      <mesh geometry={glassGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#0a1520"
          transparent
          opacity={0.35}
          roughness={0.02}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.02}
          transmission={0.8}
          thickness={0.8}
          ior={1.46}
          envMapIntensity={0.5}
          reflectivity={0.9}
        />
      </mesh>

      {/* Light-conducting core - visible */}
      <mesh geometry={lightCoreGeometry}>
        <meshPhysicalMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={2.5}
          transparent
          opacity={0.85}
          roughness={0}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Ultra-bright center line */}
      <mesh ref={innerCoreRef} geometry={innerLightGeometry}>
        <meshStandardMaterial
          color="#ffffff"
          emissive={coreColor}
          emissiveIntensity={3.5}
          transparent
          opacity={0.98}
          toneMapped={false}
        />
      </mesh>

      {/* Single data packet */}
      {Array.from({ length: packetCount }).map((_, i) => (
        <DataPacket
          key={i}
          curve={curve}
          speed={0.08 + Math.random() * 0.03}
          color={coreColor}
          delay={index * 0.4}
          size={0.015}
        />
      ))}
    </group>
  );
}

// Modern, clean fiber bundle with elegant paths
function FiberNetwork() {
  const groupRef = useRef<Group>(null);

  const cables = useMemo(() => {
    const cableConfigs = [];
    const cableCount = 12; // More cables but thinner for modern look

    for (let i = 0; i < cableCount; i++) {
      const angle = (i / cableCount) * Math.PI * 2;
      const layer = Math.floor(i / 4); // 3 layers
      const radiusOffset = 0.08 + layer * 0.06;

      // Modern, flowing horizontal paths
      const start = new Vector3(
        -5,
        Math.sin(angle) * radiusOffset,
        Math.cos(angle) * radiusOffset
      );

      const end = new Vector3(
        5,
        Math.sin(angle + Math.PI * 0.15) * radiusOffset * 1.1,
        Math.cos(angle + Math.PI * 0.15) * radiusOffset * 1.1
      );

      // Elegant bezier-like control points for smooth, modern curves
      const controls = [
        new Vector3(
          -3,
          Math.sin(angle * 1.2) * radiusOffset * 0.9,
          Math.cos(angle * 1.2) * radiusOffset * 0.9
        ),
        new Vector3(
          -1.5,
          Math.sin(angle * 0.8) * radiusOffset * 1.05,
          Math.cos(angle * 0.8) * radiusOffset * 1.05 + 0.1
        ),
        new Vector3(
          0,
          Math.sin(angle * 1.1) * radiusOffset * 1.1,
          Math.cos(angle * 1.1) * radiusOffset * 1.1 + 0.15
        ),
        new Vector3(
          1.5,
          Math.sin(angle * 0.9) * radiusOffset * 1.05,
          Math.cos(angle * 0.9) * radiusOffset * 1.05 + 0.1
        ),
        new Vector3(
          3,
          Math.sin(angle * 1.15) * radiusOffset * 0.95,
          Math.cos(angle * 1.15) * radiusOffset * 0.95
        ),
      ];

      // Modern, vibrant blue palette for visibility
      const colors = [
        '#00d0ff', '#00c8ff', '#00e0ff', '#00b8ff',
        '#00d8ff', '#00c0ff', '#00e8ff', '#00b0ff',
        '#00dcff', '#00c4ff', '#00ecff', '#00bcff'
      ];

      cableConfigs.push({
        start,
        end,
        controls,
        coreColor: colors[i % colors.length],
      });
    }

    return cableConfigs;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Extremely subtle movement
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.02;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.06) * 0.01;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {cables.map((cable, i) => (
        <FiberOpticCable
          key={i}
          startPoint={cable.start}
          endPoint={cable.end}
          controlPoints={cable.controls}
          coreColor={cable.coreColor}
          index={i}
        />
      ))}
    </group>
  );
}

// Minimal floating particles
function AmbientParticles({ count = 25 }: { count?: number }) {
  const pointsRef = useRef<Points>(null);

  const { geometry, velocities } = useMemo(() => {
    const geo = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const vels: Vector3[] = [];

    const baseColor = new Color('#00b0ff');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      colors[i * 3] = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;

      sizes[i] = Math.random() * 0.008 + 0.003;

      vels.push(new Vector3(
        (Math.random() - 0.5) * 0.0005,
        (Math.random() - 0.5) * 0.0005,
        Math.random() * 0.005 + 0.002
      ));
    }

    geo.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new Float32BufferAttribute(colors, 3));
    geo.setAttribute('size', new Float32BufferAttribute(sizes, 1));

    return { geometry: geo, velocities: vels };
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      positions.array[i * 3] += velocities[i].x;
      positions.array[i * 3 + 1] += velocities[i].y;
      positions.array[i * 3 + 2] += velocities[i].z;

      if (positions.array[i * 3 + 2] > 2) {
        positions.array[i * 3 + 2] = -3;
        positions.array[i * 3] = (Math.random() - 0.5) * 8;
        positions.array[i * 3 + 1] = (Math.random() - 0.5) * 5;
      }
    }

    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.4}
        blending={AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Ultra-subtle mouse-reactive light
function ReactiveLight() {
  const lightRef = useRef<PointLight>(null);
  const { viewport } = useThree();
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = (e.clientX / window.innerWidth - 0.5) * viewport.width * 0.8;
      targetPos.current.y = -(e.clientY / window.innerHeight - 0.5) * viewport.height * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);

  useFrame(() => {
    if (lightRef.current) {
      // Very smooth, subtle follow
      lightRef.current.position.x += (targetPos.current.x - lightRef.current.position.x) * 0.02;
      lightRef.current.position.y += (targetPos.current.y - lightRef.current.position.y) * 0.02;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 2]}
      intensity={1.2}
      color="#00b8ff"
      distance={7}
      decay={2}
    />
  );
}

// Clean, modern scene with minimal lighting
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={55} />
      <color attach="background" args={['#000408']} />
      <fog attach="fog" args={['#000408', 5, 16]} />

      {/* Minimal ambient lighting */}
      <ambientLight intensity={0.12} />

      {/* Clean key lights */}
      <directionalLight position={[8, 5, 5]} intensity={0.35} color="#d0e8ff" />
      <pointLight position={[-6, 4, 3]} intensity={0.5} color="#0088ff" distance={14} decay={2} />
      <pointLight position={[6, -3, 2]} intensity={0.35} color="#00a0ff" distance={12} decay={2} />

      {/* Subtle fill light */}
      <pointLight position={[0, 5, -3]} intensity={0.25} color="#0098ff" distance={10} decay={2} />

      {/* Mouse reactive light */}
      <ReactiveLight />

      {/* Main fiber network */}
      <FiberNetwork />

      {/* Minimal ambient particles */}
      <AmbientParticles count={20} />

      {/* Environment for glass reflections */}
      <Environment preset="night" />

      {/* Clean post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector3(0.0003, 0.0003, 0) as any}
        />
        <Vignette darkness={0.55} offset={0.35} />
      </EffectComposer>
    </>
  );
}

export default function FiberOpticsScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
