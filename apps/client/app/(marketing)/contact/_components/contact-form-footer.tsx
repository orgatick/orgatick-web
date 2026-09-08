"use client";

import { Button } from "@orgatick/ui/components/button";
import { IconArrowUpRight, IconBrandWhatsapp, IconLoader2, IconMail, IconSend } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";
import { SUPPORT_EMAIL, WHATSAPP_PHONE } from "./contact-constants";
import type { ContactFormData } from "./contact-schema";

export function ContactFormFooter() {
  const {
    formState: { isSubmitting },
  } = useFormContext<ContactFormData>();

  return (
    <>
      <div className="flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
          <span>No spam guarantee &bull; Avg response under 2h</span>
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="shrink-0 h-11 px-6 font-semibold shadow-md shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          {isSubmitting ? (
            <>
              <IconLoader2 className="size-4 animate-spin mr-1.5" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <IconSend className="size-4 ml-1.5" />
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <IconMail className="size-3.5" />
          Direct Email: {SUPPORT_EMAIL}
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=Hi%20Orgatick%20Team%2C%20I%20have%20an%20inquiry.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors"
        >
          <IconBrandWhatsapp className="size-3.5" />
          WhatsApp Fast Track
          <IconArrowUpRight className="size-3" />
        </a>
      </div>
    </>
  );
}
