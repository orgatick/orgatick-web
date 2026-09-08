import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-x-clip bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 min-w-0 py-4">{children}</main>
      <Footer />
    </div>
  );
}
