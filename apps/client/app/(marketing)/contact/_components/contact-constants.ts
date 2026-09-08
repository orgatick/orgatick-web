import { IconCalendarEvent, IconHeadset, IconMessageCircle2, IconUsers } from "@tabler/icons-react";
import type { ContactFormData } from "./contact-schema";

export const CATEGORY_OPTIONS = [
  {
    value: "Host an event" as const,
    label: "Host an Event",
    icon: IconCalendarEvent,
    hint: "Share your event date, estimated attendees, and venue.",
  },
  {
    value: "Product support" as const,
    label: "Product Support",
    icon: IconHeadset,
    hint: "Describe the issue with ticketing, scanning, or dashboard access.",
  },
  {
    value: "Partnership" as const,
    label: "Partnership & Sales",
    icon: IconUsers,
    hint: "Tell us about your campus, company, or collaboration idea.",
  },
  {
    value: "General question" as const,
    label: "General Question",
    icon: IconMessageCircle2,
    hint: "Ask anything about Orgatick pricing, features, or roadmap.",
  },
] as const;

export const DEFAULT_CATEGORY: ContactFormData["category"] = "Host an event";
export const DEFAULT_HINT = "What are you planning, and how can we help make it happen?";
export const SUPPORT_EMAIL = "support@orgatick.in";
export const WHATSAPP_PHONE = "918539863808";
