
import { Canvas } from "@react-three/fiber";
import { Float, PresentationControls, Environment, ContactShadows } from "@react-three/drei";
import { Button } from "@/components/ui/button";

function FloatingShapes() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00ffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
      
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        snap
      >
        <Float rotationIntensity={0.4} floatIntensity={2} speed={1.5}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[3, 2, 0.2]} />
            <meshPhysicalMaterial 
              color="#0a192f" 
              metalness={0.9} 
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
            {/* Screen mock */}
            <mesh position={[0, 0, 0.11]}>
              <planeGeometry args={[2.8, 1.8]} />
              <meshBasicMaterial color="#00ffff" opacity={0.1} transparent />
            </mesh>
          </mesh>
        </Float>
        
        <Float rotationIntensity={0.6} floatIntensity={3} speed={2}>
          <mesh position={[-1.5, -0.5, 1]} castShadow>
            <boxGeometry args={[1, 2, 0.1]} />
            <meshPhysicalMaterial 
              color="#0a192f" 
              metalness={0.9} 
              roughness={0.1}
            />
            {/* Mobile screen mock */}
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[0.9, 1.9]} />
              <meshBasicMaterial color="#ff00ff" opacity={0.1} transparent />
            </mesh>
          </mesh>
        </Float>

        <Float rotationIntensity={0.3} floatIntensity={1} speed={1}>
           <mesh position={[1.8, -0.2, 0.5]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
            <meshPhysicalMaterial 
              color="#0044ff" 
              metalness={0.5} 
              roughness={0.2}
              transmission={0.9}
              thickness={0.5}
            />
          </mesh>
        </Float>
      </PresentationControls>

      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <Environment preset="city" />
    </>
  );
}

export default function Showcase() {
  return (
    <section className="relative py-24 bg-background overflow-hidden border-y border-border/30">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Immersive <span className="text-primary">Digital Experiences</span>
            </h2>
            <p 
              className="text-muted-foreground text-lg mb-8 max-w-xl"
            >
              We don&apos;t just build websites; we create interactive, high-performance digital products that captivate users. Leveraging cutting-edge technologies like WebGL and React, we deliver premium quality at scale.
            </p>
            <div             >
              <Button size="lg" className="shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                Start Your Project
              </Button>
            </div>
          </div>
          
          <div className="h-[500px] w-full rounded-2xl overflow-hidden bg-card/20 backdrop-blur-sm border border-border/50 relative">
            {/* Fallback for mobile or while loading */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent -z-10" />
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <FloatingShapes />
            </Canvas>
            
            {/* Interactive hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/80 tracking-widest uppercase pointer-events-none bg-background/50 px-3 py-1 rounded-full backdrop-blur-md">
              Drag to interact
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
