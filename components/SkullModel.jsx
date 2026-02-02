"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import Skull from "./Skull";
const SkullModel = ({ mouse }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      shadows
      gl={{
        physicallyCorrectLights: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.SRGBColorSpace,
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 0, 3]} intensity={8} castShadow />
      <pointLight intensity={10} position={[0, -2, 3]} />
      <directionalLight intensity={0.5} position={[-3, -2, -2]} />

      <Suspense fallback={null}>
        <Skull mouse={mouse} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
};

export default SkullModel;
