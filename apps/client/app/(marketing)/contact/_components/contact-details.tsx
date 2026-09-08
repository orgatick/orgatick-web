"use client";

import { Badge } from "@orgatick/ui/components/badge";
import { Button } from "@orgatick/ui/components/button";
import { IconArrowUpRight, IconBrandWhatsapp, IconCheck, IconCopy, IconHeadset, IconMail } from "@tabler/icons-react";
import * as motion from "motion/react-client";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

export function ContactDetails() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(text);
      toast.success(`${label} copied to clipboard!`);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-6"
    >
      {/* Header Info */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/10 text-primary font-mono text-xs px-2.5 py-0.5"
          >
            <span className="mr-1.5 size-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
            Direct Channels
          </Badge>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Connect directly with our event specialists.
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
          Whether you want to explore the platform, discuss custom fest pricing, or require urgent gate scanning
          support, we&apos;re here.
        </p>
      </div>

      {/* Main Channel Cards */}
      <div className="grid gap-3.5">
        {/* Email Support Card */}
        <div className="group relative rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <IconMail className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base">General & Support Email</h3>
                <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                  For product questions, billing, and onboarding.
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <a
                    href="mailto:support@orgatick.in"
                    className="inline-flex items-center gap-1.5 font-medium text-xs sm:text-sm text-primary hover:underline"
                  >
                    support@orgatick.in
                    <IconArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy("support@orgatick.in", "Support email")}
              className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
              title="Copy email"
            >
              {copiedItem === "support@orgatick.in" ? (
                <IconCheck className="size-4 text-emerald-500" />
              ) : (
                <IconCopy className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {/* WhatsApp & Sales Line Card */}
        <div className="group relative rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20">
                <IconBrandWhatsapp className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-base">WhatsApp & Phone Desk</h3>
                  <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 border-0 text-[10px] px-2 py-0">
                    Fastest
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                  Talk to our sales & event team directly.
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/918539863808?text=Hi%20Orgatick%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20hosting%20events%20on%20Orgatick."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-600/20"
                  >
                    <IconBrandWhatsapp className="size-3.5" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href="tel:+918539863808"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground font-medium"
                  >
                    +91 85398 63808
                  </a>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy("+918539863808", "Phone number")}
              className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
              title="Copy phone"
            >
              {copiedItem === "+918539863808" ? (
                <IconCheck className="size-4 text-emerald-500" />
              ) : (
                <IconCopy className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Live Event Emergency Hotline Callout */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5">
          <div className="flex items-start gap-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30">
              <IconHeadset className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Live Event Emergency</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                Hosting an event today with gate scanning or pass validation questions? Ping our priority response desk
                on WhatsApp for instant resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
