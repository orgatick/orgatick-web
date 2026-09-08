import type { Metadata } from "next";
import * as motion from "motion/react-client";
import {
  IconBuildingBank,
  IconCookie,
  IconCpu,
  IconDatabase,
  IconEdit,
  IconEye,
  IconGlobe,
  IconLock,
  IconShield,
  IconUserCheck,
} from "@tabler/icons-react";
import { LegalFaqHelp } from "../components/legal-faq-help";
import { LegalHeader } from "../components/legal-header";
import { LegalSectionCard } from "../components/legal-section-card";
import { LegalSidebar } from "../components/legal-sidebar";
import { PlainEnglishSummary } from "../components/plain-english-summary";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Orgatick's Privacy Policy to learn how we collect, use, encrypt, and safeguard your personal information when using our ticketing and event platform.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Orgatick",
    description:
      "Read Orgatick's Privacy Policy to learn how we collect, use, encrypt, and safeguard your personal information when using our ticketing and event platform.",
    url: "https://orgatick.in/privacy-policy",
    type: "website",
  },
};

const SECTIONS = [
  { id: "overview", number: "01", title: "Overview & Scope" },
  { id: "data-collected", number: "02", title: "Data We Collect" },
  { id: "how-we-use", number: "03", title: "How We Use Information" },
  { id: "data-security", number: "04", title: "Security & Encryption" },
  { id: "cookies", number: "05", title: "Cookies & Sessions" },
  { id: "third-parties", number: "06", title: "Third-Party Disclosures" },
  { id: "user-rights", number: "07", title: "User Rights & Deletion" },
  { id: "minors-crossborder", number: "08", title: "Minors & Global Data" },
  { id: "policy-changes", number: "09", title: "Policy Modifications" },
];

const SUMMARY_BULLETS = [
  "We never sell or trade your personal data to advertising brokers.",
  "Payment details are processed through PCI-DSS gateways; we never store your card PINs or CVVs.",
  "Data is encrypted in transit and at rest using modern encryption algorithms.",
  "You maintain the right to request a full copy or permanent deletion of your data anytime.",
];

