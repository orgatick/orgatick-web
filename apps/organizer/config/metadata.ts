import type { Metadata } from "next";

const metadataConfig: Metadata = {
  metadataBase: new URL("https://orgatick.in"),
  title: {
    default: "Orgatick - All-in-One College Event Operating System & Ticketing",
    template: "%s | Orgatick",
  },

  description:
    "Orgatick is the complete SaaS event operating system for all kind of events like college hackathons, cultural fests, and summits. Eliminate spreadsheet chaos with instant digital tickets, automated WhatsApp broadcasts, sub-second QR gate check-ins, and audited financial ledgers.",

  keywords: [
    "orgatick",
    "event hosting platform",
    "event management software",
    "college fest management",
    "hackathon registration system",
    "college events platform",
    "whatsapp ticket delivery",
    "qr gate check in scanner",
    "event registration system",
    "student council event software",
    "event analytics ledger",
  ],

  applicationName: "Orgatick",
  category: "Events & SaaS",
  creator: "Orgatick Team",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Orgatick - One Platform to Discover, Operate & Measure Events",
    description:
      "Eliminate fragmented Google forms, lost payments, and venue check-in bottlenecks. Orgatick unites the complete college event lifecycle into one seamless SaaS workspace.",
    url: "https://orgatick.in",
    siteName: "Orgatick",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://orgatick.in/og_image.png",
        width: 1200,
        height: 630,
        alt: "Orgatick Event Operating System Dashboard",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Orgatick - All-in-One College Event Operating System",
    description:
      "Streamline registrations, instant WhatsApp ticket delivery, offline QR venue check-ins, and automated financial ledgers.",
    images: ["https://orgatick.in/og_image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://orgatick.in",
  },
};

export default metadataConfig;
