export interface PricingPlan {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  pricePerEvent: string;
  periodPerEvent: string;
  priceAnnual: string;
  periodAnnual: string;
  fee: string;
  popular?: boolean;
  features: Array<{ text: string; highlight?: boolean; tag?: string }>;
  ctaText: string;
  ctaHref: string;
  ctaVariant: "default" | "outline";
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Club Starter",
    badge: "For Student Clubs & Meetups",
    tagline: "Essential infrastructure to run free workshops, meetups, and single-session gatherings.",
    pricePerEvent: "₹0",
    periodPerEvent: "free forever for free events",
    priceAnnual: "₹0",
    periodAnnual: "always free for community meetups",
    fee: "+ 2% on paid ticket transactions",
    popular: false,
    features: [
      { text: "Up to 500 attendees per event" },
      { text: "Digital ticket pass generation", tag: "PDF & Web" },
      { text: "QR gate entry verification" },
      { text: "Email pass delivery & attendee roster export" },
      { text: "Standard Razorpay / UPI gateway" },
      { text: "Community & email support" },
    ],
    ctaText: "Start Free Event",
    ctaHref: "/contact",
    ctaVariant: "outline",
  },
  {
    id: "pro",
    name: "Fest & Summit Pro",
    badge: "Most Popular for Flagship Fests",
    tagline: "The complete operational stack for college hackathons, cultural carnivals, and tech summits.",
    pricePerEvent: "₹3,999",
    periodPerEvent: "per flagship event pass",
    priceAnnual: "₹24,999",
    periodAnnual: "per year (unlimited fests)",
    fee: "+ 1.5% low transaction fee",
    popular: true,
    features: [
      { text: "Unlimited attendees & custom capacity", highlight: true },
      { text: "Official WhatsApp Cloud API pass delivery", highlight: true, tag: "Meta API" },
      { text: "Sub-second offline QR gate scanner app", highlight: true, tag: "< 400ms" },
      { text: "Multi-tier & group team registrations" },
      { text: "Dynamic promo codes & referral engine" },
      { text: "Volunteer gate accounts with isolated permissions" },
      { text: "Real-time check-in velocity dashboard" },
      { text: "Automated batch PDF certificates with verify URL" },
    ],
    ctaText: "Launch Fest Pro",
    ctaHref: "/contact",
    ctaVariant: "default",
  },
  {
    id: "enterprise",
    name: "University Enterprise",
    badge: "Campus-Wide Institutional OS",
    tagline: "Dedicated cloud infrastructure for University Deans managing 100+ events across departments.",
    pricePerEvent: "Custom",
    periodPerEvent: "tailored multi-event contract",
    priceAnnual: "Custom",
    periodAnnual: "billed annually with SLA",
    fee: "volume-tiered custom rate",
    popular: false,
    features: [
      { text: "Unlimited campus student bodies & events", highlight: true },
      { text: "Institutional SSO / SAML authentication", tag: "Security" },
      { text: "PostgreSQL double-entry audit ledger export" },
      { text: "Dedicated payment gateway & organizer sub-wallets" },
      { text: "99.99% contractual uptime SLA" },
      { text: "Dedicated account manager & on-ground ops team", highlight: true },
      { text: "Custom white-label domain & branded passes" },
      { text: "Multi-campus alumni & guest pass management" },
    ],
    ctaText: "Talk to Institutional Sales",
    ctaHref: "/contact",
    ctaVariant: "outline",
  },
];

export interface MatrixRow {
  name: string;
  starter: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

export interface MatrixCategory {
  category: string;
  rows: MatrixRow[];
}

export const PRICING_MATRIX: MatrixCategory[] = [
  {
    category: "Event & Registrations",
    rows: [
      { name: "Attendee Capacity", starter: "Up to 500", pro: "Unlimited", enterprise: "Unlimited" },
      {
        name: "Ticket Tiers (VIP, Early Bird)",
        starter: "1 Tier",
        pro: "Unlimited Tiers",
        enterprise: "Unlimited Tiers",
      },
      { name: "Team / Group Registration", starter: false, pro: true, enterprise: true },
      { name: "Custom Form Builder", starter: "Basic", pro: "Advanced + File Uploads", enterprise: "Full Enterprise" },
    ],
  },
  {
    category: "Gate Access & Scanning",
    rows: [
      {
        name: "QR Gate Scanner App",
        starter: "Online Only",
        pro: "Offline Cryptographic Sync",
        enterprise: "Multi-Gate Sync + Offline",
      },
      {
        name: "Volunteer Gate Accounts",
        starter: "1 Account",
        pro: "Unlimited Volunteers",
        enterprise: "Unlimited + RBAC",
      },
      { name: "Sub-400ms Scan Latency", starter: true, pro: true, enterprise: true },
      { name: "Double Entry Anti-Fraud", starter: true, pro: true, enterprise: true },
    ],
  },
  {
    category: "Delivery & Notifications",
    rows: [
      { name: "Email Pass Delivery", starter: true, pro: true, enterprise: true },
      {
        name: "WhatsApp Pass Delivery",
        starter: false,
        pro: "Official Meta Cloud API",
        enterprise: "Custom Sender ID",
      },
      { name: "Live Broadcast Announcements", starter: false, pro: true, enterprise: true },
      { name: "Automated PDF Certificates", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "Finance & Infrastructure",
    rows: [
      { name: "Payout Frequency", starter: "T+2 Days", pro: "Daily / Instant", enterprise: "Real-Time / Custom" },
      {
        name: "Financial Audit Ledger",
        starter: "Basic CSV",
        pro: "Audited Real-time",
        enterprise: "Full Ledger Export",
      },
      { name: "SLA Guarantee", starter: "Standard", pro: "99.9% Uptime", enterprise: "99.99% Contractual" },
      {
        name: "Support Channels",
        starter: "Email",
        pro: "Priority WhatsApp & Email",
        enterprise: "24/7 Dedicated Ops",
      },
    ],
  },
];

export const PRICING_FAQS = [
  {
    q: "Is Orgatick really free for free events?",
    a: "Yes! If you are hosting a free meetup, student workshop, or non-ticketed orientation, Orgatick is 100% free with no hidden charges or setup fees.",
  },
  {
    q: "How do platform fees and payouts work for paid events?",
    a: "For paid events, payment gateway and platform fees are deducted automatically upon successful payment. Net funds are paid out directly to your registered bank account without manual invoice delays.",
  },
  {
    q: "Can we purchase the Fest Pro plan for a single event?",
    a: "Yes. Fest Pro is available on a per-event basis with no recurring subscriptions required. You pay only for the event weekend you need.",
  },
  {
    q: "Do you offer discounts for registered student organizations?",
    a: "Yes. Student clubs and university societies receive subsidized rates and free WhatsApp credits for eligible academic fests.",
  },
];
