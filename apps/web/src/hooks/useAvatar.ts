"use client";

import { useState, useCallback } from "react";

type AvatarState = "idle" | "speaking" | "listening" | "thinking";

interface UseAvatarReturn {
  state: AvatarState;
  isIdle: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  isThinking: boolean;
  setIdle: () => void;
  setSpeaking: () => void;
  setListening: () => void;
  setThinking: () => void;
}

export function useAvatar(): UseAvatarReturn {
  const [state, setState] = useState<AvatarState>("idle");

  const setIdle = useCallback(() => setState("idle"), []);
  const setSpeaking = useCallback(() => setState("speaking"), []);
  const setListening = useCallback(() => setState("listening"), []);
  const setThinking = useCallback(() => setState("thinking"), []);

  return {
    state,
    isIdle: state === "idle",
    isSpeaking: state === "speaking",
    isListening: state === "listening",
    isThinking: state === "thinking",
    setIdle,
    setSpeaking,
    setListening,
    setThinking,
  };
}
