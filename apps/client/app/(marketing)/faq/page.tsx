import { CtaBanner } from "@/app/(marketing)/_components/cta-banner";
import type { Metadata } from "next";
import { ALL_FAQS } from "./_components/faq-constants";
import { FaqFilterList } from "./_components/faq-filter-list";
import { FaqHero } from "./_components/faq-hero";
import { FaqSupportStrip } from "./_components/faq-support-strip";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Orgatick Event OS",
  description:
    "Everything you need to know about Orgatick: offline QR gate verification, WhatsApp digital pass delivery, settlement timelines, and student discounts.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Orgatick FAQ - Questions & Answers",
    description:
      "Find answers regarding gate scanning, offline sync, WhatsApp pass delivery, payment reconciliation, and college fests.",
    url: "https://orgatick.in/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orgatick FAQ",
    description: "Got questions about deploying Orgatick? Explore our complete knowledge base.",
  },
};

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(faqPageJsonLd).replace(/</g, "\\u003c")}</script>
      <FaqHero />
      <FaqFilterList />
      <FaqSupportStrip />
      <CtaBanner
        badge="Ready to Get Started?"
        title="Deploy Orgatick for Your Next Flagship Event"
        description="Launch registration forms in minutes and experience frictionless gate entry."
      />
    </>
  );
}
