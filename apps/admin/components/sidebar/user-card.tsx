"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import { Button } from "@orgatick/ui/components/button";
import { cn } from "@orgatick/ui/lib/utils";
import { IconLogout } from "@tabler/icons-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import baseApi from "@/lib/apis/base.api";
import type { AdminUser } from "@/lib/types";

export function SidebarUserCard({
  user,
  collapsed,
  onSignedOut,
}: {
  user: AdminUser;
  collapsed?: boolean;
  onSignedOut?: () => void;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await baseApi.post("/auth/logout", {});
    } catch {
      // even if the token is already invalid, continue
    }
    onSignedOut?.();
    toast.info("You have been signed out.");
    router.replace("/");
    router.refresh();
  };

  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className={cn("flex items-center gap-2.5", collapsed && "justify-center")}>
      <Avatar className="size-9 shrink-0">
        {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
        <AvatarFallback className="bg-linear-to-br from-primary to-indigo-600 font-mono text-xs font-bold text-white">
          {initials}
        </AvatarFallback>
      </Avatar>

      {!collapsed && (
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
            <Badge variant="secondary" className="shrink-0 px-1.5 py-0 font-mono text-[9px] capitalize">
              {user.role}
            </Badge>
          </div>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      )}

      <div className={cn("flex items-center gap-0.5", collapsed && "flex-col")}>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Sign out"
          title="Sign out"
          onClick={() => void handleSignOut()}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <IconLogout className="size-4" />
        </Button>
      </div>
    </div>
  );
}
