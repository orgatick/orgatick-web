"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SessionResponse } from "@orgatick/contracts";
import { Badge } from "@orgatick/ui/components/badge";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@orgatick/ui/components/dialog";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@orgatick/ui/components/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@orgatick/ui/components/item";
import {
  IconActivity,
  IconAlertTriangle,
  IconCalendar,
  IconDevices,
  IconLoader2,
  IconLogout,
  IconNetwork,
  IconRefresh,
  IconShieldCheck,
  IconTrash,
} from "@tabler/icons-react";
import { useAuthStore } from "@/app/(auth)/_store";
import { handleApiError } from "@/lib/apis/api-error";
import { toast } from "@/components/ui/sonner";
import { sessionService } from "../../_services/session.service";
import { SessionDeviceIcon, SessionPlatformIcon } from "./session-device-icon";
import { formatExactDate, formatRelativeTime, parseSessionMeta } from "./session-utils";

interface SessionsListProps {
  initialSessions: SessionResponse[];
}

export function SessionsList({ initialSessions }: SessionsListProps) {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const [sessions, setSessions] = useState<SessionResponse[]>(initialSessions);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | "other" | "all" | null>(null);

  // Dialog state
  const [sessionToRevoke, setSessionToRevoke] = useState<SessionResponse | null>(null);
  const [isRevokeOthersOpen, setIsRevokeOthersOpen] = useState(false);
  const [isRevokeAllOpen, setIsRevokeAllOpen] = useState(false);

  // Synchronize when initialSessions changes
  useEffect(() => {
    if (initialSessions.length > 0) {
      setSessions(initialSessions);
    } else {
      // Fallback: fetch client-side if server cookies were empty
      sessionService
        .getSessions()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setSessions(data);
          }
        })
        .catch(() => {});
    }
  }, [initialSessions]);

  // Filter other sessions
  const otherSessions = sessions.filter((s) => !s.isCurrent);

  // Refresh active sessions
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const refreshed = await sessionService.getSessions();
      setSessions(refreshed);
      router.refresh();
      toast.success("Sessions refreshed");
    } catch (error) {
      handleApiError(error, "Failed to refresh sessions list");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Revoke single session
  const confirmRevokeSession = async () => {
    if (!sessionToRevoke) return;
    const targetId = sessionToRevoke.id;
    const isTargetCurrent = sessionToRevoke.isCurrent;

    setActionLoading(targetId);
    try {
      const result = await sessionService.revokeSession(targetId);
      setSessions((prev) => prev.filter((s) => s.id !== targetId));
      setSessionToRevoke(null);

      if (isTargetCurrent) {
        clearAuth();
        toast.success("Your current session was revoked. Redirecting to sign in...");
        window.location.href = "/login";
      } else {
        toast.success(result.message || "Session revoked successfully");
      }
    } catch (error) {
      handleApiError(error, "Failed to revoke session");
    } finally {
      setActionLoading(null);
    }
  };

  // Revoke all other sessions
  const confirmRevokeOthers = async () => {
    setActionLoading("other");
    try {
      const result = await sessionService.revokeOtherSessions();
      setSessions((prev) => prev.filter((s) => s.isCurrent));
      setIsRevokeOthersOpen(false);
      toast.success(result.message || "All other sessions have been revoked");
    } catch (error) {
      handleApiError(error, "Failed to revoke other sessions");
    } finally {
      setActionLoading(null);
    }
  };

  // Revoke all sessions (including current)
  const confirmRevokeAll = async () => {
    setActionLoading("all");
    try {
      await sessionService.revokeAllSessions();
      clearAuth();
      setIsRevokeAllOpen(false);
      toast.success("All sessions revoked. Redirecting to login...");
      window.location.href = "/login";
    } catch (error) {
      handleApiError(error, "Failed to revoke all sessions");
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Other Active Sessions Card */}
      <Card className="border-border/80 shadow-xs">
        <CardHeader className="border-b border-border/60 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <IconDevices className="size-4 text-primary" />
                  Other Active Sessions
                </CardTitle>
                <Badge variant="secondary" className="text-xs font-mono">
                  {otherSessions.length}
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Other browsers and devices where you are logged in. Revoke access for any unfamiliar device.
              </CardDescription>
            </div>

            <CardAction className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-xs h-8"
              >
                <IconRefresh className={`size-3.5 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </Button>

              {otherSessions.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsRevokeOthersOpen(true)}
                  disabled={actionLoading !== null}
                  className="text-xs h-8"
                >
                  <IconTrash className="size-3.5 mr-1" />
                  <span>Revoke Other Sessions</span>
                </Button>
              )}
            </CardAction>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {otherSessions.length === 0 ? (
            <Empty className="py-12 border-0">
              <EmptyHeader>
                <EmptyMedia variant="icon" className="bg-primary/10 text-primary size-10">
                  <IconShieldCheck className="size-5" />
                </EmptyMedia>
                <EmptyTitle className="text-base font-semibold">No Other Active Sessions</EmptyTitle>
                <EmptyDescription className="text-xs text-muted-foreground max-w-sm">
                  Your account is only active on this current device. No other computers, phones, or clients hold an
                  active session.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <ItemGroup className="gap-3">
              {otherSessions.map((session, index) => {
                const meta = parseSessionMeta(session);
                const relativeActive = formatRelativeTime(session.lastActivityAt || session.createdAt);
                const exactCreated = formatExactDate(session.createdAt);
                const isRevoking = actionLoading === session.id;

                return (
                  <div key={session.id}>
                    <Item
                      variant="outline"
                      className="p-4 rounded-xl border border-border/70 hover:border-border transition-colors bg-card"
                    >
                      {/* Device / Browser Icon */}
                      <ItemMedia className="size-10 rounded-lg bg-muted/50 border border-border/60 flex items-center justify-center text-foreground shrink-0">
                        <SessionDeviceIcon session={session} className="size-5" />
                      </ItemMedia>

                      {/* Content */}
                      <ItemContent className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <ItemTitle className="text-sm font-semibold text-foreground">{meta.summary}</ItemTitle>
                          <Badge variant="secondary" className="text-[11px] font-mono px-2 py-0">
                            <SessionPlatformIcon session={session} className="size-3 mr-1" />
                            {meta.platformName}
                          </Badge>
                          {session.deviceId && (
                            <Badge
                              variant="outline"
                              className="text-[10px] font-mono px-1.5 py-0 text-muted-foreground"
                            >
                              #{session.deviceId}
                            </Badge>
                          )}
                        </div>

                        <ItemDescription className="text-xs text-muted-foreground line-clamp-none flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                          <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                            <IconNetwork className="size-3 text-muted-foreground" />
                            {session.ipAddress || "Unknown IP"}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px]">
                            <IconActivity className="size-3 text-muted-foreground" />
                            Last active: {relativeActive}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px]">
                            <IconCalendar className="size-3 text-muted-foreground" />
                            Signed in: {exactCreated}
                          </span>
                        </ItemDescription>
                      </ItemContent>

                      {/* Action */}
                      <ItemActions className="shrink-0 ml-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setSessionToRevoke(session)}
                          disabled={actionLoading !== null}
                          className="h-8 text-xs font-medium"
                        >
                          {isRevoking ? (
                            <IconLoader2 className="size-3.5 animate-spin mr-1" />
                          ) : (
                            <IconTrash className="size-3.5 mr-1" />
                          )}
                          <span>Revoke</span>
                        </Button>
                      </ItemActions>
                    </Item>

                    {index < otherSessions.length - 1 && <ItemSeparator className="my-2 opacity-50" />}
                  </div>
                );
              })}
            </ItemGroup>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone: Revoke All Sessions */}
      <Card className="border-destructive/30 bg-destructive/5 shadow-xs">
        <CardHeader className="border-b border-destructive/20 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold text-destructive flex items-center gap-2">
                <IconAlertTriangle className="size-4" />
                Global Sign Out (Revoke All Sessions)
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Revoke all active sessions belonging to your account across every browser, phone, and client.
              </CardDescription>
            </div>

            <CardAction>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsRevokeAllOpen(true)}
                disabled={actionLoading !== null}
                className="h-8 text-xs font-semibold"
              >
                <IconLogout className="size-3.5 mr-1" />
                <span>Sign Out Everywhere</span>
              </Button>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent className="pt-3 pb-4 text-xs text-muted-foreground leading-relaxed">
          Executing a global sign out will invalidate authentication cookies and cached tokens on all devices
          immediately, including this current device. You will be redirected to the sign in page.
        </CardContent>
      </Card>

      {/* Confirmation Dialog: Revoke Single Session */}
      <Dialog
        open={sessionToRevoke !== null}
        onOpenChange={(open) => {
          if (!open && actionLoading === null) setSessionToRevoke(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <IconTrash className="size-4 text-destructive" />
              Revoke Session
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to revoke this session? The device will be signed out immediately and will lose
              access to your account.
            </DialogDescription>
          </DialogHeader>

          {sessionToRevoke && (
            <div className="rounded-lg border border-border/70 bg-muted/20 p-3 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Device:</span>
                <span className="font-semibold text-foreground">{parseSessionMeta(sessionToRevoke).summary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IP Address:</span>
                <span className="text-foreground">{sessionToRevoke.ipAddress || "Undisclosed"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Active:</span>
                <span className="text-foreground font-sans">
                  {formatRelativeTime(sessionToRevoke.lastActivityAt || sessionToRevoke.createdAt)}
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose render={<Button variant="outline" size="sm" disabled={actionLoading !== null} />}>
              Cancel
            </DialogClose>
            <Button variant="destructive" size="sm" onClick={confirmRevokeSession} disabled={actionLoading !== null}>
              {actionLoading === sessionToRevoke?.id ? (
                <>
                  <IconLoader2 className="size-3.5 mr-1.5 animate-spin" />
                  <span>Revoking...</span>
                </>
              ) : (
                <span>Revoke Session</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog: Revoke Other Sessions */}
      <Dialog
        open={isRevokeOthersOpen}
        onOpenChange={(open) => {
          if (!open && actionLoading === null) setIsRevokeOthersOpen(false);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <IconTrash className="size-4 text-destructive" />
              Revoke All Other Sessions
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              This will revoke all active sessions except this current device. You will stay signed in on this device,
              but all other browsers and apps will be disconnected.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            Total of <strong className="font-semibold">{otherSessions.length}</strong> other device(s) will be logged
            out and their session tokens evicted.
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose render={<Button variant="outline" size="sm" disabled={actionLoading !== null} />}>
              Cancel
            </DialogClose>
            <Button variant="destructive" size="sm" onClick={confirmRevokeOthers} disabled={actionLoading !== null}>
              {actionLoading === "other" ? (
                <>
                  <IconLoader2 className="size-3.5 mr-1.5 animate-spin" />
                  <span>Revoking Others...</span>
                </>
              ) : (
                <span>Revoke {otherSessions.length} Other Sessions</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog: Revoke All Sessions */}
      <Dialog
        open={isRevokeAllOpen}
        onOpenChange={(open) => {
          if (!open && actionLoading === null) setIsRevokeAllOpen(false);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <IconAlertTriangle className="size-4" />
              Sign Out Of All Devices
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to sign out everywhere? This action revokes every active token, clears your
              authentication cookies, and requires you to log in again.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive leading-relaxed">
            You will be logged out of this device immediately and redirected to the login page.
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose render={<Button variant="outline" size="sm" disabled={actionLoading !== null} />}>
              Cancel
            </DialogClose>
            <Button variant="destructive" size="sm" onClick={confirmRevokeAll} disabled={actionLoading !== null}>
              {actionLoading === "all" ? (
                <>
                  <IconLoader2 className="size-3.5 mr-1.5 animate-spin" />
                  <span>Signing Out Everywhere...</span>
                </>
              ) : (
                <span>Sign Out Everywhere</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
