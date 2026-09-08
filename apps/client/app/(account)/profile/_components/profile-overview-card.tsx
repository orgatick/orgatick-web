import type { UserResponse } from "@orgatick/contracts";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import {
  IconArrowUpRight,
  IconCalendar,
  IconClock,
  IconDeviceLaptop,
  IconId,
  IconShield,
  IconTicket,
  IconUserCheck,
} from "@tabler/icons-react";
import Link from "next/link";

interface ProfileOverviewCardProps {
  user: UserResponse | null;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(date);
  } catch {
    return "N/A";
  }
}

export function ProfileOverviewCard({ user }: ProfileOverviewCardProps) {
  const memberSince = formatDate(user?.createdAt);
  const lastUpdated = formatDate(user?.updatedAt);

  return (
    <Card className="border-border/80 shadow-xs">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
          <IconUserCheck className="size-4 text-primary" />
          Account Summary
        </CardTitle>
        <CardDescription className="text-xs">Overview of your membership and account properties.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-4 text-xs">
        {/* Info Rows */}
        <div className="divide-y divide-border/60">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <IconId className="size-3.5" />
              Account ID
            </span>
            <span className="font-mono font-medium text-foreground">{user?.id ? `#${user.id}` : "N/A"}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <IconShield className="size-3.5" />
              Account Role
            </span>
            <Badge variant="secondary" className="capitalize text-[11px] font-mono">
              {user?.role || "user"}
            </Badge>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <IconCalendar className="size-3.5" />
              Member Since
            </span>
            <span className="font-medium text-foreground">{memberSince}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <IconClock className="size-3.5" />
              Last Profile Update
            </span>
            <span className="font-medium text-foreground">{lastUpdated}</span>
          </div>
        </div>

        {/* Quick Account Navigation */}
        <div className="pt-2 space-y-2">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</div>

          <div className="grid gap-2">
            <Link
              href="/my-tickets"
              className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 hover:border-primary/50 bg-background hover:bg-muted/40 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <IconTicket className="size-4 text-primary" />
                <span className="font-medium text-foreground">My Passes & Tickets</span>
              </div>
              <IconArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>

            <a
              href="https://organizer.orgatick.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 hover:border-primary/50 bg-background hover:bg-muted/40 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <IconDeviceLaptop className="size-4 text-indigo-500" />
                <span className="font-medium text-foreground">Organizer Dashboard</span>
              </div>
              <IconArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
