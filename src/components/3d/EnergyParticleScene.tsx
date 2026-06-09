"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  Vector3,
  Color,
  BufferGeometry,
  Float32BufferAttribute,
  BufferAttribute,
  LineSegments,
  LineBasicMaterial,
  AdditiveBlending,
  MeshBasicMaterial,
  PlaneGeometry,
  InstancedMesh,
  Object3D,
  CanvasTexture,
  MathUtils,
} from "three";

// ── Configuration ────────────────────────────────────────────────────────────

const NODE_COUNT = 42;          // Deliberate, professional count
const MAX_LINK_DIST = 3.8;      // World-unit radius for connecting nodes
const MAX_LINKS_PER_NODE = 4;   // Cap edges per node — keeps it clean
const ATTRACT_RADIUS = 4.5;     // Mouse influence radius (world units)
const ATTRACT_STRENGTH = 0.0018;
const SPRING_K = 0.006;         // Spring back to home position
const DAMPING = 0.86;           // Velocity damping per frame
const MAX_SEGS = (NODE_COUNT * (NODE_COUNT - 1)) / 2; // 861 worst-case

const NODE_COL = new Color("#FF8C00");

// ── Node glow sprite texture (canvas → GPU) ───────────────────────────────────
// Radial gradient: bright white core → orange → transparent edge
// This makes each node look like a glowing orb, not a flat shape.

function makeGlowTex(): CanvasTexture {
  const S = 64;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0.00, "rgba(255, 245, 200, 1.0)");
  g.addColorStop(0.18, "rgba(255, 168, 45, 0.95)");
  g.addColorStop(0.52, "rgba(255, 95, 0, 0.42)");
  g.addColorStop(1.00, "rgba(200, 40, 0, 0.0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return new CanvasTexture(c);
}

// ── Node data ─────────────────────────────────────────────────────────────────

interface Node {
  pos: Vector3;
  home: Vector3;      // resting position (spring target)
  vel: Vector3;
  phase: number;
  baseScale: number;
  pulseRate: number;
}

function buildNodes(vpW: number, vpH: number): Node[] {
  return Array.from({ length: NODE_COUNT }, () => {
    // 65 % right-side bias — hero headline lives on the left, keeps it readable
    const x =
      Math.random() < 0.65
        ? MathUtils.randFloat(vpW * 0.08, vpW * 1.4)
        : MathUtils.randFloat(-vpW * 1.4, -vpW * 0.08);
    const y = MathUtils.randFloatSpread(vpH * 1.75);
    const z = MathUtils.randFloat(-9, 0.5);
    const home = new Vector3(x, y, z);
    return {
      pos: home.clone(),
      home: home.clone(),
      vel: new Vector3(),
      phase: Math.random() * Math.PI * 2,
      baseScale: MathUtils.randFloat(0.09, 0.28),
      pulseRate: MathUtils.randFloat(0.45, 1.3),
    };
  });
}

// ── Core network component ────────────────────────────────────────────────────

