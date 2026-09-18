import type { Icon } from "@tabler/icons-react";
import {
  IconDevices,
  IconHelpCircle,
  IconInfoCircle,
  IconLayoutDashboard,
  IconMail,
  IconReceipt2,
  IconSettings,
  IconSparkles,
  IconTicket,
  IconUser,
} from "@tabler/icons-react";

export const NAV_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface NavLinkItem {
  label: string;
  href: string;
  badge?: string;
  icon?: Icon;
}

export interface UserMenuItem {
  label: string;
  href: string;
  icon: Icon;
  isExternal?: boolean;
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
  { label: "Features", href: "/features", icon: IconSparkles },
  { label: "Pricing", href: "/pricing", icon: IconReceipt2 },
  { label: "About", href: "/about", icon: IconInfoCircle },
  { label: "FAQ", href: "/faq", icon: IconHelpCircle },
  { label: "Contact", href: "/contact", icon: IconMail },
];

export const USER_MENU_ITEMS: UserMenuItem[] = [
  {
    label: "My Profile",
    href: "/profile",
    icon: IconUser,
  },
  {
    label: "Active Sessions",
    href: "/sessions",
    icon: IconDevices,
  },
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
