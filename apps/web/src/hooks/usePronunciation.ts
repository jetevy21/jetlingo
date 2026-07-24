"use client";

import { useState, useRef, useCallback } from "react";

interface PronunciationScore {
  text: string;
  recognized: string;
  score: number;
  timestamp: number;
}

interface UsePronunciationReturn {
  isRecording: boolean;
  isSupported: boolean;
  score: PronunciationScore | null;
  error: string | null;
  startRecording: (targetText: string) => void;
  stopRecording: () => void;
  clearScore: () => void;
}

function calculateSimilarity(target: string, recognized: string): number {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();

  const t = normalize(target);
  const r = normalize(recognized);

  if (!t || !r) return 0;
  if (t === r) return 100;

  const m = t.length;
  const n = r.length;
  const dp: number[][] = [];
  for (let i = 0; i <= m; i++) dp[i] = [i];
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        t[i - 1] === r[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  const dist = dp[m][n];
  const maxLen = Math.max(m, n);
  return Math.round(((maxLen - dist) / maxLen) * 100);
}

export function usePronunciation(): UsePronunciationReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<PronunciationScore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<any>(null);
  const targetRef = useRef("");
  const doneRef = useRef(false);

  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const stopRec = useCallback(() => {
    if (recRef.current) {
      try { recRef.current.stop(); } catch {}
      recRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const startRecording = useCallback(
    (targetText: string) => {
      if (!isSupported) {
        setError("Utilisez Chrome ou Edge.");
        return;
      }

      // Always clean up previous
      stopRec();
      setError(null);
      setScore(null);
      targetRef.current = targetText;
      doneRef.current = false;

      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) { setError("API non disponible."); return; }

      const rec = new SR();
      const isEnglish = /^[a-zA-Z\s]+$/.test(targetText);
      rec.lang = isEnglish ? "en-US" : "es-ES";
      rec.continuous = false;
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setIsRecording(true);
      };

      rec.onresult = (e: any) => {
        if (doneRef.current) return;
        doneRef.current = true;

        const transcript = e.results[0][0].transcript;
        const confidence = e.results[0][0].confidence || 0.8;
        const sim = calculateSimilarity(targetRef.current, transcript);
        const final = Math.min(100, Math.max(0, Math.round(sim * 0.7 + confidence * 100 * 0.3)));

        setScore({
          text: targetRef.current,
          recognized: transcript,
          score: final,
          timestamp: Date.now(),
        });
        setIsRecording(false);
      };

      rec.onerror = (e: any) => {
        if (doneRef.current) return;
        doneRef.current = true;

        if (e.error === "no-speech") {
          setError("Aucun son. Parlez plus fort.");
        } else if (e.error === "not-allowed") {
          setError("Micro bloqué. Activez-le dans le navigateur.");
        } else if (e.error === "network") {
          setError("Erreur réseau. Vérifiez votre connexion.");
        } else if (e.error !== "aborted") {
          setError("Erreur. Réessayez.");
        }
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recRef.current = rec;

      // Small delay to ensure previous instance is fully stopped
      setTimeout(() => {
        try {
          rec.start();
        } catch (e) {
          setError("Erreur de micro. Réessayez.");
          setIsRecording(false);
        }
      }, 100);
    },
    [isSupported, stopRec]
  );

  const stopRecording = useCallback(() => {
    stopRec();
  }, [stopRec]);

  const clearScore = useCallback(() => {
    setScore(null);
    setError(null);
  }, []);

  return { isRecording, isSupported, score, error, startRecording, stopRecording, clearScore };
}

export function savePronunciationScore(lessonId: string, stepIndex: number, score: PronunciationScore) {
  const key = `jetlingo-pronunciation-${lessonId}`;
  const all: Record<number, PronunciationScore[]> = JSON.parse(localStorage.getItem(key) || "{}");
  if (!all[stepIndex]) all[stepIndex] = [];
  all[stepIndex].push(score);
  localStorage.setItem(key, JSON.stringify(all));
}

export function getScoreHistory(lessonId: string, stepIndex: number): PronunciationScore[] {
  const key = `jetlingo-pronunciation-${lessonId}`;
  const all: Record<number, PronunciationScore[]> = JSON.parse(localStorage.getItem(key) || "{}");
  return all[stepIndex] || [];
}
