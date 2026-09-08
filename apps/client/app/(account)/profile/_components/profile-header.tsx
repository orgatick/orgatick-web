import type { UserResponse } from "@orgatick/contracts";
import { Avatar, AvatarFallback } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import { IconCalendar, IconCheck, IconId, IconShieldCheck, IconSparkles } from "@tabler/icons-react";
import Image from "next/image";

interface ProfileHeaderProps {
  user: UserResponse | null;
}

function getInitials(name?: string): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatDate(dateString?: string): string {
  if (!dateString) return "Recently";
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "Recently";
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return "Recently";
  }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials = getInitials(user?.name);
  const memberSince = formatDate(user?.createdAt);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-linear-to-br from-card via-card to-muted/40 p-6 sm:p-8 shadow-xs">
      {/* Background ambient decoration */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar using shadcn Avatar and next/image */}
          <Avatar className="size-20 sm:size-24 rounded-2xl ring-4 ring-background border-2 border-border/80 shadow-md">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name || "User Avatar"}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="aspect-square size-full rounded-2xl object-cover"
                unoptimized
              />
            ) : (
              <AvatarFallback className="rounded-2xl bg-linear-to-tr from-primary to-indigo-600 font-mono text-2xl font-bold text-white shadow-inner">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>

          {/* User identity & titles */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {user?.name || "Your Account"}
              </h1>
              <Badge variant="secondary" className="font-mono text-xs capitalize tracking-wide px-2.5 py-0.5">
                <IconShieldCheck className="size-3 text-primary mr-1 inline" />
                {user?.role || "user"}
              </Badge>
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium"
              >
                <IconCheck className="size-3 mr-1 inline" />
                Active
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground break-all">
              {user?.email || "Manage your account profile and preferences"}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="inline-flex items-center gap-1.5">
                <IconCalendar className="size-3.5 text-primary" />
                Joined {memberSince}
              </span>
              {user?.id ? (
                <span className="inline-flex items-center gap-1 font-mono">
                  <IconId className="size-3.5 text-muted-foreground" />
                  ID: #{user.id}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Quick summary pill */}
        <div className="flex items-center gap-2 self-start sm:self-center rounded-xl border border-border/80 bg-background/80 px-3.5 py-2 backdrop-blur-xs text-xs font-medium text-muted-foreground shadow-xs">
          <IconSparkles className="size-4 text-primary shrink-0" />
          <span>Profile verified</span>
        </div>
      </div>
    </div>
  );
}
