"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "./providers/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster position="top-right" richColors visibleToasts={3} />
    </ThemeProvider>
  );
}
