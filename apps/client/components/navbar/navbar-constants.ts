import { IconHelpCircle, IconLayoutDashboard, IconReceipt2, IconSettings, IconTicket } from "@tabler/icons-react";

export interface NavLinkItem {
  label: string;
  href: string;
  badge?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "attendee" | "organizer" | "admin";
  initials?: string;
}

export const MAIN_NAV_LINKS: NavLinkItem[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const USER_MENU_ITEMS = [
  {
    label: "My Passes & Tickets",
    href: "/my-tickets",
    icon: IconTicket,
  },
  {
    label: "Organizer Portal",
    href: "https://organizer.orgatick.in",
    icon: IconLayoutDashboard,
    isExternal: true,
  },
  {
    label: "Billing & Invoices",
    href: "/billing",
    icon: IconReceipt2,
  },
  {
    label: "Account Settings",
    href: "/settings",
    icon: IconSettings,
  },
  {
    label: "Help & Support",
    href: "/faq",
    icon: IconHelpCircle,
  },
];
