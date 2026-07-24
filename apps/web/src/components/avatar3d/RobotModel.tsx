"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getRobotConfig, RobotConfig } from "@/data/robotConfigs";

interface RobotModelProps {
  tutorId: string;
  isSpeaking: boolean;
  emotion?: "idle" | "happy" | "thinking" | "explaining";
}

function RobotHead({ config, isSpeaking, speakRef }: { config: RobotConfig; isSpeaking: boolean; speakRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const blinkTimer = useRef(Math.random() * 5);

  const headGeo = useMemo(() => {
    switch (config.headShape) {
      case "round": return new THREE.SphereGeometry(0.5 * config.headScale, 32, 32);
      case "square": return new THREE.BoxGeometry(0.85 * config.headScale, 0.7 * config.headScale, 0.7 * config.headScale);
      case "angular": return new THREE.CylinderGeometry(0.42 * config.headScale, 0.48 * config.headScale, 0.7 * config.headScale, 6);
      case "oval": return new THREE.SphereGeometry(0.48 * config.headScale, 32, 24);
      case "pointed": return new THREE.ConeGeometry(0.45 * config.headScale, 0.8 * config.headScale, 32);
      default: return new THREE.SphereGeometry(0.5 * config.headScale, 32, 32);
    }
  }, [config]);

  const headMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: config.secondary,
    metalness: 0.4,
    roughness: 0.3,
  }), [config]);

  const eyeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: config.accent,
    emissive: config.accent,
    emissiveIntensity: 0.8,
  }), [config]);

  const mouthMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#0f172a",
  }), []);

  useFrame((_, delta) => {
    blinkTimer.current += delta;
    if (blinkTimer.current > 3 + Math.random() * 4) {
      blinkTimer.current = 0;
      if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.scale.y = 0.1;
        rightEyeRef.current.scale.y = 0.1;
        setTimeout(() => {
          if (leftEyeRef.current) leftEyeRef.current.scale.y = 1;
          if (rightEyeRef.current) rightEyeRef.current.scale.y = 1;
        }, 100);
      }
    }

    if (mouthRef.current && isSpeaking) {
      speakRef.current += delta;
      const openAmount = Math.abs(Math.sin(speakRef.current * 10)) * 0.08;
      mouthRef.current.scale.y = 1 + openAmount * 8;
      mouthRef.current.scale.x = 1 + openAmount * 3;
    } else if (mouthRef.current) {
      mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, 1, delta * 8);
      mouthRef.current.scale.x = THREE.MathUtils.lerp(mouthRef.current.scale.x, 1, delta * 8);
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.1, 0]}>
      <mesh geometry={headGeo} material={headMat} />

      {/* Eyes */}
      <mesh ref={leftEyeRef} position={[-0.15 * config.headScale, 0.05, 0.42 * config.headScale]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <primitive object={eyeMat} attach="material" />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.15 * config.headScale, 0.05, 0.42 * config.headScale]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <primitive object={eyeMat} attach="material" />
      </mesh>

      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, -0.12, 0.42 * config.headScale]}>
        <boxGeometry args={[0.16, 0.03, 0.02]} />
        <primitive object={mouthMat} attach="material" />
      </mesh>

      {/* Antenna for specific configs */}
      {config.accessory === "antenna" && (
        <group position={[0, 0.5 * config.headScale, 0]}>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.16]} />
            <meshStandardMaterial color={config.secondary} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color={config.accent} emissive={config.accent} emissiveIntensity={1} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function RobotBody({ config }: { config: RobotConfig }) {
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: config.primary,
    metalness: 0.5,
    roughness: 0.25,
  }), [config]);

  const lightMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: config.accent,
    emissive: config.accent,
    emissiveIntensity: 0.6,
  }), [config]);

  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group position={[0, 0.2, 0]}>
      {/* Torso */}
      <mesh>
        <boxGeometry args={[0.65 * config.bodyWidth, 0.85 * config.bodyHeight, 0.45]} />
        <primitive object={bodyMat} attach="material" />
      </mesh>

      {/* Chest light */}
      <mesh position={[0, 0.15, 0.23]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <primitive object={lightMat} attach="material" />
      </mesh>
      <pointLight ref={lightRef} position={[0, 0.15, 0.35]} color={config.accent} intensity={0.5} distance={1.5} />

      {/* Chest lines */}
      {[-0.05, 0.05, 0.15].map((y, i) => (
        <mesh key={i} position={[0, y, 0.23]}>
          <boxGeometry args={[0.35, 0.008, 0.005]} />
          <meshStandardMaterial color={config.secondary} opacity={0.4} transparent />
        </mesh>
      ))}
    </group>
  );
}

