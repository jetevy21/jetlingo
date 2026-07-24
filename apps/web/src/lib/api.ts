import { User, Conversation, Lesson, UserStats, Message, Avatar } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: any = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchAPI<{ user: User; token: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (data: { email: string; password: string; name: string }) =>
      fetchAPI<{ user: User; token: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    me: () => fetchAPI<User>("/api/auth/me"),
  },

  conversations: {
    list: () => fetchAPI<Conversation[]>("/api/conversations"),
    get: (id: string) => fetchAPI<Conversation>(`/api/conversations/${id}`),
    create: (data: { avatarId: string; mode: string; lessonId?: string }) =>
      fetchAPI<Conversation>("/api/conversations", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    sendMessage: (conversationId: string, content: string) =>
      fetchAPI<Message>(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        body: JSON.stringify({ content }),
      }),
    end: (id: string) =>
      fetchAPI<Conversation>(`/api/conversations/${id}/end`, {
        method: "POST",
      }),
  },

  lessons: {
    list: (category?: string) =>
      fetchAPI<Lesson[]>(
        `/api/lessons${category ? `?category=${category}` : ""}`
      ),
    get: (id: string) => fetchAPI<Lesson>(`/api/lessons/${id}`),
  },

  avatars: {
    list: () => fetchAPI<Avatar[]>("/api/avatars"),
    get: (id: string) => fetchAPI<Avatar>(`/api/avatars/${id}`),
  },

  stats: {
    get: () => fetchAPI<UserStats>("/api/stats"),
  },

  words: {
    list: () =>
      fetchAPI<{ id: string; word: string; translation: string }[]>(
        "/api/words"
      ),
    add: (word: string, translation: string, context: string) =>
      fetchAPI<{ id: string }>("/api/words", {
        method: "POST",
        body: JSON.stringify({ word, translation, context }),
      }),
    delete: (id: string) =>
      fetchAPI(`/api/words/${id}`, { method: "DELETE" }),
  },
};

export function streamConversation(
  conversationId: string,
  onChunk: (chunk: string) => void,
  onDone: () => void
) {
  const token = localStorage.getItem("token");
  const eventSource = new EventSource(
    `${API_URL}/api/conversations/${conversationId}/stream${token ? `?token=${token}` : ""}`
  );

  eventSource.onmessage = (event) => {
    if (event.data === "[DONE]") {
      onDone();
      eventSource.close();
    } else {
      onChunk(event.data);
    }
  };

  eventSource.onerror = () => {
    eventSource.close();
  };

  return () => eventSource.close();
}
