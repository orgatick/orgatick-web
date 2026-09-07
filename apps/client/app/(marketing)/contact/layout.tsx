import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Us | Orgatick Support & Sales",
  description:
    "Get in touch with Orgatick for event ticketing support, partnership inquiries, and platform onboarding for your campus or flagship event.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Orgatick - Event Operations & Support",
    description:
      "Talk to the Orgatick team about event ticketing, sub-second QR scanners, WhatsApp passes, and custom partnership solutions.",
    url: "https://orgatick.in/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Orgatick",
    description: "Talk to the Orgatick team about event operations, ticketing, support, or partnerships.",
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Orgatick",
  url: "https://orgatick.in/contact",
  description: "Contact Orgatick for event platform support, product questions, partnerships, and event-hosting help.",
  mainEntity: {
    "@type": "Organization",
    name: "Orgatick",
    url: "https://orgatick.in",
    email: "support@orgatick.in",
    telephone: "+91-85398-63808",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@orgatick.in",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+91-85398-63808",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(contactPageJsonLd).replace(/</g, "\\u003c")}</script>
      <div className="pt-6 sm:pt-10 pb-16">{children}</div>
    </>
  );
}
