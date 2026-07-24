"use client";

import { useCallback } from "react";
import { useConversationStore } from "@/stores/conversationStore";

export function useConversation() {
  const {
    currentConversation,
    messages,
    isTyping,
    isRecording,
    inputText,
    startConversation,
    sendMessage,
    endConversation,
    setRecording,
    setInputText,
    clearConversation,
  } = useConversationStore();

  const handleSend = useCallback(
    async (content: string) => {
      if (!content.trim()) return;
      await sendMessage(content);
    },
    [sendMessage]
  );

  const handleVoiceInput = useCallback(
    (text: string) => {
      setInputText(text);
    },
    [setInputText]
  );

  return {
    conversation: currentConversation,
    messages,
    isTyping,
    isRecording,
    inputText,
    startConversation,
    sendMessage: handleSend,
    endConversation,
    setRecording,
    setInputText,
    handleVoiceInput,
    clearConversation,
  };
}
