"use client";

import { Toaster } from "@/components/ui/sonner";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors visibleToasts={3} swipeDirections={["right"]} />
    </>
  );
}
