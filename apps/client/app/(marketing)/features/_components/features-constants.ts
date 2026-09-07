import {
  IconCertificate,
  IconChartDots,
  IconDeviceMobileMessage,
  type IconQrcode,
  IconReceiptTax,
  IconUsers,
  IconWifiOff,
} from "@tabler/icons-react";

export interface FeatureModule {
  id: string;
  badge: string;
  title: string;
  description: string;
  icon: typeof IconQrcode;
  highlights: string[];
  techSpec: string;
}

export const FEATURE_MODULES: FeatureModule[] = [
  {
    id: "scanner",
    badge: "Gate Entry Engine",
    title: "Sub-Second Offline QR Gate Scanner",
    description:
      "Verify attendee passes instantly with cryptographic tokens. Scanner continues operating seamlessly even when campus WiFi or mobile data drops completely.",
    icon: IconWifiOff,
    highlights: [
      "< 400ms scan verification latency",
      "Offline local cryptographic token cache",
      "Automatic multi-device synchronization upon reconnection",
      "Dedicated volunteer mode with zero access to organizer revenue",
    ],
    techSpec: "Ed25519 Token Validation • Local SQLite / IndexedDB Cache",
  },
  {
    id: "whatsapp",
    badge: "Instant Delivery",
    title: "Native WhatsApp Pass & Schedule Broadcasts",
    description:
      "Eliminate spam folder drops. Registered attendees receive personalized passes, dynamic QR codes, venue directions, and live schedule updates directly on WhatsApp.",
    icon: IconDeviceMobileMessage,
    highlights: [
      "Instant WhatsApp delivery via Meta Cloud API",
      "Dynamic Apple & Google Wallet passes with calendar sync",
      "Emergency push broadcasts for venue or schedule changes",
      "98%+ open rate compared to standard email",
    ],
    techSpec: "Official Meta Business API • Direct Webhook Pipeline",
  },
  {
    id: "ticketing",
    badge: "Registration Builder",
    title: "Dynamic Multi-Tier Pass & Team Builder",
    description:
      "Build custom registration flows for single attendees, hackathon teams, early-bird buyers, or VIP delegates with flexible pricing and custom fields.",
    icon: IconUsers,
    highlights: [
      "Early-bird, VIP, Regular, and Workshop tier configurations",
      "Team captain checkout with multi-member pass distribution",
      "Coupon, referral, and campus ambassador tracking codes",
      "Conditional form fields & identity verification uploads",
    ],
    techSpec: "Zod-validated dynamic forms • Atomic inventory reservations",
  },
  {
    id: "ledger",
    badge: "Finances & Settlements",
    title: "Audited Double-Entry Financial Ledger",
    description:
      "Zero mystery deductions or manual spreadsheets. Track gross collections, payment gateway charges, platform splits, and automated bank payouts in real time.",
    icon: IconReceiptTax,
    highlights: [
      "Real-time revenue settlement and payout tracking",
      "Integrated Razorpay & Stripe webhooks for instant order confirmation",
      "One-click attendee refund processing with automated pass invalidation",
      "GST compliant invoices generated automatically for colleges",
    ],
    techSpec: "PostgreSQL Double-Entry Accounting • Webhook idempotency",
  },
  {
    id: "analytics",
    badge: "Operations Center",
    title: "Live Attendance Velocity & Capacity Analytics",
    description:
      "Monitor gate throughput, peak check-in intervals, department demographics, and venue capacity in real-time from a single live dashboard.",
    icon: IconChartDots,
    highlights: [
      "Real-time throughput metrics (check-ins per minute)",
      "Multi-gate occupancy and capacity limit warnings",
      "Demographic insights and team registration completion rates",
      "One-click CSV and JSON data exports for committee reporting",
    ],
    techSpec: "Server-Sent Events (SSE) • Sub-second telemetry aggregation",
  },
  {
    id: "certificates",
    badge: "Post-Event Engine",
    title: "Automated Batch Certificate Generation",
    description:
      "Issue digitally signed, tamper-proof participation and winner certificates automatically to checked-in attendees upon event conclusion.",
    icon: IconCertificate,
    highlights: [
      "Batch PDF generation tied directly to verified gate check-in status",
      "Public verification URL for LinkedIn and portfolio embedding",
      "Custom canvas template designer with dynamic attendee placeholders",
      "Instant email and WhatsApp delivery with download links",
    ],
    techSpec: "Cryptographic Certificate Hashes • High-speed PDF Rendering",
  },
];

export const COMPARISON_ROWS = [
  {
    feature: "Gate Check-in Speed",
    googleForms: "20-45s (Manual Search)",
    legacyPlatforms: "3-8s (Online Only)",
    orgatick: "< 400ms (Sub-Second)",
  },
  {
    feature: "Offline Gate Resilience",
    googleForms: "Fails Completely",
    legacyPlatforms: "Fails on Network Loss",
    orgatick: "100% Functional Offline",
  },
  {
    feature: "Ticket Delivery Channel",
    googleForms: "Manual Email / None",
    legacyPlatforms: "Email Only (Spam Risk)",
    orgatick: "WhatsApp API + Email + Pass",
  },
  {
    feature: "Anti-Fraud & Duplicate Entry",
    googleForms: "None (Screenshots work)",
    legacyPlatforms: "Basic QR (Can be duplicated)",
    orgatick: "Encrypted Single-Use QR",
  },
  {
    feature: "Volunteer Permission Isolation",
    googleForms: "None (Full Sheet Access)",
    legacyPlatforms: "Limited RBAC",
    orgatick: "Scan-Only Volunteer Mode",
  },
  {
    feature: "Financial Reconciliation",
    googleForms: "Manual Bank Cross-check",
    legacyPlatforms: "T+7 Delayed Payouts",
    orgatick: "Audited Ledger + Instant Payouts",
  },
];
