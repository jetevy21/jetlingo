"use client";

import RobotAvatarCSS from "./RobotAvatarCSS";

interface Props {
  tutorId: string;
  isSpeaking?: boolean;
  emotion?: "idle" | "happy" | "thinking" | "explaining";
  size?: "sm" | "md" | "lg";
}

export default function RobotAvatar({ tutorId, isSpeaking = false, emotion = "idle", size = "md" }: Props) {
  return <RobotAvatarCSS tutorId={tutorId} isSpeaking={isSpeaking} emotion={emotion} size={size} />;
}
