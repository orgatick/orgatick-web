import { CtaBanner } from "@/app/(marketing)/_components/cta-banner";
import type { Metadata } from "next";
import { FeaturesComparison } from "./_components/features-comparison";
import { FeaturesGrid } from "./_components/features-grid";
import { FeaturesHero } from "./_components/features-hero";
import { FeaturesLifecycle } from "./_components/features-lifecycle";

export const metadata: Metadata = {
  title: "Platform Features & Capabilities | Orgatick Event OS",
  description:
    "Explore Orgatick features: offline QR gate scanner, Meta Cloud WhatsApp pass delivery, multi-tier team registrations, audited ledgers, and automated certificates.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Orgatick Platform Features - The Event Operating System",
    description:
      "Deep dive into sub-second offline gate scanners, instant WhatsApp pass delivery, financial ledgers, and live velocity analytics.",
    url: "https://orgatick.in/features",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orgatick Platform Features",
    description: "The complete feature suite for campus fests, hackathons, and corporate summits.",
  },
};

const featuresPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Orgatick Event Operating System",
  operatingSystem: "Web, iOS, Android",
  applicationCategory: "BusinessApplication",
  description:
    "All-in-one event operating system offering offline QR scanning, WhatsApp ticketing, live attendance velocity, and audited ledgers.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(featuresPageJsonLd).replace(/</g, "\\u003c")}</script>
      <FeaturesHero />
      <FeaturesGrid />
      <FeaturesLifecycle />
      <FeaturesComparison />
      <CtaBanner
        badge="Ready to Experience It?"
        title="Deploy Orgatick for Your Next Event"
        description="Experience frictionless gate entry, real-time analytics, and happy attendees."
      />
    </>
  );
}
