"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseRobotSpeechReturn {
  isSpeaking: boolean;
  speak: (text: string, lang?: string) => void;
  stop: () => void;
}

export function useRobotSpeech(): UseRobotSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    utteranceRef.current = null;
  }, []);

  const speak = useCallback(
    (text: string, lang: string = "es-ES") => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      stop();

      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = 0.8;
      u.pitch = 1;

      u.onstart = () => setIsSpeaking(true);
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);

      utteranceRef.current = u;
      window.speechSynthesis.speak(u);
    },
    [stop]
  );

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { isSpeaking, speak, stop };
}
