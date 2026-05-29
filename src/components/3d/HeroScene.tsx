"use client";

import {
  useMemo,
  useRef,
  useEffect,
  useState,
  Suspense,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "framer-motion";

// ─── Shard data ───────────────────────────────────────────────────────────────
interface ShardData {
  basePos: THREE.Vector3;
  breathDir: THREE.Vector3;
  breathSpeed: number;
  breathPhase: number;
  breathAmp: number;
  scale: THREE.Vector3;
  rotAxis: THREE.Vector3;
  baseRotAngle: number;
  microRotSpeed: number;
}

// ─── Build fibonacci-lattice shard positions ──────────────────────────────────
// Creates an elongated egg/flame-shaped distribution of crystal fragments
function buildShards(
  count: number,
  rMin: number,
  rMax: number,
  yStretch: number,
  zFlatten: number
): ShardData[] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const result: ShardData[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / Math.max(count - 1, 1);
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = goldenAngle * i;

    // Organic radius variation — prevents perfect-sphere look
    const r =
      rMin +
      (rMax - rMin) *
        (0.65 + Math.sin(azimuth * 2.3 + inclination * 3.7) * 0.18 + Math.random() * 0.17);

    const x = r * Math.sin(inclination) * Math.cos(azimuth);
    const y = r * Math.cos(inclination) * yStretch;
    const z = r * Math.sin(inclination) * Math.sin(azimuth) * zFlatten;

    const basePos = new THREE.Vector3(x, y, z);
    const breathDir = basePos.clone().normalize();

    // Each fragment is a thin elongated crystal
    const thickness = (0.028 + Math.random() * 0.046) * 1.25;
    const length = (0.09 + Math.random() * 0.26) * 1.25;

    result.push({
      basePos,
      breathDir,
      breathSpeed: 0.18 + Math.random() * 0.6,
      breathPhase: Math.random() * Math.PI * 2,
      breathAmp: 0.035 + Math.random() * 0.085,
      scale: new THREE.Vector3(thickness, length, thickness),
      rotAxis: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize(),
      baseRotAngle: Math.random() * Math.PI * 2,
      microRotSpeed: (Math.random() - 0.5) * 0.22,
    });
  }
  return result;
}

