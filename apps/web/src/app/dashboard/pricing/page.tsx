"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useI18n } from "@/hooks/useI18n";
import Button from "@/components/ui/Button";
import { Check, Crown, Users, Zap, ArrowLeft } from "lucide-react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

interface PayPalConfig {
  clientId: string;
  mode: string;
  plans: { premium: string; family: string };
}

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { t } = useI18n();
  const [paypalConfig, setPaypalConfig] = useState<PayPalConfig | null>(null);
  const [processing, setProcessing] = useState(false);
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paypal/config`)
      .then(r => r.json())
      .then(setPaypalConfig)
      .catch(() => {});
  }, []);

  const handleSubscriptionCreate = async (planId: string, tier: string) => {
    return async (data: any, actions: any) => {
      setProcessing(true);
      try {
        return await actions.subscription.create({
          plan_id: planId,
        });
      } catch (err) {
        setProcessing(false);
        return null;
      }
    };
  };

  const handleSubscriptionApprove = async (tier: string) => {
    return async (data: any, actions: any) => {
      try {
        const token = localStorage.getItem("jetlingo-token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subscriptionId: data.subscriptionID }),
        });

        if (res.ok) {
          const result = await res.json();
          const stored = localStorage.getItem("user");
          if (stored) {
            const u = JSON.parse(stored);
            u.subscriptionTier = result.tier;
            localStorage.setItem("user", JSON.stringify(u));
          }
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Subscription verification failed:", err);
      } finally {
        setProcessing(false);
      }
    };
  };

  const plans = [
    {
      id: "free",
      name: t.pricing.plans[0]?.name || "Free",
      price: "0",
      period: t.pricing.plans[0]?.period || "/mo",
      features: t.pricing.plans[0]?.features || [],
      cta: t.pricing.plans[0]?.cta || "Start Free",
      icon: <Zap size={24} className="text-teal-400" />,
      tier: "free",
      highlighted: false,
    },
    {
      id: "premium",
      name: t.pricing.plans[1]?.name || "Premium",
      price: "8",
      period: t.pricing.plans[1]?.period || "/mo",
      features: t.pricing.plans[1]?.features || [],
      cta: t.pricing.plans[1]?.cta || "Start Premium",
      icon: <Crown size={24} className="text-amber-400" />,
      tier: "premium",
      highlighted: true,
      planId: paypalConfig?.plans?.premium,
    },
    {
      id: "family",
      name: t.pricing.plans[2]?.name || "Family",
      price: "15",
      period: t.pricing.plans[2]?.period || "/mo",
      features: t.pricing.plans[2]?.features || [],
      cta: t.pricing.plans[2]?.cta || "Start Family",
      icon: <Users size={24} className="text-purple-400" />,
      tier: "family",
      highlighted: false,
      planId: paypalConfig?.plans?.family,
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          {t.nav?.features || "Back"}
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            {t.pricing.title}
          </h1>
          <p className="text-slate-400 text-lg">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl border transition-all ${
                plan.highlighted
                  ? "bg-teal-500/10 border-teal-500/50 shadow-lg shadow-teal-500/10"
                  : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
              } ${user?.subscriptionTier === plan.tier ? "ring-2 ring-teal-400" : ""}`}
            >
              {plan.highlighted && (
                <div className="text-xs font-medium text-teal-400 mb-3">
                  {t.pricing.popular}
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                {plan.icon}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">
                  {plan.price === "0" ? "0" : `$${plan.price}`}
                </span>
                <span className="text-slate-400">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature: string, j: number) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {user?.subscriptionTier === plan.tier ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : plan.id === "free" ? (
                <Button variant="outline" className="w-full" disabled>
                  {plan.cta}
                </Button>
              ) : plan.planId ? (
                <div className="w-full">
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      color: "blue",
                      shape: "rect",
                      label: "subscribe",
                    }}
                    createSubscription={handleSubscriptionCreate(plan.planId, plan.tier)}
                    onApprove={handleSubscriptionApprove(plan.tier)}
                    onError={() => setProcessing(false)}
                  />
                </div>
              ) : (
                <Button variant="primary" className="w-full" disabled>
                  {processing ? "Processing..." : plan.cta}
                </Button>
              )}
            </div>
          ))}
        </div>

        {processing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-white">Processing your subscription...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
