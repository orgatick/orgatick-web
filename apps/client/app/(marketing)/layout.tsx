import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 min-w-0">{children}</main>
      <Footer />
    </div>
  );
}
