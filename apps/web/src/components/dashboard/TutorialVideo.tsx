"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Gauge, SkipForward } from "lucide-react";

interface TutorialStep {
  title: string;
  description: string;
  highlight?: string;
  color: string;
  screen: "welcome" | "dashboard" | "lessons" | "practice" | "stats" | "settings" | "done";
}

const tutorialSteps: Record<string, TutorialStep[]> = {
  en: [
    { title: "Welcome to JetLingo!", description: "Learn any language with AI-powered tutors, interactive lessons, and real-time feedback.", color: "from-teal-400 to-cyan-500", screen: "welcome" },
    { title: "Your Dashboard", description: "Track your streak, minutes learned, and words acquired — all in one place.", highlight: "stats", color: "from-blue-400 to-indigo-500", screen: "dashboard" },
    { title: "Daily Lesson", description: "Each day, a new lesson tailored to your level awaits. Click to start learning!", highlight: "lesson", color: "from-purple-400 to-violet-500", screen: "dashboard" },
    { title: "Language Lessons", description: "Browse all available lessons. Filter by category: Grammar, Vocabulary, Conversation, and more.", highlight: "lessons", color: "from-violet-400 to-purple-500", screen: "lessons" },
    { title: "AI Conversation", description: "Practice speaking with AI tutors. Get instant feedback on grammar and pronunciation.", highlight: "chat", color: "from-rose-400 to-pink-500", screen: "practice" },
    { title: "Your Progress", description: "See detailed statistics: total minutes, words learned, streaks, and skill breakdown.", highlight: "chart", color: "from-amber-400 to-orange-500", screen: "stats" },
    { title: "Settings", description: "Customize your experience: change language, upload avatar, adjust audio settings.", highlight: "avatar", color: "from-emerald-400 to-green-500", screen: "settings" },
    { title: "You're Ready!", description: "Start your language journey today. Just 5 minutes a day makes a real difference!", color: "from-teal-400 to-emerald-500", screen: "done" },
  ],
  fr: [
    { title: "Bienvenue sur JetLingo!", description: "Apprenez n'importe quelle langue avec des tuteurs IA, des leçons interactives et des corrections en temps réel.", color: "from-teal-400 to-cyan-500", screen: "welcome" },
    { title: "Votre Tableau de Bord", description: "Suivez votre série, vos minutes d'apprentissage et vos mots acquis — tout au même endroit.", highlight: "stats", color: "from-blue-400 to-indigo-500", screen: "dashboard" },
    { title: "Leçon du Jour", description: "Chaque jour, une nouvelle leçon adaptée à votre niveau vous attend. Cliquez pour commencer!", highlight: "lesson", color: "from-purple-400 to-violet-500", screen: "dashboard" },
    { title: "Leçons de Langues", description: "Parcourez toutes les leçons disponibles. Filtrez par catégorie: Grammaire, Vocabulaire, Conversation...", highlight: "lessons", color: "from-violet-400 to-purple-500", screen: "lessons" },
    { title: "Conversation IA", description: "Pratiquez l'oral avec des tuteurs IA. Obtenez des corrections instantanées sur la grammaire et la prononciation.", highlight: "chat", color: "from-rose-400 to-pink-500", screen: "practice" },
    { title: "Vos Progrès", description: "Consultez vos statistiques: minutes totales, mots appris, séries et répartition des compétences.", highlight: "chart", color: "from-amber-400 to-orange-500", screen: "stats" },
    { title: "Paramètres", description: "Personnalisez votre expérience: changez de langue, uploadez un avatar, ajustez les paramètres audio.", highlight: "avatar", color: "from-emerald-400 to-green-500", screen: "settings" },
    { title: "Vous êtes Prêt!", description: "Commencez votre voyage linguistique aujourd'hui. Même 5 minutes par jour font une vraie différence!", color: "from-teal-400 to-emerald-500", screen: "done" },
  ],
  es: [
    { title: "¡Bienvenido a JetLingo!", description: "Aprende cualquier idioma con tutores IA, lecciones interactivas y correcciones en tiempo real.", color: "from-teal-400 to-cyan-500", screen: "welcome" },
    { title: "Tu Panel de Control", description: "Sigue tu racha, minutos de estudio y palabras adquiridas — todo en un solo lugar.", highlight: "stats", color: "from-blue-400 to-indigo-500", screen: "dashboard" },
    { title: "Lección del Día", description: "Cada día, una nueva lección adaptada a tu nivel te espera. ¡Haz clic para empezar!", highlight: "lesson", color: "from-purple-400 to-violet-500", screen: "dashboard" },
    { title: "Lecciones de Idiomas", description: "Explora todas las lecciones disponibles. Filtra por categoría: Gramática, Vocabulario, Conversación...", highlight: "lessons", color: "from-violet-400 to-purple-500", screen: "lessons" },
    { title: "Conversación con IA", description: "Practica hablando con tutores IA. Recibe correcciones instantáneas de gramática y pronunciación.", highlight: "chat", color: "from-rose-400 to-pink-500", screen: "practice" },
    { title: "Tu Progreso", description: "Consulta tus estadísticas: minutos totales, palabras aprendidas, rachas y habilidades.", highlight: "chart", color: "from-amber-400 to-orange-500", screen: "stats" },
    { title: "Configuración", description: "Personaliza tu experiencia: cambia de idioma, sube un avatar, ajusta los ajustes de audio.", highlight: "avatar", color: "from-emerald-400 to-green-500", screen: "settings" },
    { title: "¡Estás Listo!", description: "Empieza tu viaje lingüístico hoy. ¡Incluso 5 minutos al día marcan una gran diferencia!", color: "from-teal-400 to-emerald-500", screen: "done" },
  ],
};

