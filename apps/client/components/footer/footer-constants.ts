import {
  IconCookie,
  IconFileCertificate,
  IconGavel,
  IconReceiptRefund,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";

export interface FooterLink {
  label: string;
  href: string;
  icon?: typeof IconShieldCheck;
  isExternal?: boolean;
}

export const PLATFORM_LINKS: FooterLink[] = [
  { label: "All Features", href: "/features" },
  { label: "Offline QR Scanner", href: "/features#scanner" },
  { label: "WhatsApp Pass Engine", href: "/features#whatsapp" },
  { label: "Financial Ledger", href: "/features#ledger" },
  { label: "Gate Velocity Stats", href: "/features#analytics" },
];

export const COMPANY_LINKS: FooterLink[] = [
  { label: "About Orgatick", href: "/about" },
  { label: "Pricing Plans", href: "/pricing" },
  { label: "FAQ & Help", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: "Terms of Service", href: "/terms-and-conditions", icon: IconFileCertificate },
  { label: "Privacy Policy", href: "/privacy-policy", icon: IconShieldCheck },
  { label: "Refund Policy", href: "/refund-policy", icon: IconReceiptRefund },
  { label: "Delivery Policy", href: "/delivery-policy", icon: IconTruckDelivery },
  { label: "Cookie Policy", href: "/cookie-policy", icon: IconCookie },
  { label: "Acceptable Use", href: "/acceptable-use-policy", icon: IconGavel },
];

export const SUPPORT_CONFIG = {
  email: "support@orgatick.in",
  whatsappUrl: "https://wa.me/918539863808?text=Hi%20Orgatick%20Team%2C%20I%20need%20support.",
  responseTime: "Average response < 2h",
};

export const BOTTOM_LEGAL_LINKS: FooterLink[] = [
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Refunds", href: "/refund-policy" },
  { label: "Delivery", href: "/delivery-policy" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "Acceptable Use", href: "/acceptable-use-policy" },
];
