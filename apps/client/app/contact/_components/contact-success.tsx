"use client";

import { Button } from "@orgatick/ui/components/button";
import {
  IconArrowUpRight,
  IconBrandWhatsapp,
  IconCheck,
  IconCopy,
  IconSparkles,
  IconTicket,
} from "@tabler/icons-react";
import * as motion from "motion/react-client";
import { useState } from "react";
import { toast } from "sonner";
import { WHATSAPP_PHONE } from "./contact-constants";
import type { ContactFormData } from "./contact-schema";

export interface SubmissionResult {
  ticketId: string;
  data: ContactFormData;
  submittedAt: string;
}

interface ContactSuccessProps {
  result: SubmissionResult;
  onReset: () => void;
}

export function ContactSuccess({ result, onReset }: ContactSuccessProps) {
  const [copiedTicket, setCopiedTicket] = useState(false);
  const { ticketId, data, submittedAt } = result;

  const whatsappFollowupUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Hi Orgatick Team, I have submitted inquiry ticket #${ticketId} regarding ${data.category}. My email is ${data.email}.`,
  )}`;

  const handleCopyTicketId = async () => {
    try {
      await navigator.clipboard.writeText(ticketId);
      setCopiedTicket(true);
      toast.success("Ticket ID copied to clipboard!");
      setTimeout(() => setCopiedTicket(false), 2000);
    } catch {
      toast.error("Failed to copy Ticket ID");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex min-h-[480px] flex-col items-center justify-center gap-6 px-2 py-6 text-center sm:px-6"
    >
      {/* Success Icon */}
      <div className="relative">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/25">
          <IconCheck className="size-8" />
        </div>
        <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <IconSparkles className="size-3" />
        </span>
      </div>

      {/* Main Confirmation */}
      <div className="flex max-w-md flex-col gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Inquiry Received!</h3>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Thank you, <strong className="text-foreground">{data.name}</strong>. Your inquiry has been routed to our event
          operations team.
        </p>
      </div>

      {/* Ticket ID Badge & Reference Card */}
      <div className="w-full max-w-md space-y-3 rounded-2xl border border-border/80 bg-muted/30 p-4 sm:p-5 text-left text-sm">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <IconTicket className="size-4.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Support Ticket ID
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyTicketId}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background px-2.5 py-1 text-xs font-mono font-bold text-primary shadow-xs transition-colors hover:bg-muted cursor-pointer"
          >
            <span>{ticketId}</span>
            {copiedTicket ? (
              <IconCheck className="size-3.5 text-emerald-500" />
            ) : (
              <IconCopy className="size-3.5 text-muted-foreground" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">Topic:</span>
            <p className="font-medium text-foreground">{data.category}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Logged At:</span>
            <p className="font-medium text-foreground">{submittedAt}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Contact Email:</span>
            <p className="truncate font-medium text-foreground">{data.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Expected SLA:</span>
            <p className="font-medium text-emerald-600">&lt; 2 Hours</p>
          </div>
        </div>

        <div className="border-t border-border/60 pt-2.5">
          <span className="text-xs text-muted-foreground">Message Excerpt:</span>
          <p className="mt-0.5 line-clamp-2 text-xs italic text-foreground/80">&ldquo;{data.message}&rdquo;</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={whatsappFollowupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98]"
        >
          <IconBrandWhatsapp className="size-4.5" />
          Fast-Track on WhatsApp
          <IconArrowUpRight className="size-4" />
        </a>

        <Button type="button" variant="outline" onClick={onReset} className="rounded-xl">
          Submit Another Inquiry
        </Button>
      </div>

      {/* Bottom Note */}
      <p className="text-xs text-muted-foreground">
        An automated confirmation has been queued for <span className="font-medium text-foreground">{data.email}</span>.
      </p>
    </motion.div>
  );
}
