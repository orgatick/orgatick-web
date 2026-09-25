import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { cookies } from "next/headers";
import { createServerApiClient } from "@/lib/apis/server-auth-api";
import { redirect } from "next/navigation";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const serverApi = createServerApiClient({ cookieStore });
  try {
    const response = await serverApi.get("/auth/sessions/current");
    if (!response.data?.data) {
      redirect("/login?error=unauthorized");
    }
  } catch {
    redirect("/login?error=unauthorized");
  }

  return (
    <div className="flex h-full flex-col overflow-x-clip bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 min-w-0 py-4">{children}</main>
      <Footer />
    </div>
  );
}