// ─── The Digital Cortex sculpture ────────────────────────────────────────────
// ~220 instanced mesh fragments across three material layers:
// - Glass outer shell  (translucent, iridescent)
// - Chrome inner core  (mirror-metallic)
// - Dark accent shards (near-black, iridescent)
function DigitalCortex({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);

  const groupRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.InstancedMesh>(null);
  const chromeRef = useRef<THREE.InstancedMesh>(null);
  const darkRef = useRef<THREE.InstancedMesh>(null);

  const G = 80; // glass shard count
  const C = 20;  // chrome shard count
  const D = 12;  // dark shard count

  // ── Shard layouts ──────────────────────────────────────────────────────────
  const glassShards = useMemo(
    () => buildShards(G, 0.75, 1.1, 1.55, 0.7),
    []
  );
  const chromeShards = useMemo(
    () => buildShards(C, 0.28, 0.68, 1.3, 0.62),
    []
  );
  const darkShards = useMemo(
    () => buildShards(D, 0.48, 0.88, 1.45, 0.68),
    []
  );

  // ── Reusable THREE objects (no GC churn in useFrame) ──────────────────────
  const _p = useMemo(() => new THREE.Vector3(), []);
  const _q = useMemo(() => new THREE.Quaternion(), []);
  const _s = useMemo(() => new THREE.Vector3(), []);
  const _m = useMemo(() => new THREE.Matrix4(), []);

  // ── Shared octahedron geometry ─────────────────────────────────────────────
  // An octahedron scaled by the per-instance matrix becomes an elongated crystal
  const octaGeo = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);

  // ── Materials ──────────────────────────────────────────────────────────────
  // Glass: translucent + iridescent holographic surface
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#ddeeff"),
        metalness: 0.06,
        roughness: 0.04,
        transparent: true,
        opacity: 0.78,
        transmission: 0.45,
        thickness: 0.9,
        ior: 1.5,
        iridescence: 0.65,
        iridescenceIOR: 1.6,
        iridescenceThicknessRange: [150, 750],
        side: THREE.DoubleSide,
        envMapIntensity: 2.8,
        depthWrite: false,
      }),
    []
  );

  // Chrome: mirror-metallic, picks up environment perfectly
  const chromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#b8cce0"),
        metalness: 1.0,
        roughness: 0.03,
        envMapIntensity: 5.5,
      }),
    []
  );

  // Dark accent: near-black with iridescent surface sheen
  const darkMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#151d2a"),
        metalness: 0.92,
        roughness: 0.06,
        transparent: true,
        opacity: 0.9,
        iridescence: 0.38,
        iridescenceIOR: 1.85,
        iridescenceThicknessRange: [450, 1300],
        envMapIntensity: 4.5,
      }),
    []
  );

  // ── Connection network geometry ────────────────────────────────────────────
  // Thin lines between nearby fragments — the "neural" web
  const lineGeo = useMemo(() => {
    const allShards = [...glassShards, ...chromeShards, ...darkShards];
    const positions: number[] = [];
    const THRESH = 0.46;

    for (let i = 0; i < allShards.length; i++) {
      for (let j = i + 1; j < allShards.length; j++) {
        const d = allShards[i].basePos.distanceTo(allShards[j].basePos);
        if (d < THRESH && Math.random() > 0.42) {
          const a = allShards[i].basePos;
          const b = allShards[j].basePos;
          positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, [glassShards, chromeShards, darkShards]);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#5580b8"),
        transparent: true,
        opacity: 0.09,
        depthWrite: false,
      }),
    []
  );

  // ── Halo ring geometry ─────────────────────────────────────────────────────
  // A thin glowing equatorial ring that frames the whole sculpture
  const haloGeo = useMemo(() => new THREE.TorusGeometry(1.28, 0.012, 6, 128), []);
  const haloMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#6090d0"),
        emissive: new THREE.Color("#3060b0"),
        emissiveIntensity: 2.5,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
    []
  );

  // ── Initialize instance matrices (once on mount) ──────────────────────────
  useEffect(() => {
    const init = (
      ref: React.RefObject<THREE.InstancedMesh | null>,
      shards: ShardData[]
    ) => {
      if (!ref.current) return;
      shards.forEach((s, i) => {
        _q.setFromAxisAngle(s.rotAxis, s.baseRotAngle);
        _m.compose(s.basePos, _q, s.scale);
        ref.current!.setMatrixAt(i, _m);
      });
      ref.current.instanceMatrix.needsUpdate = true;
    };

    init(glassRef, glassShards);
    init(chromeRef, chromeShards);
    init(darkRef, darkShards);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Per-frame: breathing + micro-rotation + mouse tilt ───────────────────
  useFrame((state) => {
    if (!groupRef.current || !glassRef.current || !chromeRef.current || !darkRef.current) return;
    const t = state.clock.elapsedTime;

    // Whole-group: gentle vertical float + mouse tilt
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.18;
    groupRef.current.rotation.x = mouse.current.y * -0.35;
    groupRef.current.rotation.y = (t * 0.05) + (mouse.current.x * 0.45);
    groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.08;

    // Hover scale explosion + base pulse
    targetScale.current = THREE.MathUtils.lerp(
      targetScale.current,
      hovered ? 1.08 : 1,
      0.05
    );
    const basePulse = 1 + Math.sin(t * 0.6) * 0.03;
    groupRef.current.scale.setScalar(targetScale.current * basePulse);

    // Glass shards: breathe outward + micro-rotation + scale pulse
    glassShards.forEach((s, i) => {
      const b = Math.sin(t * s.breathSpeed + s.breathPhase) * s.breathAmp;
      _p.copy(s.basePos).addScaledVector(s.breathDir, b);
      _q.setFromAxisAngle(s.rotAxis, s.baseRotAngle + t * s.microRotSpeed);
      const pulse = 1.0 + Math.sin(t * s.breathSpeed * 0.7 + s.breathPhase) * 0.055;
      _s.set(s.scale.x * pulse, s.scale.y, s.scale.z * pulse);
      _m.compose(_p, _q, _s);
      glassRef.current!.setMatrixAt(i, _m);
    });
    glassRef.current.instanceMatrix.needsUpdate = true;

    // Chrome shards: slightly out of phase with glass (creates ripple effect)
    chromeShards.forEach((s, i) => {
      const b = Math.sin(t * s.breathSpeed + s.breathPhase + 1.1) * s.breathAmp * 0.62;
      _p.copy(s.basePos).addScaledVector(s.breathDir, b);
      _q.setFromAxisAngle(s.rotAxis, s.baseRotAngle + t * s.microRotSpeed);
      _m.compose(_p, _q, s.scale);
      chromeRef.current!.setMatrixAt(i, _m);
    });
    chromeRef.current.instanceMatrix.needsUpdate = true;

    // Dark shards: phase offset creates beautiful wave across the whole structure
    darkShards.forEach((s, i) => {
      const b = Math.sin(t * s.breathSpeed + s.breathPhase + 2.2) * s.breathAmp * 0.48;
      _p.copy(s.basePos).addScaledVector(s.breathDir, b);
      _q.setFromAxisAngle(s.rotAxis, s.baseRotAngle + t * s.microRotSpeed);
      _m.compose(_p, _q, s.scale);
      darkRef.current!.setMatrixAt(i, _m);
    });
    darkRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* ── Glass outer shell ── */}
      <instancedMesh
        ref={glassRef}
        args={[octaGeo, glassMat, G]}
        renderOrder={2}
      />

      {/* ── Chrome inner core ── */}
      <instancedMesh
        ref={chromeRef}
        args={[octaGeo, chromeMat, C]}
      />

      {/* ── Dark accent shards ── */}
      <instancedMesh
        ref={darkRef}
        args={[octaGeo, darkMat, D]}
      />

      {/* ── Neural connection web ── */}
      <lineSegments
        geometry={lineGeo}
        material={lineMat}
        renderOrder={1}
      />

      {/* ── Equatorial halo ring ── */}
      <mesh geometry={haloGeo} material={haloMat} rotation={[Math.PI / 2, 0, 0]} />

      {/* ── Tilted inner ring ── */}
      <mesh rotation={[Math.PI / 3.5, 0.55, 0]}>
        <torusGeometry args={[0.44, 0.007, 6, 96]} />
        <meshStandardMaterial
          color="#88b4e8"
          emissive="#3868c0"
          emissiveIntensity={3.5}
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>

      {/* ── Energy core ── */}
      <mesh>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#4878ff"
          emissiveIntensity={6.0}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* ── Core halo bloom ── */}
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color="#4060ff"
          transparent
          opacity={0.04}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// ─── Scene root (inside Canvas) ───────────────────────────────────────────────
function SceneContent() {
  const rawMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      rawMouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      rawMouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    // Smooth mouse interpolation — expensive feel, no snapping
    mouse.current.x += (rawMouse.current.x - mouse.current.x) * 0.05;
    mouse.current.y += (rawMouse.current.y - mouse.current.y) * 0.05;
  });

  return (
    <>
      {/* ── Studio lighting — luxury product shoot quality ── */}
      {/* Key light: warm-white, strong, from top-left */}
      <ambientLight intensity={0.45} color="#c0d4ee" />
      <directionalLight
        position={[-4, 5, 4]}
        intensity={3.5}
        color="#ffffff"
      />
      {/* Rim light: cold blue from back-right — creates depth separation */}
      <directionalLight
        position={[5, -1, -4]}
        intensity={1.8}
        color="#8ab0e0"
      />
      {/* Fill: subtle from below */}
      <directionalLight
        position={[0, -5, 3]}
        intensity={0.4}
        color="#ddeeff"
      />
      {/* Core glow point light */}
      <pointLight
        position={[0, 0, 0.5]}
        intensity={1.5}
        color="#3060ff"
        distance={4.5}
        decay={2}
      />

      {/* ── HDRI environment for realistic material reflections ── */}
      <Environment preset="city" />

      {/* ── The sculpture ── */}
      <DigitalCortex mouse={mouse} />

      {/* ── Floating particle atmosphere ── */}
      {/* Inner micro-dust — barely visible, just enough to feel alive */}
      <Sparkles
        count={45}
        scale={[4.5, 6.5, 4.5]}
        size={0.55}
        speed={0.07}
        opacity={0.28}
        color="#7090c0"
        noise={0.9}
      />
      {/* Outer ambient field */}
      <Sparkles
        count={20}
        scale={[6.5, 8, 6.5]}
        size={0.35}
        speed={0.05}
        opacity={0.14}
        color="#a0c4e8"
        noise={1.2}
      />
    </>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "0px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={inView ? "always" : "demand"}
        // Camera pulled back slightly to prevent clipping during hover explosion
        camera={{ position: [0, 0, 5.6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
