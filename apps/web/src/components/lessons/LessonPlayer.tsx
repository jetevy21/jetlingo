"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lesson } from "@/types";
import { X, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
  onClose: () => void;
}

export default function LessonPlayer({ lesson, onComplete, onClose }: LessonPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      type: "introduction",
      title: "Introduction",
      content: `Welcome to "${lesson.title}". This lesson will help you improve your ${lesson.category.toLowerCase()} skills.`,
    },
    {
      type: "vocabulary",
      title: "New Vocabulary",
      content: "Learn these new words and phrases for this lesson.",
    },
    {
      type: "practice",
      title: "Practice",
      content: "Practice using what you've learned in conversation.",
    },
    {
      type: "quiz",
      title: "Quiz",
      content: "Test your knowledge with a quick quiz.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold text-white">{lesson.title}</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 h-1.5 rounded-full transition-colors",
                  i <= currentStep ? "bg-teal-500" : "bg-slate-700"
                )}
              />
            ))}
          </div>

          <div className="text-center mb-8">
            <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              {steps[currentStep].title}
            </h3>
            <p className="text-slate-400 text-lg">
              {steps[currentStep].content}
            </p>
          </div>

          {currentStep === steps.length - 1 && (
            <div className="mt-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <span className="text-emerald-400 font-medium">
                  Complete this step to finish the lesson
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border-t border-slate-700/50">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors",
            currentStep === 0
              ? "text-slate-500 cursor-not-allowed"
              : "text-slate-300 hover:bg-slate-800"
          )}
        >
          <ArrowLeft size={18} />
          Previous
        </button>

        <button
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
            } else {
              onComplete();
            }
          }}
          className="flex items-center gap-2 px-6 py-2 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-400 transition-colors"
        >
          {currentStep === steps.length - 1 ? "Complete" : "Next"}
          {currentStep < steps.length - 1 && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