function NetworkScene({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<Vector3>;
}) {
  const nodesMeshRef = useRef<InstancedMesh>(null);
  const { viewport, camera } = useThree();
  const dummy = useMemo(() => new Object3D(), []);
  const tempColor = useMemo(() => new Color(), []);
  const initDone = useRef(false);

  const nodes = useMemo(
    () => buildNodes(viewport.width, viewport.height),
    [viewport.width, viewport.height]
  );

  // Billboard node sprites
  const nodeGeo = useMemo(() => new PlaneGeometry(1, 1), []);
  const nodeMat = useMemo(
    () =>
      new MeshBasicMaterial({
        map: makeGlowTex(),
        color: 0xffffff, // white base so setColorAt tints correctly
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
        toneMapped: false, // HDR values reach Bloom
      }),
    []
  );

  // Line segments — pre-allocate max-case buffer, draw only active segments
  const linePos = useMemo(() => new Float32Array(MAX_SEGS * 6), []);

  const linesObj = useMemo(() => {
    const geo = new BufferGeometry();
    const attr = new Float32BufferAttribute(linePos, 3);
    geo.setAttribute("position", attr);
    const mat = new LineBasicMaterial({
      color: "#FF6B00",
      transparent: true,
      opacity: 0.28,
      blending: AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const ls = new LineSegments(geo, mat);
    ls.frustumCulled = false;
    return ls;
  }, [linePos]);

  useFrame((state) => {
    const mesh = nodesMeshRef.current;
    if (!mesh) return;

    const time = state.clock.getElapsedTime();
    const mouse = mouseRef.current;
    const camQ = camera.quaternion;

    // One-time colour initialisation (mesh.setColorAt needs the mesh to exist)
    if (!initDone.current) {
      nodes.forEach((_, i) => mesh.setColorAt(i, NODE_COL));
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      initDone.current = true;
    }

    // ── Update nodes ──────────────────────────────────────────────────────
    nodes.forEach((n, i) => {
      // Very gentle ambient drift
      n.vel.x += Math.cos(time * 0.17 + n.phase) * 0.00022;
      n.vel.y += Math.sin(time * 0.21 + n.phase) * 0.00022;

      // Mouse attraction (quadratic falloff feels natural)
      const dx = mouse.x - n.pos.x;
      const dy = mouse.y - n.pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
      if (dist < ATTRACT_RADIUS) {
        const t = 1 - dist / ATTRACT_RADIUS; // 0→1 as mouse approaches
        n.vel.x += (dx / dist) * t * t * ATTRACT_STRENGTH;
        n.vel.y += (dy / dist) * t * t * ATTRACT_STRENGTH;
      }

      // Spring back to resting position
      n.vel.x += (n.home.x - n.pos.x) * SPRING_K;
      n.vel.y += (n.home.y - n.pos.y) * SPRING_K;

      // Velocity damping
      n.vel.multiplyScalar(DAMPING);
      n.pos.add(n.vel);

      // Pulsing scale
      const pulse = 0.82 + Math.sin(time * n.pulseRate + n.phase) * 0.18;

      // Billboard: always face camera
      dummy.position.copy(n.pos);
      dummy.quaternion.copy(camQ);
      dummy.scale.setScalar(n.baseScale * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Pulse brightness
      tempColor.copy(NODE_COL).multiplyScalar(0.7 + pulse * 0.3);
      mesh.setColorAt(i, tempColor);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // ── Build connection lines ────────────────────────────────────────────
    let seg = 0;
    for (let a = 0; a < nodes.length; a++) {
      let links = 0;
      for (
        let b = a + 1;
        b < nodes.length && links < MAX_LINKS_PER_NODE;
        b++
      ) {
        if (seg >= MAX_SEGS) break;
        const d = nodes[a].pos.distanceTo(nodes[b].pos);
        if (d < MAX_LINK_DIST) {
          const o = seg * 6;
          linePos[o] = nodes[a].pos.x;
          linePos[o + 1] = nodes[a].pos.y;
          linePos[o + 2] = nodes[a].pos.z;
          linePos[o + 3] = nodes[b].pos.x;
          linePos[o + 4] = nodes[b].pos.y;
          linePos[o + 5] = nodes[b].pos.z;
          seg++;
          links++;
        }
      }
    }

    linesObj.geometry.setDrawRange(0, seg * 2);
    (linesObj.geometry.attributes.position as BufferAttribute).needsUpdate = true;
  });

  return (
    <>
      <instancedMesh
        ref={nodesMeshRef}
        args={[nodeGeo, nodeMat, NODE_COUNT]}
        frustumCulled={false}
      />
      <primitive object={linesObj} />
    </>
  );
}

// ── Full scene ────────────────────────────────────────────────────────────────

function SceneContent({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<Vector3>;
}) {
  return (
    <>
      <NetworkScene mouseRef={mouseRef} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.05}
          luminanceSmoothing={0.88}
          intensity={2.4}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// ── Canvas root ───────────────────────────────────────────────────────────────

export default function EnergyParticleScene() {
  const mouseRef = useRef(new Vector3(0, 0, 0));

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      // Approx world coords for fov=50, camera z=8
      mouseRef.current.set(nx * 11, ny * 7, 0);
    },
    []
  );

  return (
    <div
      className="w-full h-full absolute inset-0 pointer-events-auto"
      onMouseMove={onMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <SceneContent mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
