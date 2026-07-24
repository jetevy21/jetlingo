"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/authStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { useI18n } from "@/hooks/useI18n";
import { User, Globe, Volume2, Camera, Lock, CreditCard } from "lucide-react";

const languageKeys = ["en", "fr", "es", "de", "it", "pt", "ja", "ko", "zh"] as const;
const levelKeys = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const accentKeys = ["latin", "european", "neutral"] as const;

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore();
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [nativeLanguage, setNativeLanguage] = useState(user?.nativeLanguage || "fr");
  const [targetLanguage, setTargetLanguage] = useState(user?.targetLanguage || "en");
  const [cefrLevel, setCefrLevel] = useState(user?.cefrLevel || "A2");
  const [accentPreference, setAccentPreference] = useState(user?.accentPreference || "latin");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarUrl(user.avatarUrl || "");
      setNativeLanguage(user.nativeLanguage || "fr");
      setTargetLanguage(user.targetLanguage || "en");
      setCefrLevel(user.cefrLevel || "A2");
      setAccentPreference(user.accentPreference || "latin");
    }
  }, [user]);

  const normalizeLang = (lang: string | undefined): string => {
    if (!lang) return "en";
    const map: Record<string, string> = { english: "en", spanish: "es", french: "fr", german: "de" };
    return map[lang.toLowerCase()] || lang;
  };

  const saveSettings = (overrides: Partial<typeof user> = {}) => {
    if (!user) return;
    const updated = {
      ...user,
      name,
      email,
      avatarUrl,
      nativeLanguage: normalizeLang(nativeLanguage),
      targetLanguage: normalizeLang(targetLanguage),
      cefrLevel,
      accentPreference,
      ...overrides,
    };
    updateUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAvatarUrl(base64);
      saveSettings({ avatarUrl: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl("");
    saveSettings({ avatarUrl: "" });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    saveSettings();
    setIsSaving(false);
  };

  const handleChangePassword = async () => {
    setPasswordError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Veuillez remplir tous les champs");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2000);
    setIsSaving(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">
          {t.settings.title}
        </h1>
        <p className="text-slate-400 mt-1">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Profile Section */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-2 mb-6">
          <User size={18} className="text-teal-400" />
          <h3 className="text-lg font-semibold text-white">
            {t.settings.profile}
          </h3>
        </div>

        <div className="flex items-start gap-6 mb-6">
          <div className="relative group">
            <Avatar
              name={user?.name || "User"}
              imageUrl={avatarUrl}
              size="xl"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera size={24} className="text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
          <div className="flex-1 space-y-4">
            <Input
              label={t.settings.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label={t.settings.email}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {avatarUrl && (
          <button
            onClick={handleRemoveAvatar}
            className="text-sm text-slate-400 hover:text-red-400 transition-colors"
          >
            Supprimer la photo
          </button>
        )}
      </div>

      {/* Language Settings */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-2 mb-6">
          <Globe size={18} className="text-teal-400" />
          <h3 className="text-lg font-semibold text-white">
            {t.settings.languageSettings}
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t.settings.nativeLanguage}
            </label>
            <select
              value={nativeLanguage}
              onChange={(e) => {
                const val = e.target.value;
                setNativeLanguage(val);
                saveSettings({ nativeLanguage: val });
              }}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-200"
            >
              {languageKeys.map((key) => (
                <option key={key} value={key}>
                  {t.settings.languages[key]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t.settings.targetLanguage}
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => {
                const val = e.target.value;
                setTargetLanguage(val);
                saveSettings({ targetLanguage: val });
              }}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-200"
            >
              {languageKeys.map((key) => (
                <option key={key} value={key}>
                  {t.settings.languages[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t.settings.currentLevel}
              </label>
              <select
                value={cefrLevel}
                onChange={(e) => {
                  const val = e.target.value;
                  setCefrLevel(val);
                  saveSettings({ cefrLevel: val });
                }}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-200"
              >
                {levelKeys.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t.settings.accentPreference}
              </label>
              <select
                value={accentPreference}
                onChange={(e) => {
                  const val = e.target.value;
                  setAccentPreference(val);
                  saveSettings({ accentPreference: val });
                }}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-200"
              >
                {accentKeys.map((key) => (
                  <option key={key} value={key}>
                    {t.settings.accents[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-2 mb-6">
          <Volume2 size={18} className="text-teal-400" />
          <h3 className="text-lg font-semibold text-white">
            {t.settings.audioSettings}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">
                {t.settings.autoPlayAudio}
              </p>
              <p className="text-xs text-slate-400">
                {t.settings.autoPlayAudioDesc}
              </p>
            </div>
            <div className="w-12 h-6 bg-teal-500 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">
                {t.settings.speechToText}
              </p>
              <p className="text-xs text-slate-400">
                {t.settings.speechToTextDesc}
              </p>
            </div>
            <div className="w-12 h-6 bg-teal-500 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-2 mb-6">
          <Lock size={18} className="text-teal-400" />
          <h3 className="text-lg font-semibold text-white">
            {t.settings.changePassword}
          </h3>
        </div>

        <div className="space-y-4">
          <Input
            label={t.settings.currentPassword}
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Input
            label={t.settings.newPassword}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Input
            label={t.settings.confirmPassword}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />

          {passwordError && (
            <p className="text-sm text-red-400">{passwordError}</p>
          )}

          <div className="flex items-center justify-end gap-3">
            {passwordSaved && (
              <span className="text-sm text-emerald-400 font-medium animate-pulse">
                ✓ {t.settings.passwordChanged}
              </span>
            )}
            <Button onClick={handleChangePassword} disabled={isSaving}>
              {isSaving ? t.settings.saving : t.settings.changePassword}
            </Button>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard size={20} className="text-teal-400" />
          <h2 className="text-lg font-heading font-semibold text-white">{t.settings.subscription}</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">{t.settings.currentPlan}</p>
            <p className="text-white font-medium capitalize">{user?.subscriptionTier || "free"}</p>
          </div>
          <Button variant="primary" onClick={() => window.location.href = "/dashboard/pricing"}>
            {user?.subscriptionTier === "free" ? t.settings.upgradePlan : t.settings.manageSubscription}
          </Button>
        </div>
      </div>

      {/* Save Profile Button */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-sm text-emerald-400 font-medium animate-pulse">
            ✓ {t.settings.saved}
          </span>
        )}
        <Button onClick={handleSaveProfile} disabled={isSaving}>
          {isSaving ? t.settings.saving : t.settings.saveChanges}
        </Button>
      </div>
    </div>
  );
}