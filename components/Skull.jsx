"use client";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Skull = ({ mouse }) => {
  const initialPosition = [0, 0.15, 0];
  const initialRotation = [0.3, 0, 0];
  const skullRef = useRef();
  const { scene } = useGLTF("/models/skull/scene.gltf");

  useFrame(() => {
    if (!skullRef.current) return;

    skullRef.current.rotation.y = THREE.MathUtils.lerp(
      skullRef.current.rotation.y,
      initialRotation[1] + mouse.x * 0.2,
      0.1,
    );
    skullRef.current.rotation.x = THREE.MathUtils.lerp(
      skullRef.current.rotation.x,
      initialRotation[0] + mouse.y * 0.2,
      0.1,
    );
    skullRef.current.position.x = THREE.MathUtils.lerp(
      skullRef.current.position.x,
      initialPosition[0] + mouse.x * 0.2,
      0.1,
    );
    skullRef.current.position.y = THREE.MathUtils.lerp(
      skullRef.current.position.y,
      initialPosition[1] - mouse.y * 0.2,
      0.1,
    );
  });

  return (
    <primitive
      ref={skullRef}
      rotation={initialRotation}
      position={initialPosition}
      object={scene}
      scale={1}
    />
  );
};

export default Skull;
