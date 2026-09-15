"use client";

import { IconClock, IconRefresh, IconTrash, IconX } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";

interface DraftBannerProps {
  lastSavedAt: string | null;
  onClearDraft: () => void;
  onDismiss: () => void;
}

export function DraftBanner({ lastSavedAt, onClearDraft, onDismiss }: DraftBannerProps) {
  if (!lastSavedAt) return null;

  const formattedTime = new Date(lastSavedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-foreground shadow-xs">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <IconClock className="size-4" />
        </div>
        <div>
          <span className="font-semibold text-primary">Draft Restored: </span>
          <span className="text-muted-foreground">
            Continuing from your previous session (auto-saved at {formattedTime}).
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClearDraft}
          className="h-7 gap-1 px-2.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <IconTrash className="size-3.5" />
          Clear Draft
        </Button>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Dismiss banner"
        >
          <IconX className="size-4" />
        </button>
      </div>
    </div>
  );
}
