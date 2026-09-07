"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { IconCheck, IconCopy, IconPrinter, IconShare } from "@tabler/icons-react";
import { toast } from "sonner";
import { Badge } from "@orgatick/ui/components/badge";
import { Button } from "@orgatick/ui/components/button";

interface LegalHeaderProps {
  title: string;
  description: string;
  effectiveDate: string;
  readTime: string;
  badgeText: string;
  icon: ReactNode;
}

export function LegalHeader({ title, description, effectiveDate, badgeText, icon }: LegalHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Page link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Orgatick`,
          text: description,
          url: window.location.href,
        });
      } catch {
        // Ignored if user dismissed share dialog
      }
    } else {
      void handleCopyLink();
    }
  };

  return (
    <header className="relative space-y-5 rounded-3xl bg-linear-to-b from-card via-card/90 to-background border border-border/70 p-6 sm:p-10 shadow-xs overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary/5 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

      {/* Top Badges & Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="px-3 py-1 text-xs font-mono font-medium">
            <span className="mr-1.5 size-2 rounded-full bg-emerald-500 animate-pulse inline-block align-middle" />
            {badgeText}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-xs font-mono">
            Effective: {effectiveDate}
          </Badge>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5 rounded-lg border border-border/50"
            title="Copy Page Link"
          >
            {copied ? <IconCheck className="size-3.5 text-emerald-500" /> : <IconCopy className="size-3.5" />}
            <span>{copied ? "Copied" : "Copy Link"}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrint}
            className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5 rounded-lg border border-border/50 hidden sm:inline-flex"
            title="Print Document"
          >
            <IconPrinter className="size-3.5" />
            <span>Print</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5 rounded-lg border border-border/50 sm:hidden"
            title="Share Policy"
          >
            <IconShare className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-3 relative">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            {icon}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-heading">
            {title}
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">{description}</p>
      </div>
    </header>
  );
}
