"use client";

import { Toaster } from "@orgatick/ui/components/toast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
