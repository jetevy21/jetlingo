"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/authStore";
import { useI18n } from "@/hooks/useI18n";
import { Plane, Loader2, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register({ name, email, password });
      router.push("/dashboard");
    } catch (err: any) {
      const msg = err?.message || t.auth.register.error;
      if (msg.includes('Database not configured')) {
        setError(`Mode démo : la base de données n'est pas configurée. Contactez l'administrateur.`);
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-500/20 to-navy-900 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-6">
            <Plane size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-4 text-center">
            {t.auth.register.journeyTitle}
          </h1>
          <p className="text-slate-400 text-center mb-8">
            {t.auth.register.journeySubtitle}
          </p>

          <div className="space-y-4">
            {t.auth.register.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl"
              >
                <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <Check size={12} className="text-teal-400" />
                </div>
                <span className="text-sm text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <Plane size={20} className="text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-white">
              JetLingo
            </span>
          </div>

          <h2 className="text-2xl font-heading font-bold text-white mb-2">
            {t.auth.register.title}
          </h2>
          <p className="text-slate-400 mb-8">
            {t.auth.register.subtitle}
          </p>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl mb-6">
              <p className="text-sm text-rose-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t.auth.register.name}
              type="text"
              placeholder={t.auth.register.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label={t.auth.register.email}
              type="email"
              placeholder={t.auth.register.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label={t.auth.register.password}
              type="password"
              placeholder={t.auth.register.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                t.auth.register.submit
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            {t.auth.register.hasAccount}{" "}
            <Link
              href="/login"
              className="text-teal-400 hover:text-teal-300 font-medium"
            >
              {t.auth.register.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