export default function PrivacyPolicyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-10"
    >
      <LegalHeader
        title="Privacy Policy"
        description="We treat your privacy with extreme care. Learn how Orgatick collects, safeguards, and respects your personal and ticketing data."
        effectiveDate="01 Nov 2025"
        readTime="4 min"
        badgeText="Data Protection & Privacy"
        icon={<IconShield className="size-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 xl:gap-12 items-start">
        <LegalSidebar sections={SECTIONS} readTime="4 min" effectiveDate="01 Nov 2025" />

        <div className="space-y-8 min-w-0">
          <PlainEnglishSummary bullets={SUMMARY_BULLETS} />

          <div className="space-y-6">
            <LegalSectionCard
              id="overview"
              number="01"
              title="Overview & Scope"
              icon={<IconEye className="size-5" />}
              takeaway="This policy governs all personal data collected while using Orgatick web applications, checkout flows, and organizer dashboards."
            >
              <p>
                This Privacy Policy describes how <strong className="text-foreground">Orgatick</strong>{" "}
                (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) handles personal information collected across{" "}
                <strong className="text-foreground">orgatick.in</strong>.
              </p>
              <p>
                By registering for an event, hosting an experience, or browsing the platform, you acknowledge and agree
                to the data practices outlined in this policy. If you disagree with any terms, please discontinue using
                Orgatick.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="data-collected"
              number="02"
              title="Information We Collect"
              icon={<IconDatabase className="size-5" />}
              takeaway="We only collect data necessary to process your ticket, verify your identity at the event gate, and keep your account secure."
            >
              <ul className="list-disc list-inside space-y-2 pl-2 text-foreground/90">
                <li>
                  <strong className="text-foreground">Account & Contact Details:</strong> Full name, verified email
                  address, phone number, and university / corporate affiliation.
                </li>
                <li>
                  <strong className="text-foreground">Custom Registration Fields:</strong> Specific details requested by
                  event hosts (such as dietary preferences, team member rosters, or t-shirt sizes).
                </li>
                <li>
                  <strong className="text-foreground">Technical Telemetry:</strong> Device identifiers, browser type, IP
                  address, operating system, and authentication timestamps.
                </li>
                <li>
                  <strong className="text-foreground">Payment Records:</strong> Order IDs, amounts paid, timestamp, and
                  gateway settlement IDs. We do not store raw card numbers, CVVs, or bank login passwords.
                </li>
              </ul>
            </LegalSectionCard>

            <LegalSectionCard
              id="how-we-use"
              number="03"
              title="How We Use Your Information"
              icon={<IconCpu className="size-5" />}
              takeaway="Your data powers ticket generation, automated WhatsApp/email passes, entrance check-ins, and platform security."
            >
              <p>
                We use the data we collect to operate and refine the platform, issue encrypted QR passes, facilitate
                venue check-ins, notify you of event schedule alterations, and protect against fraudulent ticketing or
                bot registrations.
              </p>
              <p>
                Aggregated, non-identifiable usage statistics may be analyzed to improve platform reliability and load
                management.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="data-security"
              number="04"
              title="Security & Data Encryption"
              icon={<IconLock className="size-5" />}
              takeaway="All traffic is secured with TLS 1.3 encryption and stored in audited cloud infrastructure with strict access controls."
            >
              <p>
                We apply comprehensive physical, electronic, and procedural safeguards. Sensitive data transmissions are
                protected using TLS 1.3 encryption. Internal databases utilize field-level encryption at rest.
              </p>
              <p>
                Access to user data is strictly limited to authorized personnel subject to rigorous confidentiality
                agreements.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="cookies"
              number="05"
              title="Cookies & Session Management"
              icon={<IconCookie className="size-5" />}
              takeaway="We use first-party cookies only for keeping you logged in and remembering UI preferences. No invasive ad trackers."
            >
              <p>
                Orgatick employs essential first-party session cookies to ensure smooth authentication, maintain login
                states, and store light/dark mode UI preferences.
              </p>
              <p>
                You may disable cookies in your browser settings; however, certain core authenticated features may not
                function as expected.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="third-parties"
              number="06"
              title="Third-Party Disclosures & Partners"
              icon={<IconBuildingBank className="size-5" />}
              takeaway="We never sell your data. We only share required details with verified providers (payment gateway, WhatsApp API, event host)."
            >
              <p>We never monetize, rent, or sell your personal data. We share only necessary operational data with:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-foreground/90">
                <li>
                  <strong className="text-foreground">Event Organizers:</strong> Organizers receive attendee lists
                  specifically for the events you registered for.
                </li>
                <li>
                  <strong className="text-foreground">Payment Gateways:</strong> Regulated payment processors to
                  securely complete transactions.
                </li>
                <li>
                  <strong className="text-foreground">Notification Networks:</strong> WhatsApp Business API and
                  transactional email providers to deliver passes.
                </li>
              </ul>
            </LegalSectionCard>

            <LegalSectionCard
              id="user-rights"
              number="07"
              title="Your Rights & Account Deletion"
              icon={<IconUserCheck className="size-5" />}
              takeaway="You can export your profile data or request complete account deletion by reaching out to support."
            >
              <p>
                You have the full right to access your stored data, rectify mistakes, or request permanent deletion of
                your profile by contacting our Data Protection team at{" "}
                <a href="mailto:support@orgatick.in" className="text-primary underline">
                  support@orgatick.in
                </a>
                .
              </p>
              <p>
                Certain financial transaction records may be retained for statutory tax compliance and fraud prevention
                periods.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="minors-crossborder"
              number="08"
              title="Minors & Global Data Operations"
              icon={<IconGlobe className="size-5" />}
              takeaway="Orgatick is designed for users 13 and older. Data is hosted securely on regional servers."
            >
              <p>
                Orgatick does not intentionally collect information from children under 13 years of age. If discovered,
                such records are purged immediately.
              </p>
              <p>
                International attendees acknowledge that data will be processed on servers based in India or compliant
                cloud zones adhering to global data protection benchmarks.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="policy-changes"
              number="09"
              title="Policy Modifications & Alerts"
              icon={<IconEdit className="size-5" />}
              takeaway="Any material changes to our privacy practices will be updated on this page with a revised effective date."
            >
              <p>
                We may revise this Privacy Policy periodically. Significant updates will be highlighted on our platform
                and reflected in the effective date above.
              </p>
            </LegalSectionCard>
          </div>

          <LegalFaqHelp />
        </div>
      </div>
    </motion.div>
  );
}
