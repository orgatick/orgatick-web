"use client";

import type { UserResponse } from "@orgatick/contracts";
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
  IconChevronRight,
  IconDeviceDesktop,
  IconLogout,
  IconMenu2,
  IconMoon,
  IconSparkles,
  IconSun,
  IconUserPlus,
  IconLogin2,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const THEME_OPTIONS = [
  { value: "system", label: "Device", icon: IconDeviceDesktop },
  { value: "light", label: "Light", icon: IconSun },
  { value: "dark", label: "Dark", icon: IconMoon },
] as const;

type ThemeValue = (typeof THEME_OPTIONS)[number]["value"];
import { MAIN_NAV_LINKS, NAV_EASE, USER_MENU_ITEMS } from "./navbar-constants";
import { UserAvatar } from "./user-avatar";
import { useLogout } from "./use-logout";

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.32, ease: NAV_EASE } },
};

function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-1 pb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}

export function NavbarMobile({ user }: { user: UserResponse | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const logout = useLogout();
  const currentTheme = (theme ?? "system") as ThemeValue;

  return (
    <div className="flex items-center sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open Navigation Menu" />}>
          <IconMenu2 className="size-5 text-foreground" />
        </SheetTrigger>

        <SheetContent side="right" className="w-[320px] gap-0 p-0">
          <SheetHeader className="flex-row items-center justify-between gap-3 pe-12">
            <div className="flex items-center gap-2.5">
              <OrgatickLogo className="size-9" />
              <div>
                <SheetTitle className="text-lg font-bold leading-none">Orgatick</SheetTitle>
                <p className="mt-1 text-[11px] text-muted-foreground">Discover · Host · Attend</p>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-2">
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: NAV_EASE }}
              >
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="group mb-4 flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/30 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <UserAvatar user={user} className="size-10" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                      <Badge variant="secondary" className="shrink-0 px-1.5 py-0 text-[10px] font-mono capitalize">
                        {user.role}
                      </Badge>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <IconChevronRight className="size-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            )}

            <motion.div variants={sectionVariants} initial="hidden" animate="show" className="space-y-5 py-1">
              <div className="space-y-1">
                <SectionLabel>Menu</SectionLabel>
                {MAIN_NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive = isActivePath(pathname, link.href);
                  return (
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                            isActive
                              ? "bg-primary/15 text-primary"
                              : "bg-muted text-muted-foreground group-hover:text-foreground",
                          )}
                        >
                          {Icon && <Icon className="size-4" />}
                        </span>
                        <span className="flex-1">{link.label}</span>
                        {link.badge && (
                          <span className="rounded-full bg-primary/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-primary">
                            {link.badge}
                          </span>
                        )}
                        {isActive ? (
                          <IconCheck className="size-4 text-primary" />
                        ) : (
                          <IconArrowRight className="size-3.5 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {user ? (
                <div className="space-y-1">
                  <SectionLabel>Account</SectionLabel>
                  {USER_MENU_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActivePath(pathname, item.href);
                    return (
                      <motion.div key={item.label} variants={itemVariants}>
                        {item.isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                          >
                            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
                              <Icon className="size-4" />
                            </span>
                            <span className="flex-1">{item.label}</span>
                            <IconArrowUpRight className="size-3.5 text-muted-foreground/40" />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                              isActive
                                ? "bg-primary/10 font-semibold text-primary"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                            )}
                          >
                            <span
                              className={cn(
                                "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                                isActive
                                  ? "bg-primary/15 text-primary"
                                  : "bg-muted text-muted-foreground group-hover:text-foreground",
                              )}
                            >
                              <Icon className="size-4" />
                            </span>
                            <span className="flex-1">{item.label}</span>
                            {isActive ? (
                              <IconCheck className="size-4 text-primary" />
                            ) : (
                              <IconArrowRight className="size-3.5 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
                            )}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div variants={sectionVariants} className="space-y-1">
                  <SectionLabel>Get started</SectionLabel>
                  {[
                    { label: "Sign in", href: "/login", icon: IconLogin2 },
                    { label: "Create account", href: "/signup", icon: IconUserPlus },
                    { label: "Host an event", href: "/contact", icon: IconSparkles },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div key={item.href} variants={itemVariants}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
                            <Icon className="size-4" />
                          </span>
                          <span className="flex-1">{item.label}</span>
                          <IconArrowRight className="size-3.5 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              <div className="space-y-1">
                <SectionLabel>Appearance</SectionLabel>
                {THEME_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const isActive = currentTheme === option.value;
                  return (
                    <motion.div key={option.value} variants={itemVariants}>
                      <button
                        type="button"
                        onClick={() => setTheme(option.value)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                            isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="flex-1 text-start">{option.label}</span>
                        {isActive ? (
                          <IconCheck className="size-4 text-primary" />
                        ) : (
                          <span className="size-4 rounded-full border border-border" />
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="border-t border-border/60 bg-muted/15 p-4">
            {user ? (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  setOpen(false);
                  void logout();
                }}
                className="h-10 w-full justify-center gap-2 rounded-xl text-xs font-semibold"
              >
                <IconLogout className="size-4" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <LinkButton
                  href="/login"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-10 w-full justify-center rounded-xl border-border/80 text-xs font-semibold"
                >
                  Sign in
                </LinkButton>
                <LinkButton
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="h-10 w-full justify-center gap-1.5 rounded-xl text-xs font-semibold shadow-sm shadow-primary/25"
                >
                  <IconSparkles className="size-3.5" />
                  Host
                </LinkButton>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
