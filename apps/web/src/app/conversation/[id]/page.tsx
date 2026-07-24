"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Message, Avatar } from "@/types";
import ChatBubble from "@/components/conversation/ChatBubble";
import MessageInput from "@/components/conversation/MessageInput";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import FeedbackPanel from "@/components/conversation/FeedbackPanel";
import TranscriptView from "@/components/conversation/TranscriptView";
import { useAvatar } from "@/hooks/useAvatar";
import { generateId } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { getUser } from "@/lib/auth";

const languageAvatars: Record<string, { name: string; language: string; accent: string; backstory: string; greeting: string; responses: string[] }> = {
  en: {
    name: "Emma",
    language: "English",
    accent: "American",
    backstory: "A native English speaker from New York",
    greeting: "Hi there! I'm Emma, your English conversation partner. How can I help you practice today?",
    responses: [
      "Excellent! That's a great sentence. Let me help you improve it a bit.",
      "Good try! I notice a small grammar issue. Let me explain...",
      "Perfect! Your pronunciation is getting better every day.",
      "That's interesting! Can you tell me more about that?",
      "I understand what you're saying. Here's a more natural way to express that...",
    ],
  },
  es: {
    name: "Elena",
    language: "Spanish",
    accent: "Latin American",
    backstory: "A native Spanish speaker from Mexico City",
    greeting: "¡Hola! I'm Elena, your Spanish conversation partner. How can I help you practice today?",
    responses: [
      "¡Excelente! That's a great sentence. Let me help you improve it a bit.",
      "Good try! I notice a small grammar issue. Let me explain...",
      "¡Perfecto! Your pronunciation is getting better every day.",
      "That's interesting! Can you tell me more about that?",
      "I understand what you're saying. Here's a more natural way to express that...",
    ],
  },
  fr: {
    name: "Sophie",
    language: "French",
    accent: "Parisian",
    backstory: "A native French speaker from Paris",
    greeting: "Bonjour ! I'm Sophie, your French conversation partner. How can I help you practice today?",
    responses: [
      "Excellent ! That's a great sentence. Let me help you improve it a bit.",
      "Good try! I notice a small grammar issue. Let me explain...",
      "Parfait ! Your pronunciation is getting better every day.",
      "That's interesting! Can you tell me more about that?",
      "I understand what you're saying. Here's a more natural way to express that...",
    ],
  },
};

export default function ConversationPage() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<Message | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const avatar = useAvatar();
  const { user } = useAuthStore();
  const targetLang = user?.targetLanguage || getUser()?.targetLanguage || "en";
  const avatarConfig = languageAvatars[targetLang] || languageAvatars.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: avatarConfig.greeting,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    avatar.setThinking();

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses = avatarConfig.responses;

    const aiMessage: Message = {
      id: generateId(),
      role: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      feedback: {
        grammarScore: Math.floor(Math.random() * 30) + 70,
        pronunciationScore: Math.floor(Math.random() * 30) + 70,
        suggestions: [
          "Try using the subjunctive mood here",
          "Your accent is very clear!",
        ],
      },
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
    avatar.setSpeaking();

    setTimeout(() => {
      avatar.setIdle();
    }, 2000);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      avatar.setListening();
    } else {
      avatar.setIdle();
    }
  };

  const handleEndSession = () => {
    router.push("/dashboard");
  };

  return (
    <div className="h-screen flex flex-col bg-navy-950">
      <ConversationHeader
        avatarName={avatarConfig.name}
        mode="free talk"
        onBack={handleEndSession}
        onEndSession={handleEndSession}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 flex justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {avatarConfig.name[0]}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {avatarConfig.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {avatarConfig.accent} {avatarConfig.language}
                  </p>
                </div>
              </div>

              {messages.map((message) => (
                <div key={message.id} className="mb-4">
                  <ChatBubble
                    message={message}
                    avatarName={avatarConfig.name}
                    onFeedback={(id) => {
                      const msg = messages.find((m) => m.id === id);
                      if (msg && msg.feedback) {
                        setFeedbackMessage(msg);
                        setIsFeedbackOpen(true);
                      }
                    }}
                  />
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 mb-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-thinking" />
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-thinking"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-thinking"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                  <span className="text-sm">{avatarConfig.name} is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <MessageInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            onVoiceToggle={handleVoiceToggle}
            isRecording={isRecording}
            isSending={isTyping}
          />
        </div>

        {isSidebarOpen && (
          <div className="hidden lg:block w-80 border-l border-slate-700/50 bg-slate-900/50 overflow-y-auto">
            <TranscriptView messages={messages} />
          </div>
        )}
      </div>

      <FeedbackPanel
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        feedback={
          feedbackMessage?.feedback || {
            pronunciationScore: 0,
            grammarScore: 0,
            suggestions: [],
          }
        }
      />
    </div>
  );
}
