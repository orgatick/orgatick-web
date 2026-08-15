import type { Metadata } from "next";

const metadataConfig: Metadata = {
  metadataBase: new URL("https://orgatick.in"),
  title: {
    default: "Orgatick - Event Hosting & Management Platform",
    template: "%s | Orgatick",
  },

  description:
    "Orgatick is a modern event hosting and management platform for colleges, communities, and organizations. Create events, manage registrations, send tickets, and track attendees easily.",

  keywords: [
    "orgatick",
    "event hosting platform",
    "event management software",
    "college events platform",
    "community events",
    "event registration system",
    "organizer tools",
    "event analytics",
  ],

  applicationName: "Orgatick",
  category: "Events",
  creator: "Orgatick Team",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Orgatick - Host & Manage Events Seamlessly",
    description:
      "Create and manage events with ease. Orgatick provides powerful tools for registrations, attendee tracking, and event operations.",
    url: "https://orgatick.in",
    siteName: "Orgatick",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://orgatick.in/og_image.png",
        width: 1200,
        height: 630,
        alt: "Orgatick - Event Hosting Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Orgatick - Event Hosting Platform",
    description:
      "A modern platform to host and manage events with registrations, tickets, and analytics.",
    images: ["https://orgatick.in/og_image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "icons/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://orgatick.in",
  },
};

export default metadataConfig;
