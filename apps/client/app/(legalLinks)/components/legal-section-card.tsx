"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { IconCheck, IconHash, IconSparkles } from "@tabler/icons-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";

interface LegalSectionCardProps {
  id: string;
  number: string;
  title: string;
  icon: ReactNode;
  takeaway?: string;
  children: ReactNode;
}

export function LegalSectionCard({ id, number, title, icon, takeaway, children }: LegalSectionCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAnchor = async () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(`Copied link to section ${number}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <section id={id} className="scroll-mt-24">
      <Card className="group relative border-border/70 bg-card hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md overflow-hidden">
        {/* Subtle accent top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center h-8 w-8 rounded-xl bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20">
                {number}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-primary">{icon}</span>
                <CardTitle className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
                  {title}
                </CardTitle>
              </div>
            </div>

            {/* Copy Anchor link */}
            <button
              type="button"
              onClick={handleCopyAnchor}
              className="opacity-60 group-hover:opacity-100 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
              title="Copy link to section"
              aria-label={`Copy link to section ${title}`}
            >
              {copied ? <IconCheck className="size-4 text-emerald-500" /> : <IconHash className="size-4" />}
            </button>
          </div>

          {/* Key Takeaway Callout Pill */}
          {takeaway && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-muted/40 p-2.5 sm:p-3 border border-border/40 text-xs sm:text-sm text-foreground/80">
              <IconSparkles className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-primary font-semibold mr-1">In summary:</strong>
                <span>{takeaway}</span>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-2 text-sm sm:text-base leading-relaxed text-muted-foreground space-y-3">
          {children}
        </CardContent>
      </Card>
    </section>
  );
}
