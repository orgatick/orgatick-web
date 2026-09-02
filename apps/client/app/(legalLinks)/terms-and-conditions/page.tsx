import type { Metadata } from "next";
import * as motion from "motion/react-client";
import {
  IconAlertTriangle,
  IconBan,
  IconChecklist,
  IconCopyright,
  IconEdit,
  IconFileCertificate,
  IconGavel,
  IconLock,
  IconScale,
  IconTicket,
  IconUsers,
} from "@tabler/icons-react";
import { LegalFaqHelp } from "../components/legal-faq-help";
import { LegalHeader } from "../components/legal-header";
import { LegalSectionCard } from "../components/legal-section-card";
import { LegalSidebar } from "../components/legal-sidebar";
import { PlainEnglishSummary } from "../components/plain-english-summary";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read Orgatick's Terms and Conditions to understand platform usage rules, user responsibilities, limitations of liability, and acceptable use policies.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions | Orgatick",
    description:
      "Read Orgatick's Terms and Conditions to understand platform usage rules, user responsibilities, limitations of liability, and acceptable use policies.",
    url: "https://orgatick.in/terms-and-conditions",
    type: "website",
  },
};

const SECTIONS = [
  { id: "acceptance", number: "01", title: "Acceptance of Terms" },
  { id: "platform-role", number: "02", title: "Platform Role & Eligibility" },
  { id: "organizer-rules", number: "03", title: "Organizer Commitments" },
  { id: "payments", number: "04", title: "Payments & Settlements" },
  { id: "ticket-sales", number: "05", title: "Ticket Purchase Finality" },
  { id: "ip-rights", number: "06", title: "Intellectual Property" },
  { id: "liability", number: "07", title: "Limitation of Liability" },
  { id: "termination", number: "08", title: "Suspension & Termination" },
  { id: "governing-law", number: "09", title: "Governing Law & Disputes" },
  { id: "updates", number: "10", title: "Term Updates & Revisions" },
];

const SUMMARY_BULLETS = [
  "Orgatick is the software tool powering event registration; organizers independently manage their own events.",
  "Users must be 18+ or have authorized guardian consent to create accounts and book tickets.",
  "Payment transactions are secured via PCI-DSS compliant payment gateways.",
  "Purchased tickets are non-refundable unless the host permanently cancels the event.",
];

