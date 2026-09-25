import type { SessionResponse } from "@orgatick/contracts";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconCheck, IconClock, IconDevices, IconShieldLock } from "@tabler/icons-react";

interface SessionsOverviewCardProps {
  sessions: SessionResponse[];
}

export function SessionsOverviewCard({ sessions }: SessionsOverviewCardProps) {
  const currentSession = sessions.find((s) => s.isCurrent);
  const otherCount = sessions.filter((s) => !s.isCurrent).length;

  return (
    <Card className="border-border/80 shadow-xs">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
          <IconShieldLock className="size-4 text-primary" />
          Session Summary
        </CardTitle>
        <CardDescription className="text-xs">
          High-level overview of authenticated access tokens and devices.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-4 text-xs">
        {/* Total Active Devices */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-muted/20">
          <div className="space-y-0.5">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <IconDevices className="size-3.5 text-primary" />
              Total Active Devices
            </span>
            <p className="text-[11px] text-muted-foreground">
              {sessions.length} authorized {sessions.length === 1 ? "device" : "devices"}
            </p>
          </div>
          <Badge variant="secondary" className="font-mono text-xs font-semibold px-2">
            {sessions.length}
          </Badge>
        </div>

        {/* Current Device Status */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-muted/20">
          <div className="space-y-0.5">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <IconCheck className="size-3.5 text-emerald-500" />
              Current Connection
            </span>
            <p className="text-[11px] text-muted-foreground">{currentSession?.ipAddress || "Verified"}</p>
          </div>
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium"
          >
            Connected
          </Badge>
        </div>

        {/* Other Devices Count */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-muted/20">
          <div className="space-y-0.5">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <IconClock className="size-3.5 text-primary" />
              Concurrent Logins
            </span>
            <p className="text-[11px] text-muted-foreground">
              {otherCount === 0
                ? "No other devices"
                : `${otherCount} secondary ${otherCount === 1 ? "session" : "sessions"}`}
            </p>
          </div>
          <Badge variant={otherCount > 0 ? "outline" : "secondary"} className="text-[11px] font-mono px-2">
            {otherCount}
          </Badge>
        </div>

        {/* Session Inactivity Policy */}
        <div className="rounded-lg bg-muted/40 p-3 text-[11px] text-muted-foreground leading-relaxed border border-border/50">
          Sessions expire automatically after 30 days of inactivity. Revoked sessions are immediately evicted from the
          distributed auth cache.
        </div>
      </CardContent>
    </Card>
  );
}
