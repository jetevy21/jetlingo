"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { lessonsData, VocabularyItem, DialogueLine } from "@/data/lessons";
import { tutors, Tutor } from "@/data/tutors";
import { useAuthStore } from "@/stores/authStore";
import { useI18n } from "@/hooks/useI18n";
import { recordLessonCompletion } from "@/hooks/useProgress";
import Button from "@/components/ui/Button";
import PronunciationPractice from "@/components/practice/PronunciationPractice";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Volume2, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const RobotAvatar = dynamic(() => import("@/components/avatar3d/RobotAvatar"), {
  ssr: false,
  loading: () => <div className="w-[140px] h-[180px] bg-slate-800/30 rounded-2xl animate-pulse" />,
});

export default function LessonPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { t } = useI18n();
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showTutorTip, setShowTutorTip] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    setMounted(true);
    startTimeRef.current = Date.now();
    const completedLessons = JSON.parse(localStorage.getItem("jetlingo-completed-lessons") || "[]");
    if (completedLessons.includes(params?.id)) {
      setCompleted(true);
    }
  }, [params?.id]);

  useEffect(() => {
    setShowTutorTip(true);
  }, [currentStep]);

  const id = params?.id;
  const lesson = id ? lessonsData[id] : null;
  const tutor: Tutor | undefined = lesson ? tutors.find((t) => t.id === lesson.tutorId) : undefined;

  useEffect(() => {
    if (!mounted || !id || !lesson) return;

    const targetLang = user?.targetLanguage || "en";
    const lessonLang = lesson.language || (id.startsWith("en-") ? "en" : "es");

    if (targetLang === "en" && lessonLang === "es") {
      setRedirecting(true);
      const enId = `en-${id}`;
      if (lessonsData[enId]) {
        router.replace(`/dashboard/lessons/${enId}`);
      } else {
        router.replace("/dashboard/lessons");
      }
    } else if (targetLang === "es" && lessonLang === "en") {
      setRedirecting(true);
      const esId = id.replace("en-", "");
      if (lessonsData[esId]) {
        router.replace(`/dashboard/lessons/${esId}`);
      } else {
        router.replace("/dashboard/lessons");
      }
    }
  }, [id, mounted, router, user, lesson]);

  if (!mounted || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Leçon introuvable</h1>
          <p className="text-slate-400">Cette leçon n&apos;existe pas encore.</p>
          <Button onClick={() => router.push("/dashboard/lessons")}>
            Retour aux leçons
          </Button>
        </div>
      </div>
    );
  }

  const steps = lesson.steps;
  const step = steps[currentStep];
  const isFR = t.dashboard.startLesson === "Commencer la leçon";

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const questions = step.questions || [];
    if (index === questions[currentExercise]?.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNextExercise = () => {
    const questions = step.questions || [];
    if (currentExercise < questions.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      goToNextStep();
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentExercise(0);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const completedLessons = JSON.parse(localStorage.getItem("jetlingo-completed-lessons") || "[]");
      if (!completedLessons.includes(id)) {
        completedLessons.push(id);
        localStorage.setItem("jetlingo-completed-lessons", JSON.stringify(completedLessons));
      }

      // Always record activity
      const elapsed = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000));
      const totalQuestions = steps.reduce((acc, s) => acc + (s.questions?.length || 0), 0);
      const finalScore = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 100;
      recordLessonCompletion(id || "unknown", elapsed, finalScore);

      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentExercise(0);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = id.startsWith("en-") ? "en-US" : "es-ES";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (completed) {
    const totalQuestions = steps.reduce((acc, s) => acc + (s.questions?.length || 0), 0);
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-white">
            {isFR ? "Leçon terminée !" : "Lesson Complete!"}
          </h1>
          {tutor && (
            <div className="flex flex-col items-center gap-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <RobotAvatar
                tutorId={tutor.id}
                isSpeaking={false}
                emotion="happy"
                size="sm"
              />
              <div className="text-center">
                <p className="text-white font-medium">{tutor.name}</p>
                <p className="text-slate-400 text-sm">
                  {isFR ? "Félicitations ! Tu as terminé cette leçon." : "Congratulations! You completed this lesson."}
                </p>
              </div>
            </div>
          )}
          <p className="text-slate-400 text-lg">
            {isFR
              ? `Vous avez obtenu ${score}/${totalQuestions} bonnes réponses.`
              : `You scored ${score}/${totalQuestions}.`}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => router.push("/dashboard/lessons")}>
              {isFR ? "Retour aux leçons" : "Back to Lessons"}
            </Button>
            <Button onClick={() => {
              setCurrentStep(0);
              setCurrentExercise(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setScore(0);
              setCompleted(false);
            }}>
              {isFR ? "Recommencer" : "Retry"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/dashboard/lessons")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">{isFR ? "Retour" : "Back"}</span>
        </button>
        <span className="text-sm text-slate-400">
          {isFR ? `Étape ${currentStep + 1}/${steps.length}` : `Step ${currentStep + 1}/${steps.length}`}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full transition-colors ${
              i < currentStep ? "bg-emerald-500" : i === currentStep ? "bg-teal-500" : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      {/* Tutor banner with robot */}
      {tutor && (
        <div className={`p-4 rounded-2xl border mb-6 transition-all ${
          tutor.color === "teal" ? "bg-teal-500/10 border-teal-500/20" :
          tutor.color === "rose" ? "bg-rose-500/10 border-rose-500/20" :
          tutor.color === "amber" ? "bg-amber-500/10 border-amber-500/20" :
          tutor.color === "purple" ? "bg-purple-500/10 border-purple-500/20" :
          tutor.color === "emerald" ? "bg-emerald-500/10 border-emerald-500/20" :
          "bg-slate-500/10 border-slate-500/20"
        }`}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <RobotAvatar
                tutorId={tutor.id}
                isSpeaking={false}
                emotion={completed ? "happy" : currentStep === 0 ? "idle" : "explaining"}
                size="sm"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`font-medium ${
                  tutor.color === "teal" ? "text-teal-400" :
                  tutor.color === "rose" ? "text-rose-400" :
                  tutor.color === "amber" ? "text-amber-400" :
                  tutor.color === "purple" ? "text-purple-400" :
                  tutor.color === "emerald" ? "text-emerald-400" :
                  "text-slate-400"
                }`}>{tutor.name}</p>
                <span className="text-xs text-slate-500">{tutor.role}</span>
              </div>
              {step.tutorTip && showTutorTip && (
                <div className="mt-2 flex items-start gap-2">
                  <Sparkles size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-300">{step.tutorTip}</p>
                </div>
              )}
            </div>
            {step.tutorTip && (
              <button
                onClick={() => setShowTutorTip(!showTutorTip)}
                className="text-slate-500 hover:text-slate-300 transition-colors text-xs"
              >
                {showTutorTip ? "−" : "+"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step title */}
      <div className="mb-4">
        <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs font-medium">
          {step.title}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        {step.content && (
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 mb-6">
            <p className="text-lg text-slate-300 leading-relaxed">{step.content}</p>
          </div>
        )}

        {step.type === "vocabulary" && step.items && (
          <div className="space-y-4">
            {step.items.map((item: VocabularyItem, i: number) => (
              <div key={i} className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => speak(item.word)}
                    className="mt-1 p-2 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-colors flex-shrink-0"
                  >
                    <Volume2 size={16} />
                  </button>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{item.word}</h3>
                    <p className="text-teal-400 text-sm">{item.translation}</p>
                    <p className="text-slate-500 text-xs mt-0.5">[{item.pronunciation}]</p>
                    <div className="mt-3 p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-sm text-slate-300 italic">&quot;{item.example}&quot;</p>
                      <p className="text-xs text-slate-500 mt-1">{item.exampleTranslation}</p>
                    </div>
                  </div>
                </div>
                {/* Word pronunciation */}
                <PronunciationPractice
                  text={item.word}
                  lessonId={id || "unknown"}
                  stepIndex={currentStep * 100 + i}
                  language={lesson.language || (id?.startsWith("en-") ? "en" : "es")}
                  label={isFR ? "Mot" : "Word"}
                />
                {/* Example sentence pronunciation */}
                <PronunciationPractice
                  text={item.example}
                  lessonId={id || "unknown"}
                  stepIndex={currentStep * 100 + i + 50}
                  language={lesson.language || (id?.startsWith("en-") ? "en" : "es")}
                  label={isFR ? "Exemple" : "Example"}
                />
              </div>
            ))}
          </div>
        )}

        {step.type === "dialogue" && step.dialogue && (
          <div className="space-y-4">
            {/* Legend explanation */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-xs font-bold">
                  📖 {isFR ? "À lire attentivement" : "Read Carefully"}
                </span>
                <button
                  onClick={() => {
                    const legendText = isFR
                      ? "Légende des badges. Q signifie Question. A signifie Réponse. Les dialogues suivent un ordre : d'abord la question, puis la réponse. Ecoutez bien la prononciation."
                      : "Badge legend. Q stands for Question. A stands for Answer. Dialogues follow an order: first the question, then the answer. Listen carefully to the pronunciation.";
                    speak(legendText);
                  }}
                  className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors"
                >
                  <Volume2 size={14} />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold">Q1</span>
                  <span className="text-slate-300">= {isFR ? "Question" : "Question"}</span>
                </div>
                <span className="text-slate-600">→</span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold">A1</span>
                  <span className="text-slate-300">= {isFR ? "Réponse" : "Answer"}</span>
                </div>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 text-xs">
                  {isFR
                    ? "Les échanges suivent l'ordre : Q1→A1, Q2→A2..."
                    : "Exchanges follow order: Q1→A1, Q2→A2..."}
                </span>
              </div>
            </div>

            {step.dialogue.map((line: DialogueLine, i: number) => {
              const isUser = line.speaker === "Client" || line.speaker === "Touriste" || line.speaker === "Customer";
              const pairIndex = Math.floor(i / 2) + 1;
              const isQuestion = i % 2 === 0;
              return (
                <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl ${
                    isUser
                      ? "bg-teal-500/10 border border-teal-500/20"
                      : "bg-slate-800/50 border border-slate-700/50"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                        isQuestion
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}>
                        {isQuestion ? `Q${pairIndex}` : `A${pairIndex}`}
                      </span>
                      <p className="text-xs text-slate-500 font-medium">{line.speaker}</p>
                    </div>
                    <button
                      onClick={() => speak(line.text)}
                      className="text-left hover:bg-slate-700/30 rounded-lg p-1 -m-1 transition-colors"
                    >
                      <p className="text-white">{line.text}</p>
                    </button>
                    <p className="text-sm text-slate-400 mt-1">{line.translation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {(step.type === "exercise" || step.type === "quiz") && step.questions && (
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <p className="text-xs text-slate-500 mb-2">
              {isFR ? `Question ${currentExercise + 1}/${step.questions.length}` : `Question ${currentExercise + 1}/${step.questions.length}`}
            </p>
            <h3 className="text-lg font-semibold text-white mb-4">
              {step.questions[currentExercise].question}
            </h3>
            <div className="space-y-2">
              {step.questions[currentExercise].options.map((option: string, i: number) => {
                let classes = "w-full text-left p-4 rounded-xl border transition-all ";
                if (showResult) {
                  if (i === step.questions![currentExercise].correctIndex) {
                    classes += "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                  } else if (i === selectedAnswer) {
                    classes += "bg-rose-500/10 border-rose-500/30 text-rose-400";
                  } else {
                    classes += "bg-slate-700/20 border-slate-700/20 text-slate-500";
                  }
                } else {
                  classes += "bg-slate-700/30 border-slate-600/30 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500/50 cursor-pointer";
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={showResult} className={classes}>
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-medium flex-shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {showResult && (
              <div className={`mt-4 p-4 rounded-xl ${
                selectedAnswer === step.questions[currentExercise].correctIndex
                  ? "bg-emerald-500/10 border border-emerald-500/20"
                  : "bg-rose-500/10 border border-rose-500/20"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {selectedAnswer === step.questions[currentExercise].correctIndex ? (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  ) : (
                    <XCircle size={16} className="text-rose-400" />
                  )}
                  <span className={`text-sm font-medium ${
                    selectedAnswer === step.questions[currentExercise].correctIndex
                      ? "text-emerald-400"
                      : "text-rose-400"
                  }`}>
                    {selectedAnswer === step.questions[currentExercise].correctIndex
                      ? (isFR ? "Correct !" : "Correct!")
                      : (isFR ? "Incorrect" : "Incorrect")}
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  {step.questions[currentExercise].explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
            currentStep === 0
              ? "text-slate-500 cursor-not-allowed"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          <ArrowLeft size={18} />
          {isFR ? "Précédent" : "Previous"}
        </button>

        {(step.type === "exercise" || step.type === "quiz") ? (
          <Button onClick={handleNextExercise} disabled={!showResult}>
            {currentExercise < (step.questions?.length || 0) - 1
              ? (isFR ? "Question suivante" : "Next Question")
              : currentStep < steps.length - 1
              ? (isFR ? "Étape suivante" : "Next Step")
              : (isFR ? "Terminer la leçon" : "Complete Lesson")}
            <ArrowRight size={18} className="ml-2" />
          </Button>
        ) : (
          <Button onClick={goToNextStep}>
            {currentStep < steps.length - 1
              ? (isFR ? "Suivant" : "Next")
              : (isFR ? "Terminer la leçon" : "Complete Lesson")}
            <ArrowRight size={18} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
