"use client";

import type { UserResponse } from "@orgatick/contracts";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";

function getInitials(name?: string): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function UserAvatar({ user, className }: { user: UserResponse; className?: string }) {
  return (
    <Avatar className={className}>
      {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
      <AvatarFallback className="bg-linear-to-br from-primary to-indigo-600 font-mono text-sm font-bold text-white">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
}

export { getInitials };
