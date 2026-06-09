"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { InstancedMesh, Object3D, Vector3, MathUtils, DoubleSide } from "three";

const PETAL_COUNT = 400;

function Petals() {
  const meshRef = useRef<InstancedMesh>(null);
  const { viewport, pointer } = useThree();
  const dummy = useMemo(() => new Object3D(), []);

  // Initialize petal data: position, rotation, velocity, rotation speed, phase
  const petals = useMemo(() => {
    const data = [];
    for (let i = 0; i < PETAL_COUNT; i++) {
      data.push({
        position: new Vector3(
          MathUtils.randFloatSpread(viewport.width * 1.5),
          MathUtils.randFloatSpread(viewport.height * 2), // Start spread out vertically
          MathUtils.randFloatSpread(10) - 5 // Depth from -5 to 5
        ),
        rotation: new Vector3(
          MathUtils.randFloat(0, Math.PI * 2),
          MathUtils.randFloat(0, Math.PI * 2),
          MathUtils.randFloat(0, Math.PI * 2)
        ),
        velocity: new Vector3(
          MathUtils.randFloat(-0.02, 0.02), // Wind drift X
          MathUtils.randFloat(-0.03, -0.06), // Falling speed Y
          MathUtils.randFloat(-0.01, 0.01) // Drift Z
        ),
        rotationSpeed: new Vector3(
          MathUtils.randFloat(-0.02, 0.02),
          MathUtils.randFloat(-0.02, 0.02),
          MathUtils.randFloat(-0.02, 0.02)
        ),
        phase: MathUtils.randFloat(0, Math.PI * 2), // For sine wave swaying
        scale: MathUtils.randFloat(0.5, 1.5),
      });
    }
    return data;
  }, [viewport.width, viewport.height]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Convert normalized pointer coordinates (-1 to +1) to world coordinates roughly
    const mouseWorldX = (pointer.x * viewport.width) / 2;
    const mouseWorldY = (pointer.y * viewport.height) / 2;
    const mousePos = new Vector3(mouseWorldX, mouseWorldY, 0);

    const time = state.clock.getElapsedTime();

    petals.forEach((petal, i) => {
      // Base movement
      petal.position.add(petal.velocity);
      
      // Swaying motion (wind simulation)
      petal.position.x += Math.sin(time * 0.5 + petal.phase) * 0.005;

      // Mouse interaction (repel)
      const dist = petal.position.distanceTo(mousePos);
      if (dist < 2) {
        const force = (2 - dist) * 0.02;
        const dir = petal.position.clone().sub(mousePos).normalize();
        petal.position.add(dir.multiplyScalar(force));
      }

      // Screen wrap (if they fall below screen, reset to top)
      if (petal.position.y < -viewport.height / 2 - 1) {
        petal.position.y = viewport.height / 2 + 1;
        petal.position.x = MathUtils.randFloatSpread(viewport.width * 1.5);
      }
      if (petal.position.x < -viewport.width - 2) petal.position.x = viewport.width + 2;
      if (petal.position.x > viewport.width + 2) petal.position.x = -viewport.width - 2;

      // Rotation update
      petal.rotation.add(petal.rotationSpeed);

      // Apply to dummy object
      dummy.position.copy(petal.position);
      dummy.rotation.set(petal.rotation.x, petal.rotation.y, petal.rotation.z);
      dummy.scale.set(petal.scale, petal.scale, petal.scale);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PETAL_COUNT]}>
      {/* A simple curved geometry to look like a petal */}
      <planeGeometry args={[0.2, 0.3, 2, 2]}>
        <meshStandardMaterial
          color="#ffb7c5"
          emissive="#ff8da1"
          emissiveIntensity={0.4}
          roughness={0.4}
          transparent
          opacity={0.85}
          side={DoubleSide}
          onBeforeCompile={(shader) => {
            // Add a slight curve to the plane vertices
            shader.vertexShader = shader.vertexShader.replace(
              `#include <begin_vertex>`,
              `
              #include <begin_vertex>
              transformed.z += sin(transformed.x * 10.0) * 0.05;
              transformed.z += cos(transformed.y * 10.0) * 0.05;
              `
            );
          }}
        />
      </planeGeometry>
    </instancedMesh>
  );
}

export default function CherryBlossomScene() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffb7c5" />
        
        <Petals />
      </Canvas>
    </div>
  );
}
