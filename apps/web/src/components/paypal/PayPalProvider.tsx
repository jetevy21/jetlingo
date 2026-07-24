"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

export default function PayPalProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<{ clientId: string; mode: string } | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paypal/config`)
      .then(r => r.json())
      .then(setConfig)
      .catch(() => setConfig({ clientId: "", mode: "sandbox" }));
  }, []);

  if (!config || !config.clientId) {
    return <>{children}</>;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: config.clientId,
        intent: "subscription",
        vault: true,
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
