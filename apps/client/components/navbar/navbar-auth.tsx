"use client";

import { LinkButton } from "@/components/ui/link-button";
import { Avatar, AvatarFallback } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@orgatick/ui/components/dropdown-menu";
import { IconArrowUpRight, IconChevronDown, IconLogout, IconSparkles } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { USER_MENU_ITEMS } from "./navbar-constants";
import { useAuthStore } from "@/app/(auth)/_store";

function getInitials(name?: string): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function NavbarAuth() {
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const logout = useAuthStore((state) => state.logout);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    setMounted(true);
    void initializeAuth();
  }, [initializeAuth]);

  if (!mounted || !isInitialized) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    const initials = getInitials(user.name);

    return (
      <div className="flex items-center gap-3">
        {/* User Account Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex ring-1 ring-primary/60 items-center gap-2 rounded-full border-border/80 bg-muted/30 p-0 pl-0 pr-1 transition-all hover:border-border hover:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              />
            }
          >
            <Avatar className="size-8">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name || "User Avatar"}
                  width={28}
                  height={28}
                  unoptimized
                  className="aspect-square size-full rounded-full object-cover"
                />
              ) : (
                <AvatarFallback className="bg-linear-to-br from-primary to-indigo-600 font-mono text-[11px] font-bold text-white">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="hidden md:flex flex-col text-left">
              <span className="max-w-[110px] truncate text-xs font-semibold text-foreground leading-tight">
                {user.name}
              </span>
            </div>
            <IconChevronDown className="size-5 text-muted-foreground mr-1" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-1.5">
            {/* Header Identity */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-2 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm text-foreground truncate">{user.name}</span>
                  <Badge variant="secondary" className="text-[10px] font-mono capitalize shrink-0">
                    {user.role || "user"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Menu Links */}
            <DropdownMenuGroup>
              {USER_MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem
                    key={item.label}
                    className="cursor-pointer text-xs"
                    render={
                      <Link
                        href={item.href}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 w-full"
                      />
                    }
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Sign Out Action */}
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => logout()}
                className="cursor-pointer text-xs flex items-center gap-2"
              >
                <IconLogout className="size-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Logged Out State
  return (
    <div className="flex items-center gap-2.5">
      <LinkButton
        href="/login"
        variant="ghost"
        size="sm"
        className="text-xs sm:text-sm text-muted-foreground hover:text-foreground font-medium px-3 h-8 sm:h-9"
      >
        Sign In
      </LinkButton>

      <LinkButton
        href="/contact"
        variant="default"
        size="sm"
        className="shadow-sm shadow-primary/25 font-semibold rounded-xl text-xs sm:text-sm px-3.5 sm:px-4 h-8 sm:h-9 hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center gap-1.5"
      >
        <IconSparkles className="size-3.5 hidden sm:inline-block" />
        <span>Host an Event</span>
        <IconArrowUpRight className="size-3.5 sm:size-4" />
      </LinkButton>
    </div>
  );
}
