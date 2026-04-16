import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';

// Placeholder model URL - user can replace this with their own GLTF/GLB model
const MODEL_URL = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/robot/model.gltf';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

export const Character3D = () => {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
  }, []);

  if (!webGLSupported) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-green/20 rounded-full blur-[100px]" />
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative z-10 w-64 h-64 bg-green rounded-full shadow-2xl border border-ink/10 flex items-center justify-center"
        >
          <Rocket size={80} className="text-ink" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] bg-transparent">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ preserveDrawingBuffer: true }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <Model url={MODEL_URL} />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};
