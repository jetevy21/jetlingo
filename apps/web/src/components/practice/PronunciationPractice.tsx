"use client";

import { useState } from "react";
import { usePronunciation, savePronunciationScore, getScoreHistory } from "@/hooks/usePronunciation";
import { Mic, Volume2, CheckCircle2, XCircle, TrendingUp, Clock } from "lucide-react";

interface Props {
  text: string;
  lessonId: string;
  stepIndex: number;
  language?: string;
  label?: string;
}

function scoreColor(s: number) {
  if (s >= 90) return "text-emerald-400";
  if (s >= 70) return "text-teal-400";
  if (s >= 50) return "text-amber-400";
  return "text-rose-400";
}

function scoreBg(s: number) {
  if (s >= 90) return "bg-emerald-500/20 border-emerald-500/30";
  if (s >= 70) return "bg-teal-500/20 border-teal-500/30";
  if (s >= 50) return "bg-amber-500/20 border-amber-500/30";
  return "bg-rose-500/20 border-rose-500/30";
}

function scoreLabel(s: number) {
  if (s >= 90) return "Excellent !";
  if (s >= 70) return "Bien !";
  if (s >= 50) return "Pas mal";
  return "À améliorer";
}

function WaveBars() {
  return (
    <div className="flex items-center gap-0.5 h-5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1 bg-rose-400 rounded-full"
          style={{
            animation: "wave 0.6s ease-in-out infinite alternate",
            animationDelay: `${i * 0.1}s`,
            height: "8px",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0% { height: 6px; }
          100% { height: 18px; }
        }
      `}</style>
    </div>
  );
}

export default function PronunciationPractice({ text, lessonId, stepIndex, language, label }: Props) {
  const { isRecording, isSupported, score, error, startRecording, stopRecording, clearScore } = usePronunciation();
  const [showHistory, setShowHistory] = useState(false);

  const history = getScoreHistory(lessonId, stepIndex);
  const best = history.length > 0 ? Math.max(...history.map((s) => s.score)) : 0;

  const speak = () => {
    window.speechSynthesis?.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = language === "en" ? "en-US" : "es-ES";
    u.rate = 0.7;
    window.speechSynthesis?.speak(u);
  };

  const handleMic = () => {
    if (isRecording) {
      stopRecording();
    } else {
      clearScore();
      startRecording(text);
    }
  };

  const displayText = text.length > 40 ? text.substring(0, 40) + "..." : text;

  return (
    <div className="p-3 bg-slate-700/30 rounded-xl mt-3">
      <div className="flex items-center gap-2 mb-2">
        {label && (
          <span className="text-[10px] px-1.5 py-0.5 bg-slate-600/50 text-slate-400 rounded font-medium">
            {label}
          </span>
        )}
        <span className="text-xs text-slate-500 italic truncate flex-1">&quot;{displayText}&quot;</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Listen button */}
        <button
          onClick={speak}
          className="p-2 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-colors flex-shrink-0"
          title="Écouter"
        >
          <Volume2 size={16} />
        </button>

        {/* Mic button */}
        <button
          onClick={handleMic}
          disabled={!isSupported}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isRecording
              ? "bg-rose-500/20 text-rose-400 border-2 border-rose-500/50"
              : "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20"
          }`}
        >
          {isRecording ? (
            <>
              <WaveBars />
              <span>Écoute...</span>
            </>
          ) : (
            <>
              <Mic size={16} />
              <span>{score ? "Réessayer" : "Répéter"}</span>
            </>
          )}
        </button>

        {/* History button */}
        {history.length > 0 && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 rounded-lg bg-slate-700/30 text-slate-400 hover:bg-slate-700/50 transition-colors flex-shrink-0"
          >
            <TrendingUp size={14} />
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-rose-400 mt-2">{error}</p>
      )}

      {/* Score */}
      {score && (
        <div className={`mt-3 p-3 rounded-xl border ${scoreBg(score.score)}`}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              {score.score >= 70 ? (
                <CheckCircle2 size={14} className="text-emerald-400" />
              ) : (
                <XCircle size={14} className="text-amber-400" />
              )}
              <span className={`font-bold ${scoreColor(score.score)}`}>{score.score}%</span>
            </div>
            <span className={`text-xs ${scoreColor(score.score)}`}>{scoreLabel(score.score)}</span>
          </div>
          <p className="text-xs text-slate-400">
            Vous: <span className="text-slate-300">&quot;{score.recognized}&quot;</span>
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => savePronunciationScore(lessonId, stepIndex, score)}
              className="flex-1 py-1.5 bg-teal-500/20 text-teal-400 rounded-lg text-xs font-medium hover:bg-teal-500/30"
            >
              Sauvegarder
            </button>
            <button
              onClick={handleMic}
              className="flex-1 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-medium hover:bg-purple-500/30"
            >
              Réessayer
            </button>
          </div>
        </div>
      )}

      {/* History */}
      {showHistory && history.length > 0 && (
        <div className="mt-2 p-2 bg-slate-800/50 rounded-lg">
          <p className="text-[10px] text-slate-500 mb-1">Historique</p>
          {history.slice().reverse().map((s, i) => (
            <div key={i} className="flex justify-between text-xs py-0.5">
              <span className="text-slate-500">{new Date(s.timestamp).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
              <span className={scoreColor(s.score)}>{s.score}%</span>
            </div>
          ))}
        </div>
      )}

      {!isSupported && (
        <p className="text-xs text-amber-400 mt-2">Utilisez Chrome ou Edge pour la prononciation.</p>
      )}
    </div>
  );
}
