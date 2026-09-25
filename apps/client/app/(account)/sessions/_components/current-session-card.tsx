import type { SessionResponse } from "@orgatick/contracts";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import {
  IconActivity,
  IconCalendar,
  IconDeviceDesktop,
  IconFingerprint,
  IconInfoCircle,
  IconNetwork,
} from "@tabler/icons-react";
import { SessionDeviceIcon, SessionPlatformIcon } from "./session-device-icon";
import { formatExactDate, formatRelativeTime, parseSessionMeta } from "./session-utils";

interface CurrentSessionCardProps {
  session: SessionResponse | null;
}

export function CurrentSessionCard({ session }: CurrentSessionCardProps) {
  if (!session) {
    return null;
  }

  const meta = parseSessionMeta(session);
  const relativeActive = formatRelativeTime(session.lastActivityAt || session.createdAt);
  const exactActive = formatExactDate(session.lastActivityAt || session.createdAt);
  const createdDate = formatExactDate(session.createdAt);
  const expiresDate = session.expiresAt ? formatExactDate(session.expiresAt) : "Automatic (30 days)";

  return (
    <Card className="border-border/80 shadow-xs relative overflow-hidden">
      {/* Subtle indicator bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-emerald-500 via-emerald-400 to-teal-500" />

      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <IconDeviceDesktop className="size-4 text-primary" />
                Current Active Session
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              This is the device and browser session currently connected to Orgatick.
            </CardDescription>
          </div>

          <Badge
            variant="outline"
            className="w-fit border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1 gap-1.5"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            This Device (Active Now)
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-5 space-y-5">
        {/* Device identity summary */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-border/70 bg-muted/20">
          <div className="flex size-11 items-center justify-center rounded-lg bg-background border border-border/80 text-foreground shadow-xs shrink-0">
            <SessionDeviceIcon session={session} className="size-5 text-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-foreground">{meta.summary}</span>
              <Badge variant="secondary" className="text-[11px] font-mono px-2 py-0">
                <SessionPlatformIcon session={session} className="size-3 mr-1" />
                {meta.platformName}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate font-mono mt-0.5">
              {session.userAgent || "Standard Secure Browser Agent"}
            </p>
          </div>
        </div>

        {/* Technical metadata grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* IP Address */}
          <div className="p-3 rounded-lg border border-border/60 bg-muted/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <IconNetwork className="size-3.5 text-primary" />
              <span>IP Address</span>
            </div>
            <p className="font-mono text-xs font-medium text-foreground break-all">
              {session.ipAddress || "Private / Undisclosed"}
            </p>
          </div>

          {/* Device ID / Fingerprint */}
          <div className="p-3 rounded-lg border border-border/60 bg-muted/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <IconFingerprint className="size-3.5 text-primary" />
              <span>Device Identifier</span>
            </div>
            <p className="font-mono text-xs font-medium text-foreground truncate">
              {session.deviceId ? `#${session.deviceId}` : "Client Instance"}
            </p>
          </div>

          {/* Last Activity */}
          <div className="p-3 rounded-lg border border-border/60 bg-muted/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <IconActivity className="size-3.5 text-emerald-500" />
              <span>Last Activity</span>
            </div>
            <p className="text-xs font-medium text-foreground">{relativeActive}</p>
            <p className="text-[10px] text-muted-foreground font-mono truncate">{exactActive}</p>
          </div>

          {/* Created At / Session Expiration */}
          <div className="p-3 rounded-lg border border-border/60 bg-muted/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <IconCalendar className="size-3.5 text-primary" />
              <span>Session Started</span>
            </div>
            <p className="text-xs font-medium text-foreground">{createdDate}</p>
            <p className="text-[10px] text-muted-foreground font-mono truncate">Expires: {expiresDate}</p>
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/30 border border-border/50 text-[11px] text-muted-foreground leading-relaxed">
          <IconInfoCircle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <span>
            This session is authenticated with your primary security token. Signing out will invalidate your session on
            this browser.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
