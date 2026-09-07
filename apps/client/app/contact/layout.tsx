import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Orgatick for event platform support, product questions, partnership enquiries, and help hosting your next event.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Orgatick",
    description: "Talk to the Orgatick team about event operations, ticketing, support, or partnerships.",
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
    <div className="flex min-h-screen flex-col overflow-x-clip bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <script type="application/ld+json">{JSON.stringify(contactPageJsonLd).replace(/</g, "\\u003c")}</script>
      <Navbar />
      <main className="flex-1 min-w-0 pt-4">{children}</main>
      <Footer />
    </div>
  );
}
