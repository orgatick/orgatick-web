import {
  IconAdjustments,
  IconCookie,
  IconDeviceFloppy,
  IconLock,
  IconRefresh,
  IconShieldLock,
  IconTable,
} from "@tabler/icons-react";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { LegalFaqHelp } from "../_components/legal-faq-help";
import { LegalHeader } from "../_components/legal-header";
import { LegalSectionCard } from "../_components/legal-section-card";
import { LegalSidebar } from "../_components/legal-sidebar";
import { PlainEnglishSummary } from "../_components/plain-english-summary";
import { CookieInventoryTable } from "./cookie-inventory-table";
import { COOKIE_SECTIONS, COOKIE_SUMMARY_BULLETS } from "./cookie-policy-data";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Orgatick uses cookies, session tokens, and local storage cache to secure accounts and enable offline gate check-ins.",
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: "Cookie Policy | Orgatick",
    description:
      "Learn how Orgatick uses cookies, session tokens, and local cache for secure ticketing and offline gate operations.",
    url: "https://orgatick.in/cookie-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Orgatick",
    description: "Transparent details on cookie usage, session tokens, and local offline cache on Orgatick.",
  },
};

const cookiePolicyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cookie Policy - Orgatick",
  url: "https://orgatick.in/cookie-policy",
  description: "Official Cookie Policy explaining first-party authentication, offline cache, and cookie controls.",
  publisher: {
    "@type": "Organization",
    name: "Orgatick",
    url: "https://orgatick.in",
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(cookiePolicyJsonLd).replace(/</g, "\\u003c")}</script>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-10"
      >
        <LegalHeader
          title="Cookie Policy"
          description="Transparent details on how Orgatick utilizes cookies, secure session tokens, and offline storage to power frictionless events."
          effectiveDate="01 Nov 2025"
          readTime="3 min"
          badgeText="Session & Storage Governance"
          icon={<IconCookie className="size-6" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 xl:gap-12 items-start">
          <LegalSidebar sections={COOKIE_SECTIONS} readTime="3 min" effectiveDate="01 Nov 2025" />

          <div className="space-y-8 min-w-0">
            <PlainEnglishSummary bullets={COOKIE_SUMMARY_BULLETS} />

            <div className="space-y-6">
              <LegalSectionCard
                id="overview"
                number="01"
                title="Overview & Cookie Definition"
                icon={<IconCookie className="size-5" />}
                takeaway="Cookies are small text identifiers stored by your browser to authenticate sessions and keep user preferences."
              >
                <p>
                  This Cookie Policy explains how <strong className="text-foreground">Orgatick</strong>{" "}
                  (&ldquo;we&rdquo;, &ldquo;our&rdquo;) uses cookies and browser storage technologies on{" "}
                  <strong className="text-foreground">orgatick.in</strong>.
                </p>
                <p>
                  We prioritize privacy and data minimization. We do not sell tracking profiles or use intrusive
                  commercial advertising networks.
                </p>
              </LegalSectionCard>

              <LegalSectionCard
                id="cookie-types"
                number="02"
                title="Types of Cookies We Use"
                icon={<IconShieldLock className="size-5" />}
                takeaway="We use essential authentication cookies, CSRF protection tokens, and functional UI preferences."
              >
                <ul className="list-disc list-inside space-y-2 pl-2 text-foreground/90">
                  <li>
                    <strong className="text-foreground">Strictly Necessary Cookies:</strong> Essential for login
                    authentication, ticket order checkout, and fraud protection.
                  </li>
                  <li>
                    <strong className="text-foreground">Security Cookies:</strong> Guard against CSRF attacks and
                    session hijacking.
                  </li>
                  <li>
                    <strong className="text-foreground">Functional Cookies:</strong> Remember your theme preference and
                    language settings.
                  </li>
                </ul>
              </LegalSectionCard>

              <LegalSectionCard
                id="cookie-table"
                number="03"
                title="Inventory of Cookies & Storage"
                icon={<IconTable className="size-5" />}
                takeaway="A breakdown of first-party identifiers used across the Orgatick web platform."
              >
                <CookieInventoryTable />
              </LegalSectionCard>

              <LegalSectionCard
                id="offline-cache"
                number="04"
                title="IndexedDB & Offline Gate Storage"
                icon={<IconDeviceFloppy className="size-5" />}
                takeaway="Client-side storage enables the scanner app to verify passes even when internet is completely down."
              >
                <p>
                  To support campus gates with weak cellular connectivity, our gate scanner utilizes browser IndexedDB
                  to cache cryptographic token signatures locally, enabling sub-second pass validation without real-time
                  internet calls.
                </p>
              </LegalSectionCard>

              <LegalSectionCard
                id="third-party"
                number="05"
                title="Third-Party Gateways & Webhooks"
                icon={<IconLock className="size-5" />}
                takeaway="Payment gateways (Razorpay/Stripe) set independent security cookies to process payments securely."
              >
                <p>
                  During ticket checkout, integrated PCI-DSS certified payment processors may place essential fraud
                  prevention cookies subject to their privacy guidelines.
                </p>
              </LegalSectionCard>

              <LegalSectionCard
                id="control-settings"
                number="06"
                title="Managing Your Cookie Choices"
                icon={<IconAdjustments className="size-5" />}
                takeaway="You can disable or clear cookies through browser settings, though authenticated features may stop working."
              >
                <p>
                  Most browsers allow you to inspect, delete, or block cookies. Please note that disabling essential
                  session cookies will prevent you from accessing organizer dashboards or purchasing tickets.
                </p>
              </LegalSectionCard>

              <LegalSectionCard
                id="updates-contact"
                number="07"
                title="Policy Updates & Legal Contact"
                icon={<IconRefresh className="size-5" />}
                takeaway="Questions regarding our cookie practices can be directed to support@orgatick.in."
              >
                <p>
                  We may periodically revise this policy. For inquiries, reach our Data Governance team at{" "}
                  <a href="mailto:support@orgatick.in" className="text-primary font-medium underline">
                    support@orgatick.in
                  </a>
                  .
                </p>
              </LegalSectionCard>
            </div>

            <LegalFaqHelp />
          </div>
        </div>
      </motion.div>
    </>
  );
}
