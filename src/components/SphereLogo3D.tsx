import React, { useRef, useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AnimatedSphere = ({ dark }: { dark: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const color = dark ? "#ffffff" : "#000000";
  const baseColor = dark ? "#111111" : "#f5f5f5";
  const accentColor = dark ? "#ffffff" : "#000000"; // Monochrome accent

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        {/* Solid Core Sphere */}
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial 
            color={baseColor} 
            roughness={0.3} 
            metalness={0.5} 
          />
        </mesh>

        {/* Grid Overlay (Longitude/Latitude lines) */}
        <mesh>
          <sphereGeometry args={[1.205, 16, 12]} />
          <meshBasicMaterial 
            color={color} 
            wireframe 
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* Main Orbital Ring (Tilted like the logo) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.2, Math.PI / 8, 0]}>
        <torusGeometry args={[1.8, 0.04, 16, 100]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Secondary thin ring */}
      <mesh rotation={[Math.PI / 2.2, Math.PI / 8, 0]}>
        <torusGeometry args={[1.95, 0.01, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("WebGL context failed, falling back to CSS 3D:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const CSSFallback = ({ className, dark }: { className?: string, dark?: boolean }) => {
  const color = dark ? "border-white" : "border-ink";
  const accentColor = dark ? "border-white" : "border-ink";
  
  return (
    <div className={`${className} flex items-center justify-center`} style={{ perspective: '1000px' }}>
      <div className="relative w-32 h-32">
        {/* Solid Core Sphere (Static, shaded to look 3D) */}
        <div 
          className={`absolute inset-0 rounded-full shadow-2xl`}
          style={{ 
            background: dark 
              ? 'radial-gradient(circle at 30% 30%, #444444, #111111)' 
              : 'radial-gradient(circle at 30% 30%, #ffffff, #cccccc)',
          }} 
        />
        
        {/* Spinning Grid */}
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', animation: 'spin3d 12s linear infinite' }}>
          <style>{`
            @keyframes spin3d {
              from { transform: rotateX(10deg) rotateY(0deg); }
              to { transform: rotateX(10deg) rotateY(360deg); }
            }
          `}</style>
          
          {/* Longitude lines */}
          {[0, 45, 90, 135].map((deg, i) => (
            <div 
              key={`lon-${i}`}
              className={`absolute inset-0 rounded-full border-[1px] ${color} opacity-30`}
              style={{ transform: `rotateY(${deg}deg)` }}
            />
          ))}
          {/* Latitude lines */}
          <div className={`absolute inset-0 rounded-full border-[1px] ${color} opacity-30`} style={{ transform: 'rotateX(90deg)' }} />
          <div className={`absolute inset-3 rounded-full border-[1px] ${color} opacity-30`} style={{ transform: 'translateZ(20px) rotateX(90deg)' }} />
          <div className={`absolute inset-3 rounded-full border-[1px] ${color} opacity-30`} style={{ transform: 'translateZ(-20px) rotateX(90deg)' }} />
        </div>

        {/* Orbital ring (Tilted) */}
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', animation: 'spinRing 8s linear infinite' }}>
          <style>{`
            @keyframes spinRing {
              from { transform: rotateX(70deg) rotateY(-20deg) rotateZ(0deg); }
              to { transform: rotateX(70deg) rotateY(-20deg) rotateZ(360deg); }
            }
          `}</style>
          <div className={`absolute -inset-8 rounded-full border-[3px] ${accentColor} opacity-80`} />
          <div className={`absolute -inset-10 rounded-full border-[1px] ${color} opacity-30`} />
        </div>
      </div>
    </div>
  );
};

export const SphereLogo3D = ({ className, dark = false }: { className?: string, dark?: boolean }) => {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    return <CSSFallback className={className} dark={dark} />;
  }

  return (
    <div className={className} style={{ cursor: 'grab', position: 'relative' }}>
      <WebGLErrorBoundary fallback={<CSSFallback className={className} dark={dark} />}>
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ powerPreference: "low-power", failIfMajorPerformanceCaveat: false }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={1} />
          <AnimatedSphere dark={dark} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
