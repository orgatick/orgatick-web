"use client";

import type { UserResponse } from "@orgatick/contracts";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@orgatick/ui/components/badge";
import { Button } from "@orgatick/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@orgatick/ui/components/dropdown-menu";
import { IconChevronDown, IconLogout, IconSparkles } from "@tabler/icons-react";
import Link from "next/link";
import { USER_MENU_ITEMS } from "./navbar-constants";
import { UserAvatar } from "./user-avatar";
import { useLogout } from "./use-logout";

export function NavbarUser({ user }: { user: UserResponse | null }) {
  const logout = useLogout();

  if (!user) {
    return (
      <div className="hidden items-center gap-1.5 sm:flex">
        <LinkButton href="/login" variant="ghost" size="sm">
          Sign in
        </LinkButton>
        <LinkButton href="/signup" size="sm" className="gap-1.5 shadow-xs shadow-primary/20">
          <IconSparkles className="size-3.5" />
          Create account
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="hidden sm:block">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button type="button" variant="ghost" className="gap-2 rounded-full px-2 py-1.5 aria-expanded:bg-muted/80">
              <UserAvatar user={user} className="size-8" />
              <span className="hidden max-w-28 truncate text-xs font-semibold xl:block">{user.name}</span>
              <IconChevronDown className="hidden size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 xl:block group-aria-expanded/button:rotate-180" />
            </Button>
          }
        />

        <DropdownMenuContent align="end" sideOffset={10} className="w-64 p-1.5">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2.5">
            <UserAvatar user={user} className="size-9" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                <Badge variant="secondary" className="shrink-0 px-1.5 py-0 text-[10px] font-mono capitalize">
                  {user.role}
                </Badge>
              </div>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Account</DropdownMenuLabel>

            {USER_MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return item.isExternal ? (
                <DropdownMenuItem
                  key={item.label}
                  render={<a href={item.href} target="_blank" rel="noopener noreferrer" />}
                  className="gap-2.5 py-1.5 ps-2"
                >
                  <Icon className="size-4 text-muted-foreground" />
                  {item.label}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem key={item.label} render={<Link href={item.href} />} className="gap-2.5 py-1.5 ps-2">
                  <Icon className="size-4 text-muted-foreground" />
                  {item.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={() => void logout()}
            className="gap-2.5 py-1.5 ps-2 font-medium"
          >
            <IconLogout className="size-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