export default function TermsAndConditionsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-10"
    >
      <LegalHeader
        title="Terms & Conditions"
        description="The formal usage agreement establishing the rules, rights, and responsibilities between you, event organizers, and the Orgatick platform."
        effectiveDate="01 Nov 2025"
        readTime="5 min"
        badgeText="Legal & Governance"
        icon={<IconFileCertificate className="size-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 xl:gap-12 items-start">
        <LegalSidebar sections={SECTIONS} readTime="5 min" effectiveDate="01 Nov 2025" />

        <div className="space-y-8 min-w-0">
          <PlainEnglishSummary bullets={SUMMARY_BULLETS} />

          <div className="space-y-6">
            <LegalSectionCard
              id="acceptance"
              number="01"
              title="Acceptance of Platform Terms"
              icon={<IconScale className="size-5" />}
              takeaway="By accessing, browsing, or using Orgatick in any way, you agree to follow these Terms and our Privacy Policy."
            >
              <p>
                These Terms &amp; Conditions (&ldquo;Terms&rdquo;) establish the legally binding agreement between you
                and <strong className="text-foreground">Orgatick</strong> (&ldquo;Platform&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;), hosted at <strong className="text-foreground">orgatick.in</strong>.
              </p>
              <p>
                Whether you access the platform as an attendee, organizer, or visitor, using Orgatick confirms that you
                have read, understood, and agreed to be bound by these Terms. If you do not consent, you must stop using
                the Platform immediately.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="platform-role"
              number="02"
              title="Platform Role & User Eligibility"
              icon={<IconUsers className="size-5" />}
              takeaway="Orgatick provides the SaaS platform. Event hosts independently determine their event pricing, rules, and schedules."
            >
              <p>
                Orgatick is a software-as-a-service (SaaS) provider facilitating event publication, attendee
                registrations, ticketing, and venue check-in verification. Orgatick is not an event organizer, venue
                owner, or host. All event content, pricing, eligibility restrictions, and venue rules are determined
                independently by organizers.
              </p>
              <p>
                Users must be at least 18 years old or have verifiable legal guardian permission. You are responsible
                for safeguarding your login credentials and for all activities under your account.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="organizer-rules"
              number="03"
              title="Organizer Commitments & Standards"
              icon={<IconChecklist className="size-5" />}
              takeaway="Organizers must ensure all listed events are lawful, safe, truthful, and accurately represented."
            >
              <p>
                Organizers listing events on Orgatick represent that all events adhere to applicable safety laws, local
                regulations, and institutional codes of conduct. Misleading, unlawful, or deceptive listings are
                strictly prohibited.
              </p>
              <p>
                Organizers are solely liable for fulfilling advertised event experiences, managing on-site crowds, and
                adhering to statutory tax obligations.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="payments"
              number="04"
              title="Ticketing, Processing & Settlement"
              icon={<IconLock className="size-5" />}
              takeaway="Payments are handled by certified payment gateways. Statements may display 'Abhishek Kumar Mandal' as the legal merchant entity."
            >
              <p>
                Paid event registrations are processed through PCI-DSS certified payment gateways. Orgatick never stores
                debit/credit card credentials, CVVs, or bank security credentials. Standard platform convenience charges
                may apply.
              </p>
              <p>
                Users acknowledge that bank statements, card statements, or gateway SMS confirmations may display the
                legal name <strong className="text-foreground">&ldquo;Abhishek Kumar Mandal&rdquo;</strong> as the
                verified merchant account holder.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="ticket-sales"
              number="05"
              title="Ticket Purchase Finality & Cancellations"
              icon={<IconTicket className="size-5" />}
              takeaway="All ticket sales are non-refundable unless the event is officially cancelled by the host."
            >
              <p>
                All ticket purchases made via Orgatick are final once confirmed. Tickets cannot be cancelled,
                transferred, or refunded for discretionary personal reasons.
              </p>
              <p>
                Refunds are granted only if an event is officially called off by the organizer and not rescheduled, in
                accordance with our{" "}
                <a
                  href="/refund-policy"
                  className="text-primary font-medium underline underline-offset-4 hover:opacity-80"
                >
                  Refund Policy
                </a>
                .
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="ip-rights"
              number="06"
              title="Platform Intellectual Property"
              icon={<IconCopyright className="size-5" />}
              takeaway="All Orgatick designs, brand elements, code, and systems are proprietary and protected by copyright laws."
            >
              <p>
                The Orgatick platform, brand assets, logos, design systems, algorithms, and interface elements are
                protected under copyright, trademark, and intellectual property laws. You may not scrape, copy, modify,
                distribute, or reverse-engineer our systems without prior written consent.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="liability"
              number="07"
              title="Limitation of Liability"
              icon={<IconAlertTriangle className="size-5" />}
              takeaway="Orgatick provides software 'as-is' and is not liable for on-ground event disputes, delays, or organizer cancellations."
            >
              <p>
                Orgatick is provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis. To the maximum
                extent permitted by law, Orgatick is not liable for indirect, punitive, or consequential damages
                resulting from platform downtime, telecom failures, or event disruptions.
              </p>
              <p>
                Our aggregate liability for any claim is capped at the platform fee retained for the specific
                transaction in question.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="termination"
              number="08"
              title="Account Suspension & Termination"
              icon={<IconBan className="size-5" />}
              takeaway="We reserve the right to suspend accounts that engage in fraud, abuse, spam, or Terms violations."
            >
              <p>
                We reserve the right to suspend or terminate platform access immediately if a user violates these Terms,
                engages in fraudulent activity, attempts to exploit our ticketing infrastructure, or compromises the
                security of other attendees.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="governing-law"
              number="09"
              title="Governing Law & Legal Jurisdiction"
              icon={<IconGavel className="size-5" />}
              takeaway="These Terms are governed by Indian law, with exclusive dispute resolution jurisdiction in Punjab, India."
            >
              <p>
                These Terms are governed by and construed in accordance with the laws of India. Any legal action or
                dispute arising out of these Terms shall be subject exclusively to the courts of competent jurisdiction
                located in Punjab, India.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="updates"
              number="10"
              title="Term Updates & Revisions"
              icon={<IconEdit className="size-5" />}
              takeaway="We periodically update these Terms to reflect product changes. Continued usage signifies acceptance."
            >
              <p>
                We may revise these Terms from time to time. Updates become effective immediately upon posting to this
                page. Your continued use of Orgatick following an update signifies your acceptance.
              </p>
            </LegalSectionCard>
          </div>

          <LegalFaqHelp />
        </div>
      </div>
    </motion.div>
  );
}
