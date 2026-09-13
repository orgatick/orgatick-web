import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@orgatick/ui/components/badge";
import { IconDevices, IconShieldCheck, IconUser } from "@tabler/icons-react";

interface SessionsHeaderProps {
  sessionCount: number;
}

export function SessionsHeader({ sessionCount }: SessionsHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-linear-to-br from-card via-card to-muted/40 p-6 sm:p-8 shadow-xs">
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-4 itmes-center w-full justify-start">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <IconDevices className="size-5" />
              </div>
              <div className="flex items-center flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Active Sessions & Devices
                </h1>
                <Badge variant="secondary" className="font-mono text-xs px-2.5 py-0.5">
                  {sessionCount} {sessionCount === 1 ? "Session" : "Sessions"}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium"
                >
                  <IconShieldCheck className="size-3 mr-1 inline" />
                  Protected
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Review all web browsers and devices where your account is currently signed in. Revoke unfamiliar or stale
            sessions to maintain account safety.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <LinkButton href="/profile" variant="outline" size="sm">
            <IconUser className="size-3.5 text-primary" />
            <span>Account Profile</span>
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
