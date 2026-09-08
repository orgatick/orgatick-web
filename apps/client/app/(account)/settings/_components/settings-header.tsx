import { Button } from "@orgatick/ui/components/button";
import { IconSettings, IconUser } from "@tabler/icons-react";
import Link from "next/link";

export function SettingsHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-linear-to-br from-card via-card to-muted/40 p-6 sm:p-8 shadow-xs">
      {/* Background ambient decoration */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <IconSettings className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Account Settings</h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Update your profile details, avatar, contact information, and personal preferences.
          </p>
        </div>

        <div>
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/profile" className="inline-flex items-center gap-1.5 text-xs font-medium" />}
          >
            <IconUser className="size-3.5 text-primary" />
            <span>View Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
