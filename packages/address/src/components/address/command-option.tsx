"use client";

import type { ReactNode } from "react";
import { IconCheck } from "@tabler/icons-react";

import { CommandItem } from "@orgatick/ui/components/command";
import { cn } from "@orgatick/ui/lib/utils";

export interface CommandOptionProps {
  value: string;
  icon: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  selected?: boolean;
  onSelect: () => void;
  className?: string;
}

export function CommandOption({ value, icon, title, subtitle, selected, onSelect, className }: CommandOptionProps) {
  return (
    <CommandItem
      value={value}
      onSelect={onSelect}
      className={cn("group cursor-pointer gap-3 rounded-lg px-2 py-2 transition-colors", className)}
    >
      <span className="flex size-6 shrink-0 items-center justify-center text-current">{icon}</span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{title}</span>
        {subtitle && <span className="block truncate text-xs">{subtitle}</span>}
      </span>

      <IconCheck
        className={cn("size-4 shrink-0 transition-all", selected ? "scale-100 opacity-100" : "scale-75 opacity-0")}
      />
    </CommandItem>
  );
}
