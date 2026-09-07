import { CtaBanner } from "@/app/(marketing)/_components/cta-banner";
import type { Metadata } from "next";
import { AboutHero } from "./_components/about-hero";
import { AboutMetrics } from "./_components/about-metrics";
import { AboutMission } from "./_components/about-mission";
import { AboutPillars } from "./_components/about-pillars";
import { AboutTimeline } from "./_components/about-timeline";

export const metadata: Metadata = {
  title: "About Orgatick | Mission-Critical Event Operating System",
  description:
    "Discover how Orgatick eliminates gate queues, counterfeit passes, and financial chaos with sub-second offline QR scanning and instant WhatsApp pass delivery.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Orgatick - The Event Operating System",
    description:
      "Orgatick powers high-throughput event operations, offline QR scanners, and WhatsApp ticketing for universities, summits, and hackathons.",
    url: "https://orgatick.in/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Orgatick",
    description: "The mission-critical event operating system for frictionless campus and conference gates.",
  },
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Orgatick",
  url: "https://orgatick.in/about",
  description:
    "Orgatick is the mission-critical event operating system engineered to eliminate gate queues, fake paper passes, and payout delays.",
  mainEntity: {
    "@type": "Organization",
    name: "Orgatick",
    url: "https://orgatick.in",
    logo: "https://orgatick.in/logo.png",
    founder: {
      "@type": "Person",
      name: "Orgatick Engineering Team",
    },
    sameAs: ["https://twitter.com/orgatick", "https://linkedin.com/company/orgatick"],
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(aboutPageJsonLd).replace(/</g, "\\u003c")}</script>
      <AboutHero />
      <AboutMetrics />
      <AboutMission />
      <AboutPillars />
      <AboutTimeline />
      <CtaBanner
        badge="Join The Movement"
        title="Ready to Transform Your Campus or Flagship Event?"
        description="Launch free registration forms or configure enterprise multi-gate scanners in minutes."
      />
    </>
  );
}
