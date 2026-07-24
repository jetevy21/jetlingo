"use client";

import { I18nProvider } from "@/hooks/useI18n";
import PayPalProvider from "@/components/paypal/PayPalProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <PayPalProvider>{children}</PayPalProvider>
    </I18nProvider>
  );
}
