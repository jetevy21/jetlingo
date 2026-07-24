import { create } from "zustand";
import { User } from "@/types";
import { api } from "@/lib/api";
import { setToken, removeToken, setUser, removeUser, getUser } from "@/lib/auth";

function normalizeLang(lang: string | undefined): string {
  if (!lang) return "en";
  const map: Record<string, string> = { english: "en", spanish: "es", french: "fr", german: "de" };
  return map[lang.toLowerCase()] || lang;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    const existingUser = getUser();
    const result = await api.auth.login(email, password);
    setToken(result.token);
    // Preserve local settings (targetLanguage, etc.) over DB defaults
    const merged = {
      ...result.user,
      targetLanguage: normalizeLang(existingUser?.targetLanguage) || normalizeLang(result.user.targetLanguage) || "en",
      nativeLanguage: normalizeLang(existingUser?.nativeLanguage) || normalizeLang(result.user.nativeLanguage) || "fr",
      cefrLevel: existingUser?.cefrLevel || result.user.cefrLevel,
      accentPreference: existingUser?.accentPreference || result.user.accentPreference,
    };
    setUser(merged);
    set({ user: merged, token: result.token, isAuthenticated: true });
  },

  register: async (data: { email: string; password: string; name: string }) => {
    const result = await api.auth.register(data);
    setToken(result.token);
    setUser(result.user);
    set({ user: result.user, token: result.token, isAuthenticated: true });
  },

  logout: () => {
    removeToken();
    removeUser();
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        set({ isLoading: false });
        return;
      }

      // Get saved settings from localStorage first
      const savedUser = getUser();

      try {
        const apiUser = await api.auth.me();
        // Merge: API data + saved settings from localStorage
        const mergedUser: User = {
          ...apiUser,
          targetLanguage: normalizeLang(savedUser?.targetLanguage) || normalizeLang(apiUser.targetLanguage) || "en",
          nativeLanguage: normalizeLang(savedUser?.nativeLanguage) || normalizeLang(apiUser.nativeLanguage) || "fr",
          cefrLevel: savedUser?.cefrLevel || apiUser.cefrLevel || "A2",
          accentPreference: savedUser?.accentPreference || apiUser.accentPreference || "latin",
          name: savedUser?.name || apiUser.name,
        };
        setUser(mergedUser);
        set({ user: mergedUser, token, isAuthenticated: true, isLoading: false });
      } catch {
        // API failed, use localStorage data
        if (savedUser) {
          set({ user: savedUser, token, isAuthenticated: true, isLoading: false });
        } else {
          removeToken();
          removeUser();
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      }
    } catch {
      removeToken();
      removeUser();
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  updateUser: (user: User) => {
    setUser(user);
    set({ user });
  },
}));
