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

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const current = (theme ?? "system") as ThemeValue;
  const CurrentIcon = THEME_OPTIONS.find((option) => option.value === current)?.icon ?? IconDeviceDesktop;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Switch theme"
            title="Switch theme"
            className="aria-expanded:bg-muted/80"
          >
            <CurrentIcon className="size-4.5" />
          </Button>
        }
        className={"hidden lg:flex"}
      />
      <DropdownMenuContent align="end" sideOffset={8} className="w-48 p-1.5">
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
