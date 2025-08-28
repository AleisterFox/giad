import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Text, Box, Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

// Componente de engranajes animados
function AnimatedGear({ position, scale = 1, rotationSpeed = 0.01, color = "#1e3a8a" }) {
  const gearRef = useRef();

  useFrame(() => {
    if (gearRef.current) {
      gearRef.current.rotation.z += rotationSpeed;
    }
  });

  // Geometría de engranaje simplificada
  const gearGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.6;
    const teeth = 12;

    for (let i = 0; i < teeth * 2; i++) {
      const angle = (i / (teeth * 2)) * Math.PI * 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    
    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.05,
      bevelThickness: 0.05
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <mesh ref={gearRef} position={position} scale={scale}>
      <primitive object={gearGeometry} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

// Componente de circuito electrónico
function CircuitBoard() {
  const boardRef = useRef();

  useFrame((state) => {
    if (boardRef.current) {
      boardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={boardRef}>
      {/* Base del circuito */}
      <Box args={[3, 0.1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0f172a" />
      </Box>
      
      {/* Componentes del circuito */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          args={[0.2, 0.1, 0.2]}
          position={[
            (Math.random() - 0.5) * 2.5,
            0.1,
            (Math.random() - 0.5) * 1.5
          ]}
        >
          <meshStandardMaterial color="#f97316" />
        </Box>
      ))}
      
      {/* Líneas del circuito */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Box
          key={`line-${i}`}
          args={[Math.random() * 1.5 + 0.5, 0.02, 0.05]}
          position={[
            (Math.random() - 0.5) * 2.5,
            0.06,
            (Math.random() - 0.5) * 1.5
          ]}
          rotation={[0, Math.random() * Math.PI, 0]}
        >
          <meshStandardMaterial color="#4169e1" emissive="#4169e1" emissiveIntensity={0.2} />
        </Box>
      ))}
    </group>
  );
}

// Componente principal de la escena de ingeniería
export default function EngineeringScene({ variant = "gears" }) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
      
      {/* Iluminación */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#f97316" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#4169e1"
      />

      {variant === "gears" && (
        <>
          <AnimatedGear position={[-2, 0, 0]} rotationSpeed={0.02} color="#1e3a8a" />
          <AnimatedGear position={[2, 0, 0]} rotationSpeed={-0.015} color="#f97316" scale={0.8} />
          <AnimatedGear position={[0, 2, 0]} rotationSpeed={0.01} color="#64748b" scale={1.2} />
        </>
      )}

      {variant === "circuit" && <CircuitBoard />}

      {variant === "solar" && (
        <group>
          {/* Panel solar */}
          <Box args={[4, 0.1, 2.5]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
          </Box>
          
          {/* Celdas solares */}
          {Array.from({ length: 24 }).map((_, i) => (
            <Box
              key={i}
              args={[0.3, 0.02, 0.3]}
              position={[
                -1.5 + (i % 6) * 0.5,
                0.06,
                -1 + Math.floor(i / 6) * 0.5
              ]}
            >
              <meshStandardMaterial 
                color="#1e3a8a" 
                metalness={0.8} 
                roughness={0.2}
                emissive="#4169e1"
                emissiveIntensity={0.1}
              />
            </Box>
          ))}
          
          {/* Sol */}
          <Sphere args={[0.5]} position={[3, 3, 2]}>
            <meshStandardMaterial 
              color="#f97316" 
              emissive="#f97316" 
              emissiveIntensity={0.5}
            />
          </Sphere>
        </group>
      )}
    </Canvas>
  );
}