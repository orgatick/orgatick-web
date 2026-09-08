export interface CookieItem {
  name: string;
  type: "Essential" | "Security" | "Functional" | "Cache";
  purpose: string;
  duration: string;
}

export const COOKIE_SECTIONS = [
  { id: "overview", number: "01", title: "Overview & Cookie Definition" },
  { id: "cookie-types", number: "02", title: "Types of Cookies We Use" },
  { id: "cookie-table", number: "03", title: "Inventory of Cookies & Storage" },
  { id: "offline-cache", number: "04", title: "IndexedDB & Offline Gate Storage" },
  { id: "third-party", number: "05", title: "Third-Party Gateways & Webhooks" },
  { id: "control-settings", number: "06", title: "Managing Your Cookie Choices" },
  { id: "updates-contact", number: "07", title: "Policy Updates & Legal Contact" },
];

export const COOKIE_SUMMARY_BULLETS = [
  "Orgatick never uses third-party marketing or behavioral advertising tracking cookies.",
  "Essential cookies are strictly required to authenticate user sessions and secure payment checkouts.",
  "Offline gate check-in tokens are saved in IndexedDB / LocalStorage for sub-second offline gate resilience.",
  "You can disable non-essential storage via your browser settings at any time.",
];

export const COOKIE_INVENTORY: CookieItem[] = [
  {
    name: "orgatick_session",
    type: "Essential",
    purpose: "Maintains encrypted attendee and organizer login state across page views.",
    duration: "30 days / Session",
  },
  {
    name: "csrf_token",
    type: "Security",
    purpose: "Prevents cross-site request forgery attacks on registration and checkout forms.",
    duration: "Session",
  },
  {
    name: "theme_preference",
    type: "Functional",
    purpose: "Remembers user interface preferences such as dark or light color modes.",
    duration: "1 year",
  },
  {
    name: "gate_cache_tokens",
    type: "Cache",
    purpose: "Stores cryptographic QR signatures locally for offline gate scanner operation.",
    duration: "Event Duration",
  },
];
