"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RobotModel from "./RobotModel";
import { getRobotConfig } from "@/data/robotConfigs";

interface RobotSceneProps {
  tutorId: string;
  isSpeaking: boolean;
  emotion?: "idle" | "happy" | "thinking" | "explaining";
}

export default function RobotScene({ tutorId, isSpeaking, emotion = "idle" }: RobotSceneProps) {
  const config = getRobotConfig(tutorId);

  return (
    <Canvas
      camera={{ position: [0, 0.6, 2.8], fov: 35 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 1.5, 2]} intensity={0.4} color={config.accent} distance={4} />

      <RobotModel tutorId={tutorId} isSpeaking={isSpeaking} emotion={emotion} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
        target={[0, 0.4, 0]}
      />
    </Canvas>
  );
}
