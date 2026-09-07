import { CtaBanner } from "@/app/(marketing)/_components/cta-banner";
import type { Metadata } from "next";
import { PricingCards } from "./_components/pricing-cards";
import { PricingFaq } from "./_components/pricing-faq";
import { PricingHero } from "./_components/pricing-hero";
import { PricingMatrix } from "./_components/pricing-matrix";

export const metadata: Metadata = {
  title: "Pricing & Plans | Orgatick Event OS",
  description:
    "Explore transparent pricing for Orgatick. Free for student clubs and community meetups, with industrial-grade fest plans starting at ₹3,999.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Orgatick Pricing - Simple Plans for Every Event Scale",
    description:
      "Host free events with zero platform fees, or upgrade to Fest Pro for WhatsApp pass delivery and offline QR gate scanners.",
    url: "https://orgatick.in/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orgatick Pricing",
    description: "Transparent SaaS pricing for college fests, hackathons, and enterprise summits.",
  },
};

const pricingPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Orgatick Event Operating System",
  image: "https://orgatick.in/logo.png",
  description: "Unified SaaS platform for event ticketing, WhatsApp passes, and offline QR gate scanners.",
  brand: {
    "@type": "Brand",
    name: "Orgatick",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: "0",
    highPrice: "3999",
    offerCount: "3",
    offers: [
      {
        "@type": "Offer",
        name: "Club Starter",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Fest & Summit Pro",
        price: "3999",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    ],
  },
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(pricingPageJsonLd).replace(/</g, "\\u003c")}</script>
      <PricingHero />
      <PricingCards />
      <PricingMatrix />
      <PricingFaq />
      <CtaBanner
        badge="Instant Onboarding"
        title="Host Your First Event Free in Under 5 Minutes"
        description="Set up your registration page, configure custom ticket tiers, and dispatch digital passes automatically."
      />
    </>
  );
}
