export interface FaqItem {
  category: "all" | "scanner" | "ticketing" | "payments" | "whatsapp" | "security";
  categoryLabel: string;
  q: string;
  a: string;
}

export const FAQ_CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "scanner", label: "Gate & QR Scanner" },
  { id: "ticketing", label: "Ticketing & Forms" },
  { id: "payments", label: "Payments & Payouts" },
  { id: "whatsapp", label: "WhatsApp Passes" },
  { id: "security", label: "Security & Scale" },
] as const;

export const ALL_FAQS: FaqItem[] = [
  {
    category: "scanner",
    categoryLabel: "Gate & QR Scanner",
    q: "How does the scanner work when campus WiFi or mobile data drops?",
    a: "Orgatick's mobile scanner app caches encrypted token signatures locally on volunteer devices. Passes are verified cryptographically in under 400ms without sending a live network request. When internet connectivity returns, the app automatically synchronizes check-in logs with the central server.",
  },
  {
    category: "scanner",
    categoryLabel: "Gate & QR Scanner",
    q: "Can multiple volunteers scan tickets at different entrance gates simultaneously?",
    a: "Yes! You can deploy unlimited volunteer scanners across multiple venue gates. All devices sync state in real-time, preventing the exact same pass from being scanned twice at different entrances.",
  },
  {
    category: "scanner",
    categoryLabel: "Gate & QR Scanner",
    q: "Can volunteers see private attendee phone numbers or total event revenue?",
    a: "No. Orgatick provides Role-Based Access Control (RBAC). Gate Volunteer accounts are locked to the QR scanner interface and see only verification status, attendee name, and pass tier.",
  },
  {
    category: "ticketing",
    categoryLabel: "Ticketing & Forms",
    q: "Can we configure team and hackathon group registrations?",
    a: "Yes. Orgatick supports team registrations where a team leader completes checkout and submits details for all members. Individual QR passes are generated and distributed automatically to each member's WhatsApp and email.",
  },
  {
    category: "ticketing",
    categoryLabel: "Ticketing & Forms",
    q: "Can we set up early-bird discounts and custom promo codes?",
    a: "Yes. You can configure time-bound early-bird limits, percentage or flat discounts, and custom referral promo codes to track marketing performance across campus ambassadors.",
  },
  {
    category: "ticketing",
    categoryLabel: "Ticketing & Forms",
    q: "Can we ask custom questions or request file uploads during checkout?",
    a: "Yes. Our dynamic form builder allows you to add custom fields, college ID verification uploads, dietary preferences, T-shirt sizes, and required waivers.",
  },
  {
    category: "payments",
    categoryLabel: "Payments & Payouts",
    q: "When are ticket revenues deposited into our bank account?",
    a: "Ticket revenues flow into an audited double-entry ledger. Standard payouts are settled automatically to your registered bank account on a T+2 day schedule, while Fest Pro and Enterprise organizers can enable daily or custom settlement cycles.",
  },
  {
    category: "payments",
    categoryLabel: "Payments & Payouts",
    q: "What payment methods are supported for ticket buyers?",
    a: "We support UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and digital wallets through our integrated Razorpay and Stripe pipelines.",
  },
  {
    category: "payments",
    categoryLabel: "Payments & Payouts",
    q: "How are refunds handled if an attendee cancels?",
    a: "Organizers can initiate instant one-click refunds from the dashboard. Once refunded, the attendee's digital pass is automatically marked as invalidated in the gate scanner cache.",
  },
  {
    category: "whatsapp",
    categoryLabel: "WhatsApp Passes",
    q: "How does the automated WhatsApp delivery system work?",
    a: "Upon successful registration or payment, our Meta Cloud API integration automatically sends a personalized WhatsApp message containing the attendee's name, dynamic QR pass, event schedule, and location pin.",
  },
  {
    category: "whatsapp",
    categoryLabel: "WhatsApp Passes",
    q: "Can we send broadcast updates to all attendees for schedule changes?",
    a: "Yes! Organizers can trigger emergency schedule or venue updates directly to all registered attendees' WhatsApp numbers with a 98%+ guaranteed delivery rate.",
  },
  {
    category: "security",
    categoryLabel: "Security & Scale",
    q: "What is your platform uptime during flash ticket drops?",
    a: "Our infrastructure runs on autoscaling serverless architecture backed by Redis and distributed PostgreSQL with 99.99% guaranteed SLA uptime, handling thousands of concurrent checkouts without crashing.",
  },
  {
    category: "security",
    categoryLabel: "Security & Scale",
    q: "Can we export attendee lists and financial audit reports?",
    a: "Yes. You can export complete attendee rosters, check-in velocity logs, and GST-compliant financial ledgers to CSV and Excel format at any time.",
  },
];
