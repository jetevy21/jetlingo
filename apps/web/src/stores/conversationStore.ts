import { create } from "zustand";
import { Message, Conversation } from "@/types";
import { api } from "@/lib/api";
import { generateId } from "@/lib/utils";

interface ConversationState {
  currentConversation: Conversation | null;
  messages: Message[];
  isTyping: boolean;
  isRecording: boolean;
  inputText: string;

  startConversation: (
    avatarId: string,
    mode: string,
    lessonId?: string
  ) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  endConversation: () => Promise<void>;
  setRecording: (recording: boolean) => void;
  setInputText: (text: string) => void;
  clearConversation: () => void;
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  currentConversation: null,
  messages: [],
  isTyping: false,
  isRecording: false,
  inputText: "",

  startConversation: async (avatarId, mode, lessonId) => {
    const conversation = await api.conversations.create({
      avatarId,
      mode,
      lessonId,
    });
    set({
      currentConversation: conversation,
      messages: [],
      isTyping: false,
    });
  },

  sendMessage: async (content: string) => {
    const { currentConversation, messages } = get();
    if (!currentConversation) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    set({
      messages: [...messages, userMessage],
      isTyping: true,
      inputText: "",
    });

    try {
      const assistantMessage = await api.conversations.sendMessage(
        currentConversation.id,
        content
      );
      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isTyping: false,
      }));
    } catch {
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content:
          "I'm sorry, I couldn't process your message. Please try again.",
        timestamp: new Date(),
      };
      set((state) => ({
        messages: [...state.messages, errorMessage],
        isTyping: false,
      }));
    }
  },

  endConversation: async () => {
    const { currentConversation } = get();
    if (currentConversation) {
      await api.conversations.end(currentConversation.id);
    }
    set({ currentConversation: null, messages: [], isTyping: false });
  },

  setRecording: (recording) => set({ isRecording: recording }),
  setInputText: (text) => set({ inputText: text }),
  clearConversation: () =>
    set({
      currentConversation: null,
      messages: [],
      isTyping: false,
    }),
}));
