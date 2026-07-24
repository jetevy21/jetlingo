"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/hooks/useI18n";
import {
  Globe,
  MessageSquare,
  Brain,
  Zap,
  Star,
  ChevronRight,
  Check,
  Plane,
} from "lucide-react";

const featureIcons = [Globe, MessageSquare, Brain, Zap];

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <Plane size={20} className="text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-white">
              JetLingo
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {t.nav.features}
            </a>
            <a
              href="#testimonials"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {t.nav.testimonials}
            </a>
            <a
              href="#pricing"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {t.nav.pricing}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                {t.nav.login}
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">
                {t.nav.getStarted}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-8">
            <Zap size={14} className="text-teal-400" />
            <span className="text-sm text-teal-400">{t.hero.badge}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 animate-gradient bg-gradient-to-r from-white via-teal-200 to-white bg-clip-text text-transparent bg-[length:200%_auto]">
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="min-w-[200px]">
                {t.hero.cta}
                <ChevronRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-teal-400" />
              <span>{t.hero.trust1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-teal-400" />
              <span>{t.hero.trust2}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-teal-400" />
              <span>{t.hero.trust3}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t.features.title}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.items.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <div
                  key={feature.title}
                  className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-teal-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t.testimonials.title}
            </h2>
            <p className="text-slate-400">{t.testimonials.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">{testimonial.content}</p>
                <div>
                  <p className="text-sm font-medium text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t.pricing.title}
            </h2>
            <p className="text-slate-400">{t.pricing.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {t.pricing.plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`p-6 rounded-2xl border ${
                  i === 1
                    ? "bg-teal-500/10 border-teal-500/50"
                    : "bg-slate-800/50 border-slate-700/50"
                }`}
              >
                {i === 1 && (
                  <div className="text-xs font-medium text-teal-400 mb-4">
                    {t.pricing.popular}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2 mb-6">
                  <span className="text-4xl font-bold text-white">
                    {plan.price === "0" ? "0" : `$${plan.price}`}
                  </span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <Check
                        size={16}
                        className="text-teal-400 flex-shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button
                    variant={i === 1 ? "primary" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <Plane size={16} className="text-white" />
            </div>
            <span className="text-lg font-heading font-bold text-white">
              JetLingo
            </span>
          </div>
          <p className="text-sm text-slate-500">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}


