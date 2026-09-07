"use client";

import { LinkButton } from "@/components/ui/link-button";
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
import { IconArrowUpRight, IconChevronDown, IconLogout, IconSparkles, IconTicket } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type AuthUser, USER_MENU_ITEMS } from "./navbar-constants";

export function NavbarAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // =========================================================================
    // TODO: Connect your actual authentication API call / session hook here.
    // Example:
    // async function checkAuthSession() {
    //   try {
    //     setIsLoading(true);
    //     const res = await api.get('/auth/me'); // or use your auth endpoint
    //     if (res.data?.user) {
    //       setUser({
    //         id: res.data.user.id,
    //         name: res.data.user.name,
    //         email: res.data.user.email,
    //         role: res.data.user.role || 'organizer',
    //         initials: res.data.user.name.slice(0, 2).toUpperCase(),
    //       });
    //     }
    //   } catch (err) {
    //     setUser(null);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // checkAuthSession();
    // =========================================================================
    if (isLoading) {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleSignOut = async () => {
    // =========================================================================
    // TODO: Add your sign out API call / token purge logic here.
    // Example:
    // await api.post('/auth/logout');
    // clearAccessToken();
    // window.location.href = '/login';
    // =========================================================================
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {/* Quick Ticket Action */}
        <LinkButton
          href="/my-tickets"
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium border-border/80 hover:border-primary/50"
        >
          <IconTicket className="size-3.5 text-primary" />
          <span>My Passes</span>
        </LinkButton>

        {/* User Account Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-border/80 bg-muted/30 p-1 pl-1.5 pr-2.5 transition-all hover:border-border hover:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              />
            }
          >
            <div className="flex size-7 items-center justify-center rounded-full bg-linear-to-br from-primary to-indigo-600 font-mono text-xs font-bold text-white shadow-xs">
              {user.initials || user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="max-w-[100px] truncate text-xs font-semibold text-foreground leading-tight">
                {user.name}
              </span>
            </div>
            <IconChevronDown className="size-3 text-muted-foreground ml-0.5" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-1.5">
            {/* Header Identity */}
            <DropdownMenuLabel className="p-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground truncate">{user.name}</span>
                <Badge variant="secondary" className="text-[10px] font-mono capitalize">
                  {user.role}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </DropdownMenuLabel>

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
            <DropdownMenuItem
              variant="destructive"
              onClick={handleSignOut}
              className="cursor-pointer text-xs flex items-center gap-2"
            >
              <IconLogout className="size-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
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