function RobotArms({ config, isSpeaking, emotion }: { config: RobotConfig; isSpeaking: boolean; emotion: string }) {
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const targetAngle = isSpeaking && emotion === "explaining" ? -0.4 : 0.15;
    if (leftRef.current) {
      leftRef.current.rotation.z = THREE.MathUtils.lerp(leftRef.current.rotation.z, targetAngle, delta * 3);
    }
    if (rightRef.current) {
      rightRef.current.rotation.z = THREE.MathUtils.lerp(rightRef.current.rotation.z, -targetAngle, delta * 3);
    }
  });

  if (config.armStyle === "none") return null;

  const armWidth = config.armStyle === "elegant" ? 0.06 : config.armStyle === "thick" ? 0.1 : 0.08;

  return (
    <>
      <group ref={leftRef} position={[-0.42 * config.bodyWidth, 0.5, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[armWidth, 0.3, 8, 16]} />
          <meshStandardMaterial color={config.secondary} metalness={0.4} roughness={0.3} />
        </mesh>
      </group>
      <group ref={rightRef} position={[0.42 * config.bodyWidth, 0.5, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[armWidth, 0.3, 8, 16]} />
          <meshStandardMaterial color={config.secondary} metalness={0.4} roughness={0.3} />
        </mesh>
      </group>
    </>
  );
}

function RobotLegs({ config }: { config: RobotConfig }) {
  const legMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: config.primary,
    metalness: 0.4,
    roughness: 0.35,
  }), [config]);

  return (
    <group position={[0, -0.5, 0]}>
      <mesh position={[-0.14, -0.15, 0]} material={legMat}>
        <capsuleGeometry args={[0.07, 0.25, 8, 16]} />
      </mesh>
      <mesh position={[0.14, -0.15, 0]} material={legMat}>
        <capsuleGeometry args={[0.07, 0.25, 8, 16]} />
      </mesh>
      {/* Feet */}
      <mesh position={[-0.14, -0.38, 0.04]}>
        <boxGeometry args={[0.14, 0.06, 0.18]} />
        <meshStandardMaterial color={config.secondary} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0.14, -0.38, 0.04]}>
        <boxGeometry args={[0.14, 0.06, 0.18]} />
        <meshStandardMaterial color={config.secondary} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function RobotModel({ tutorId, isSpeaking, emotion = "idle" }: RobotModelProps) {
  const config = getRobotConfig(tutorId);
  const groupRef = useRef<THREE.Group>(null);
  const speakRef = useRef(0);
  const bobPhase = useRef(Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    bobPhase.current += delta * config.idleSpeed;
    groupRef.current.position.y = Math.sin(bobPhase.current) * 0.03;

    const tiltTarget = emotion === "thinking" ? -0.08 : emotion === "happy" ? 0.05 : 0;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tiltTarget + Math.sin(state.clock.elapsedTime * 0.5) * 0.01, delta * 2);
  });

  return (
    <group ref={groupRef}>
      <RobotHead config={config} isSpeaking={isSpeaking} speakRef={speakRef} />
      <RobotBody config={config} />
      <RobotArms config={config} isSpeaking={isSpeaking} emotion={emotion} />
      <RobotLegs config={config} />
    </group>
  );
}