/* ── Mock Screens ── */
function PhoneScreen({ step, lang }: { step: TutorialStep; lang: string }) {
  if (!step) return <div className="w-full h-full bg-slate-800" />;
  const isFR = lang === "fr";
  const hl = step.highlight;

  return (
    <div className="relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden border border-slate-600/50">
      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/80">
        <span className="text-[10px] text-slate-400">9:41</span>
        <div className="w-16 h-4 bg-slate-900 rounded-full" />
        <div className="flex gap-1">
          <div className="w-3 h-2 bg-slate-400 rounded-sm" />
          <div className="w-1 h-2 bg-slate-400 rounded-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 space-y-2">
        {step.screen === "welcome" && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/30 animate-bounce">✈</div>
            <p className="text-white font-bold text-sm">JetLingo</p>
            <p className="text-slate-400 text-[10px]">{isFR ? "Apprenez, pratiquez, maîtrisez." : "Learn, practice, master."}</p>
            <div className="w-full h-7 bg-teal-500 rounded-lg flex items-center justify-center text-white text-[10px] font-medium mt-2">
              {isFR ? "Commencer gratuitement" : "Start Free"}
            </div>
          </div>
        )}

        {step.screen === "dashboard" && (
          <div className="space-y-2">
            <p className="text-white text-[10px] font-bold">{isFR ? "Bon retour" : "Welcome back"}, User 👋</p>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: isFR ? "Minutes" : "Minutes", val: "12", bg: "bg-teal-500/20", border: "border-teal-500/30", active: hl === "stats" },
                { label: isFR ? "Mots" : "Words", val: "48", bg: "bg-amber-500/20", border: "border-amber-500/30", active: hl === "stats" },
                { label: isFR ? "Série" : "Streak", val: "5j", bg: "bg-purple-500/20", border: "border-purple-500/30", active: hl === "stats" },
              ].map((s, i) => (
                <div key={i} className={`p-2 rounded-lg ${s.bg} border ${s.border} ${s.active ? "ring-2 ring-white/50 scale-105" : ""} transition-all`}>
                  <p className="text-[8px] text-slate-400">{s.label}</p>
                  <p className="text-white text-sm font-bold">{s.val}</p>
                </div>
              ))}
            </div>
            <div className={`p-2.5 bg-slate-700/50 rounded-xl border ${hl === "lesson" ? "border-teal-400 ring-2 ring-teal-400/30" : "border-slate-600/50"} transition-all`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm">📖</div>
                <div>
                  <p className="text-white text-[10px] font-medium">{isFR ? "Leçon du jour" : "Daily Lesson"}</p>
                  <p className="text-slate-400 text-[8px]">{isFR ? "10 min · Conversation" : "10 min · Conversation"}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { icon: "🎯", label: isFR ? "Pratique" : "Practice" },
                { icon: "📚", label: isFR ? "Leçons" : "Lessons" },
                { icon: "📈", label: isFR ? "Stats" : "Stats" },
                { icon: "⚙️", label: isFR ? "Réglages" : "Settings" },
              ].map((item, i) => (
                <div key={i} className="p-2 bg-slate-700/30 rounded-lg flex items-center gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-[9px] text-slate-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step.screen === "lessons" && (
          <div className="space-y-2">
            <p className="text-white text-[10px] font-bold">{isFR ? "Parcours d'apprentissage" : "Learning Path"}</p>
            <div className="flex gap-1 overflow-hidden">
              {[isFR ? "Tous" : "All", isFR ? "Grammaire" : "Grammar", isFR ? "Vocab" : "Vocab", isFR ? "Conv." : "Conv."].map((cat, i) => (
                <span key={i} className={`px-2 py-0.5 rounded-full text-[8px] whitespace-nowrap ${i === 0 ? "bg-teal-500 text-white" : "bg-slate-700 text-slate-400"}`}>{cat}</span>
              ))}
            </div>
            <div className="space-y-1.5">
              {[
                { title: isFR ? "Anglais pour débutants" : "English for Beginners", done: true, color: "bg-emerald-500" },
                { title: isFR ? "Salutations" : "Greetings", done: true, color: "bg-emerald-500" },
                { title: isFR ? "Verbes au présent" : "Present Tense", done: false, current: hl === "lessons", color: "bg-teal-500" },
                { title: isFR ? "Commander au resto" : "Ordering Food", done: false, color: "bg-slate-600" },
              ].map((l, i) => (
                <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${l.current ? "bg-slate-700/80 border border-teal-400 ring-1 ring-teal-400/30" : "bg-slate-700/30"} transition-all`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${l.color} text-white text-[8px]`}>{l.done ? "✓" : i + 1}</div>
                  <p className="text-white text-[9px]">{l.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step.screen === "practice" && (
          <div className="space-y-2">
            <p className="text-white text-[10px] font-bold">{isFR ? "Conversation" : "Practice"}</p>
            <div className="space-y-2">
              {[
                { from: "Emma", msg: isFR ? "Bonjour! Comment ça va aujourd'hui?" : "Hey! How are you today?", avatar: "👩‍🏫", isAI: true },
                { from: "You", msg: isFR ? "Ça va bien, merci!" : "I'm doing great, thanks!", avatar: "👤", isAI: false },
                { from: "Emma", msg: isFR ? "Super! Prêt pour une nouvelle leçon?" : "Awesome! Ready for a new lesson?", avatar: "👩‍🏫", isAI: true, glow: hl === "chat" },
              ].map((m, i) => (
                <div key={i} className={`flex gap-1.5 ${m.isAI ? "" : "flex-row-reverse"}`}>
                  <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-[10px] flex-shrink-0">{m.avatar}</div>
                  <div className={`px-2 py-1.5 rounded-xl max-w-[75%] text-[9px] ${m.isAI ? "bg-slate-700 text-white" : "bg-teal-500 text-white"} ${m.glow ? "ring-2 ring-white/40" : ""} transition-all`}>
                    {m.msg}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex-1 h-7 bg-slate-700/50 rounded-full px-3 flex items-center">
                <span className="text-slate-500 text-[9px]">{isFR ? "Écrivez un message..." : "Type a message..."}</span>
              </div>
              <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-[10px]">➤</div>
            </div>
          </div>
        )}

        {step.screen === "stats" && (
          <div className="space-y-2">
            <p className="text-white text-[10px] font-bold">{isFR ? "Statistiques" : "Statistics"}</p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: isFR ? "Minutes totales" : "Total Minutes", val: "124", icon: "⏱️" },
                { label: isFR ? "Mots appris" : "Words Learned", val: "89", icon: "📖" },
                { label: isFR ? "Sessions" : "Sessions", val: "23", icon: "💬" },
                { label: isFR ? "Série actuelle" : "Current Streak", val: "5j", icon: "🔥" },
              ].map((s, i) => (
                <div key={i} className={`p-2 bg-slate-700/30 rounded-lg ${hl === "chart" && i === 0 ? "ring-2 ring-teal-400" : ""} transition-all`}>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">{s.icon}</span>
                    <span className="text-slate-400 text-[7px]">{s.label}</span>
                  </div>
                  <p className="text-white text-sm font-bold">{s.val}</p>
                </div>
              ))}
            </div>
            <div className="p-2 bg-slate-700/30 rounded-lg">
              <p className="text-slate-400 text-[8px] mb-1">{isFR ? "Progrès hebdomadaire" : "Weekly Progress"}</p>
              <div className="flex items-end gap-1 h-12">
                {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                  <span key={i} className="text-[7px] text-slate-500 flex-1 text-center">{d}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {step.screen === "settings" && (
          <div className="space-y-2">
            <p className="text-white text-[10px] font-bold">{isFR ? "Paramètres" : "Settings"}</p>
            <div className="flex items-center gap-2 p-2 bg-slate-700/30 rounded-lg">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold ${hl === "avatar" ? "ring-2 ring-white/60 ring-offset-2 ring-offset-slate-800" : ""} transition-all`}>U</div>
              <div>
                <p className="text-white text-[10px] font-medium">User</p>
                <p className="text-slate-400 text-[8px]">user@email.com</p>
              </div>
            </div>
            <div className="space-y-1">
              {[
                { icon: "👤", label: isFR ? "Profil" : "Profile" },
                { icon: "🌍", label: isFR ? "Langue cible" : "Target Language" },
                { icon: "🔊", label: isFR ? "Paramètres audio" : "Audio Settings" },
                { icon: "🔒", label: isFR ? "Changer le mot de passe" : "Change Password" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-slate-700/20 rounded-lg">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-white text-[9px]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step.screen === "done" && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <div className="text-4xl animate-bounce">🎉</div>
            <p className="text-white font-bold text-sm">{isFR ? "C'est parti!" : "Let's Go!"}</p>
            <p className="text-slate-400 text-[9px]">{isFR ? "Votre aventure commence maintenant." : "Your adventure starts now."}</p>
            <div className="w-full h-7 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-lg shadow-teal-500/30">
              {isFR ? "Commencer" : "Start Learning"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface TutorialVideoProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
}

const speeds = [0.5, 1, 1.5, 2];

export default function TutorialVideo({ isOpen, onClose, language = "en" }: TutorialVideoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [slideDir, setSlideDir] = useState<"next" | "prev">("next");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const steps = tutorialSteps[language] || tutorialSteps.en;
  const step = steps[Math.min(currentStep, steps.length - 1)];
  const speed = speeds[speedIdx];

  const goNext = useCallback(() => {
    setSlideDir("next");
    if (currentStep < steps.length - 1) {
      setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentStep, steps.length, onClose]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setSlideDir("prev");
      setCurrentStep((p) => p - 1);
      setProgress(0);
    }
  }, [currentStep]);

  // Auto-advance
  useEffect(() => {
    if (!isOpen || !isPlaying) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { goNext(); return 0; }
        return p + (2 * speed);
      });
    }, 100);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isOpen, isPlaying, goNext, speed]);

  // Keyboard
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      if (e.key === " ") { e.preventDefault(); setIsPlaying(true); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "Escape") onClose();
      if (e.key === "m" || e.key === "M") setIsMuted((p) => !p);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, goNext, goPrev, onClose]);

  // Reset on open
  useEffect(() => {
    if (isOpen) { setCurrentStep(0); setProgress(0); setIsPlaying(true); setSpeedIdx(1); }
  }, [isOpen]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  if (!isOpen || !step) return null;

  const overallPct = ((currentStep * 100 + progress) / (steps.length * 100)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl bg-slate-900/95 rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">

        {/* Left: Phone Mockup */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-gradient-to-br from-slate-800 to-slate-900 min-h-[300px] md:min-h-[500px]">
          <div className="relative w-48 md:w-56 aspect-[9/19] bg-black rounded-[2rem] border-2 border-slate-600 p-1 shadow-2xl">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
            <div className="w-full h-full bg-slate-800 rounded-[1.6rem] overflow-hidden">
              <PhoneScreen step={step} lang={language} />
            </div>
          </div>
        </div>

        {/* Right: Info + Controls */}
        <div className="flex flex-col w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-700/50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <span className="text-lg">✈️</span>
              <span className="text-sm font-semibold text-white">JetLingo</span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Step Info */}
          <div className="flex-1 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                {currentStep + 1}
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {language === "fr" ? `Étape ${currentStep + 1} sur ${steps.length}` : `Step ${currentStep + 1} of ${steps.length}`}
                </p>
                <h3 className="text-white font-bold text-base leading-tight">{step.title}</h3>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
          </div>

          {/* Progress bar */}
          <div className="px-5">
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-100" style={{ width: `${overallPct}%` }} />
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <button onClick={() => setIsMuted(!isMuted)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div className="flex items-center gap-2">
                <button onClick={goPrev} disabled={currentStep === 0} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors disabled:opacity-30">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all active:scale-95">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </button>
                <button onClick={goNext} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>

              <button onClick={() => setSpeedIdx((p) => (p + 1) % speeds.length)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors relative" title={`${speed}x`}>
                <Gauge size={18} />
                <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold text-teal-400">{speed}x</span>
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-1.5">
              {steps.map((_, i) => (
                <button key={i} onClick={() => { setSlideDir(i > currentStep ? "next" : "prev"); setCurrentStep(i); setProgress(0); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? "bg-teal-400 w-5" : i < currentStep ? "bg-teal-500/40 w-1.5" : "bg-slate-600 w-1.5"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}