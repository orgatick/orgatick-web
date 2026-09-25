"use client";

import { Button } from "@orgatick/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@orgatick/ui/components/dropdown-menu";
import { cn } from "@orgatick/ui/lib/utils";
import { IconCheck, IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

const THEME_OPTIONS = [
  { value: "system", label: "Device", description: "Follow system", icon: IconDeviceDesktop },
  { value: "light", label: "Light", description: "Sunny vibes", icon: IconSun },
  { value: "dark", label: "Dark", description: "Night mode", icon: IconMoon },
] as const;

type ThemeValue = (typeof THEME_OPTIONS)[number]["value"];

interface ThemeToggleProps {
  collapsed?: boolean;
  compact?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
}

export function ThemeToggle({ collapsed = false, compact = false, align = "end", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const current = (theme ?? "system") as ThemeValue;
  const CurrentIcon = THEME_OPTIONS.find((option) => option.value === current)?.icon ?? IconDeviceDesktop;
  const iconOnly = collapsed || compact;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size={iconOnly ? "icon" : "default"}
            aria-label="Switch theme"
            title="Switch theme"
            className={cn(
              "rounded-xl text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground aria-expanded:bg-muted/80",
              iconOnly ? "size-8 justify-center" : "h-10 w-full justify-start gap-2.5 px-3",
              className,
            )}
          >
            <CurrentIcon className="size-4.5 shrink-0" />
            {!iconOnly && <span className="truncate">Appearance</span>}
          </Button>
        }
      />
      <DropdownMenuContent align={align} sideOffset={8} className="w-56 p-1.5">
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Appearance</div>
        <DropdownMenuSeparator />
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = current === option.value;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                "gap-2.5 py-2 ps-2",
                isActive && "bg-primary/10 font-medium text-primary focus:bg-primary/10 focus:text-primary",
              )}
            >
              <Icon className={cn("size-4", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className="flex-1">
                <span className="block text-sm">{option.label}</span>
                <span className="block text-[11px] text-muted-foreground">{option.description}</span>
              </span>
              {isActive && <IconCheck className="size-4 shrink-0 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeOptions({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const current = (theme ?? "system") as ThemeValue;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = current === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm font-medium transition-colors",
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
            <span className="min-w-0 flex-1 truncate">{option.label}</span>
            {isActive ? (
              <IconCheck className="size-4 text-primary" />
            ) : (
              <span className="size-4 rounded-full border border-border" />
            )}
          </button>
        );
      })}
    </div>
  );
}
