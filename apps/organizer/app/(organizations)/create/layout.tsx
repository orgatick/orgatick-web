import Link from "next/link";
import { IconArrowLeft, IconBuildingCommunity } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";

export default function CreateOrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      {/* Background Ambience */}
      <div className="bg-grid-pattern fixed inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="fixed inset-0 bg-linear-to-b from-background via-background/80 to-background pointer-events-none" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
              <IconBuildingCommunity className="size-5" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-foreground sm:text-base">Orgatick Organizer</span>
              <span className="hidden text-xs text-muted-foreground sm:inline-block sm:ml-2">
                / Organization Onboarding
              </span>
            </div>
          </div>

          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <IconArrowLeft className="size-4" />
              Exit to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        <p>Orgatick Organizer System &copy; {new Date().getFullYear()} Orgatick Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
