import { LinkButton } from "@/components/ui/link-button";
import type { UserResponse } from "@orgatick/contracts";
import { Avatar, AvatarFallback } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardAction, CardContent } from "@orgatick/ui/components/card";
import { IconCalendar, IconCheck, IconEdit, IconShieldCheck, IconTicket } from "@tabler/icons-react";
import Image from "next/image";

interface ProfileViewHeaderProps {
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

export function ProfileViewHeader({ user }: ProfileViewHeaderProps) {
  const initials = getInitials(user?.name);
  const memberSince = formatDate(user?.createdAt);

  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex gap-4">
          <Avatar className="size-15 sm:size-24 rounded-2xl border-2 border-border/80 shadow-md shrink-0 p-0">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name || "User Avatar"}
                fill
                sizes="100"
                className="aspect-square size-full rounded-2xl object-cover"
                unoptimized
              />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>

          <div className="flex flex-col items-center w-full justify-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {user?.name || "Your Profile"}
            </h1>
            <div className="flex gap-2">
              <Badge variant="secondary" className="font-mono text-xs capitalize tracking-wide px-2.5 py-0.5">
                <IconShieldCheck className="size-3 text-primary mr-1 inline" />
                {user?.role || "user"}
              </Badge>
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium"
              >
                <IconCheck className="size-3 mr-1 inline" />
                Active Account
              </Badge>
            </div>
          </div>
        </div>

        {/* User identity & titles */}
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground break-all">{user?.email || "No email available"}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="size-3.5 text-primary" />
              Joined since {memberSince}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Quick action buttons (Edit Profile in Settings & My Passes) */}
      <CardAction className="flex flex-wrap items-center gap-3 px-5">
        <LinkButton href="/my-tickets" variant="outline" size="sm">
          <IconTicket className="size-3.5 text-primary" />
          <span>My Passes</span>
        </LinkButton>

        <LinkButton href="/settings" variant="default" size="sm">
          <IconEdit className="size-3.5" />
          <span>Edit Profile</span>
        </LinkButton>
      </CardAction>
    </Card>
  );
}
