"use client";

import { LinkButton } from "@/components/ui/link-button";
import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import { Badge } from "@orgatick/ui/components/badge";
import { Button } from "@orgatick/ui/components/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@orgatick/ui/components/sheet";
import { cn } from "@orgatick/ui/lib/utils";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCheck,
  IconHelpCircle,
  IconLogout,
  IconMenu2,
  IconSparkles,
  IconTicket,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MAIN_NAV_LINKS } from "./navbar-constants";
import { useAuthStore } from "@/app/(auth)/_store";

function getInitials(name?: string): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function NavbarMobile() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="lg:hidden flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-xl border-border/80 bg-muted/20"
              aria-label="Open Navigation Menu"
            />
          }
        >
          <IconMenu2 className="size-5 text-foreground" />
        </SheetTrigger>

        <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0 flex flex-col justify-between">
          <div className="p-6 space-y-6">
            {/* Drawer Header */}
            <SheetHeader className="p-0 text-left">
              <div className="flex items-center gap-2.5">
                <OrgatickLogo className="size-8" />
                <SheetTitle className="text-lg font-bold text-foreground">Orgatick</SheetTitle>
              </div>
            </SheetHeader>

            {/* Authenticated User Card */}
            {isAuthenticated && user && (
              <div className="flex items-center gap-3 p-3 rounded-2xl border border-border/70 bg-muted/30">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name || "User Avatar"}
                    width={40}
                    height={40}
                    unoptimized
                    className="size-10 rounded-full object-cover border border-border shadow-xs shrink-0"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-indigo-600 font-mono text-sm font-bold text-white shadow-xs shrink-0">
                    {getInitials(user.name)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                    <Badge variant="secondary" className="text-[10px] font-mono capitalize shrink-0 px-1.5 py-0">
                      {user.role || "user"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1">
              <p className="px-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold pb-1">
                Navigation
              </p>
              {MAIN_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <IconCheck className="size-4 text-primary" />
                    ) : (
                      <IconArrowRight className="size-3.5 text-muted-foreground/50" />
                    )}
                  </Link>
                );
              })}

              {isAuthenticated && (
                <Link
                  href="/my-tickets"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconTicket className="size-4 text-primary" />
                    <span>My Passes &amp; Tickets</span>
                  </div>
                  <IconArrowRight className="size-3.5 text-muted-foreground/50" />
                </Link>
              )}
            </div>

            {/* Platform Quick Links */}
            <div className="space-y-2 pt-2 border-t border-border/50">
              <p className="px-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold pb-0.5">
                Portals
              </p>
              <a
                href="https://organizer.orgatick.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              >
                <span>Organizer Dashboard</span>
                <IconArrowUpRight className="size-3.5" />
              </a>
              <Link
                href="/faq"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              >
                <span>Help &amp; Documentation</span>
                <IconHelpCircle className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-border/50 space-y-3 bg-muted/15">
            {isAuthenticated ? (
              <Button
                variant="destructive"
                size="default"
                onClick={() => {
                  setOpen(false);
                  void logout();
                }}
                className="w-full justify-center rounded-xl text-xs font-semibold h-10 gap-2"
              >
                <IconLogout className="size-4" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <>
                <LinkButton
                  href="/login"
                  variant="outline"
                  size="default"
                  onClick={() => setOpen(false)}
                  className="w-full justify-center rounded-xl text-xs font-semibold h-10 border-border/80"
                >
                  Sign In to Account
                </LinkButton>

                <LinkButton
                  href="/contact"
                  variant="default"
                  size="default"
                  onClick={() => setOpen(false)}
                  className="w-full justify-center rounded-xl text-xs font-semibold h-10 shadow-sm shadow-primary/25"
                >
                  <IconSparkles className="size-3.5 mr-1.5" />
                  <span>Host an Event</span>
                </LinkButton>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
