import {
  IconAlertTriangle,
  IconBan,
  IconCpu,
  IconGavel,
  IconMailCheck,
  IconReceiptTax,
  IconShieldLock,
} from "@tabler/icons-react";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { LegalFaqHelp } from "../_components/legal-faq-help";
import { LegalHeader } from "../_components/legal-header";
import { LegalSectionCard } from "../_components/legal-section-card";
import { LegalSidebar } from "../_components/legal-sidebar";
import { PlainEnglishSummary } from "../_components/plain-english-summary";
import { AUP_SECTIONS, AUP_SUMMARY_BULLETS, PROHIBITED_CATEGORIES } from "./aup-data";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "Read Orgatick's Acceptable Use Policy outlining prohibited activities, anti-scalping standards, and system security rules for organizers and attendees.",
  alternates: { canonical: "/acceptable-use-policy" },
  openGraph: {
    title: "Acceptable Use Policy | Orgatick",
    description:
      "Guidelines and platform conduct standards for event organizers, attendees, and gate staff on Orgatick.",
    url: "https://orgatick.in/acceptable-use-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acceptable Use Policy | Orgatick",
    description: "Anti-scalping, security integrity, and event hosting standards on Orgatick.",
  },
};

const aupJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Acceptable Use Policy - Orgatick",
  url: "https://orgatick.in/acceptable-use-policy",
  description: "Official Acceptable Use Policy detailing safety standards, anti-bot rules, and prohibited activities.",
  publisher: {
    "@type": "Organization",
    name: "Orgatick",
    url: "https://orgatick.in",
  },
};

export default function AcceptableUsePolicyPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(aupJsonLd).replace(/</g, "\\u003c")}</script>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-10"
      >
        <LegalHeader
          title="Acceptable Use Policy"
          description="Clear standards governing permissible use of the Orgatick ticketing engine, offline gate scanners, and communication APIs."
          effectiveDate="01 Nov 2025"
          readTime="4 min"
          badgeText="Platform Integrity & Safety"
          icon={<IconShieldLock className="size-6" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 xl:gap-12 items-start">
          <LegalSidebar sections={AUP_SECTIONS} readTime="4 min" effectiveDate="01 Nov 2025" />

          <div className="space-y-8 min-w-0">
            <PlainEnglishSummary bullets={AUP_SUMMARY_BULLETS} />

            <div className="space-y-6">
              <LegalSectionCard
                id="purpose"
                number="01"
                title="Purpose & Application"
                icon={<IconGavel className="size-5" />}
                takeaway="Applies to all organizers, attendees, volunteers, and API developers interacting with Orgatick."
              >
                <p>
                  This Acceptable Use Policy (<strong className="text-foreground">&ldquo;AUP&rdquo;</strong>) defines
                  mandatory operational and safety rules across the{" "}
                  <strong className="text-foreground">Orgatick</strong> event operating system.
                </p>
                <p>
                  By creating an event, issuing passes, or purchasing tickets, you agree to comply with this AUP in
                  full.
                </p>
              </LegalSectionCard>

              <LegalSectionCard
                id="prohibited-events"
                number="02"
                title="Prohibited Event Categories"
                icon={<IconBan className="size-5" />}
                takeaway="Events that are fraudulent, illegal, predatory, or violate campus safety guidelines are prohibited."
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
                  {PROHIBITED_CATEGORIES.map((cat) => (
                    <div key={cat.title} className="rounded-xl border border-border/70 bg-card p-3 space-y-1">
                      <h4 className="font-semibold text-xs text-foreground">{cat.title}</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{cat.description}</p>
                    </div>
                  ))}
                </div>
              </LegalSectionCard>

              <LegalSectionCard
                id="anti-scalping"
                number="03"
                title="Anti-Scalping & Bot Prevention"
                icon={<IconAlertTriangle className="size-5" />}
                takeaway="Automated scripts, mass bot purchases, and unofficial ticket scalping are strictly forbidden."
              >
                <p>
                  Orgatick deploys rate limiters and cryptographic token inspection to detect bot checkout attempts. Any
                  passes acquired via automated scrapers or unauthorized third-party scalpers will be invalidated at the
                  entrance gate.
                </p>
              </LegalSectionCard>

              <LegalSectionCard
                id="system-abuse"
                number="04"
                title="Scanner & API Integrity"
                icon={<IconCpu className="size-5" />}
                takeaway="Do not reverse engineer offline scanners, tamper with cryptographic tokens, or overload endpoints."
              >
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-foreground/90">
                  <li>Never attempt to spoof or forge cryptographic QR signatures.</li>
                  <li>Do not launch denial-of-service (DoS) attacks or automated stress scripts.</li>
                  <li>Do not share scanner volunteer access tokens with unauthorized external parties.</li>
                </ul>
              </LegalSectionCard>

              <LegalSectionCard
                id="financial-conduct"
                number="05"
                title="Financial Conduct & Anti-Fraud"
                icon={<IconReceiptTax className="size-5" />}
                takeaway="Organizers must honor event commitments and adhere to transparent financial accounting."
              >
                <p>
                  Organizers are legally bound to deliver advertised event experiences. Intentional unannounced
                  cancellations, fabricated refund claims, or money laundering attempts trigger immediate merchant
                  account suspension and legal action.
                </p>
              </LegalSectionCard>

              <LegalSectionCard
                id="enforcement"
                number="06"
                title="Enforcement & Account Suspension"
                icon={<IconShieldLock className="size-5" />}
                takeaway="Violations result in immediate event cancellation, pass invalidation, and fund withholdings."
              >
                <p>
                  Orgatick reserves the right to terminate accounts, revoke access, and freeze pending payouts for any
                  confirmed violation of this policy without prior notice.
                </p>
              </LegalSectionCard>

              <LegalSectionCard
                id="reporting"
                number="07"
                title="Reporting Violations & Inquiries"
                icon={<IconMailCheck className="size-5" />}
                takeaway="Report suspicious events or security violations directly to trust@orgatick.in or support@orgatick.in."
              >
                <p>
                  To report an unauthorized or predatory event, contact our Trust &amp; Safety division at{" "}
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
