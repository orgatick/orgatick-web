"use client";

import { LinkButton } from "@/components/ui/link-button";
import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import { Button } from "@orgatick/ui/components/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@orgatick/ui/components/sheet";
import { cn } from "@orgatick/ui/lib/utils";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCheck,
  IconHelpCircle,
  IconMenu2,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MAIN_NAV_LINKS } from "./navbar-constants";

export function NavbarMobile() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

            <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>Engine Status: Operational</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
