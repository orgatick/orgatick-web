import type { Metadata } from "next";
import * as motion from "motion/react-client";
import {
  IconAlertCircle,
  IconBuildingBank,
  IconCalendarX,
  IconClock,
  IconEdit,
  IconGavel,
  IconReceiptRefund,
  IconTicket,
} from "@tabler/icons-react";
import { LegalFaqHelp } from "../components/legal-faq-help";
import { LegalHeader } from "../components/legal-header";
import { LegalSectionCard } from "../components/legal-section-card";
import { LegalSidebar } from "../components/legal-sidebar";
import { PlainEnglishSummary } from "../components/plain-english-summary";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Understand Orgatick's refund terms, event cancellation policies, processing timelines, and resolution procedures for ticket purchases.",
  alternates: {
    canonical: "/refund-policy",
  },
  openGraph: {
    title: "Refund Policy | Orgatick",
    description:
      "Understand Orgatick's refund terms, event cancellation policies, processing timelines, and resolution procedures for ticket purchases.",
    url: "https://orgatick.in/refund-policy",
    type: "website",
  },
};

const SECTIONS = [
  { id: "final-sales", number: "01", title: "General Final Sales Policy" },
  { id: "cancellations", number: "02", title: "Cancelled vs Rescheduled" },
  { id: "timelines", number: "03", title: "Refund Processing Times" },
  { id: "non-receipt", number: "04", title: "Non-Delivery Escalations" },
  { id: "payment-errors", number: "05", title: "Payment Errors & Disputes" },
  { id: "jurisdiction", number: "06", title: "Governing Law & Disputes" },
  { id: "policy-updates", number: "07", title: "Policy Modifications" },
];

const SUMMARY_BULLETS = [
  "Ticket purchases are final and non-refundable for personal changes or scheduling conflicts.",
  "If an event is officially cancelled by the host, you receive a full refund automatically.",
  "Postponed events remain valid for the new date — refunds apply only if permanently cancelled.",
  "Approved refunds return directly to your original bank/card/UPI within 5–10 business days.",
];

export default function RefundPolicyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-10"
    >
      <LegalHeader
        title="Refund Policy"
        description="Clear guidelines regarding ticket purchase finality, event cancellations, refund turnaround schedules, and payment resolution."
        effectiveDate="01 Nov 2025"
        readTime="3 min"
        badgeText="Purchases & Refunds"
        icon={<IconReceiptRefund className="size-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 xl:gap-12 items-start">
        <LegalSidebar sections={SECTIONS} readTime="3 min" effectiveDate="01 Nov 2025" />

        <div className="space-y-8 min-w-0">
          <PlainEnglishSummary bullets={SUMMARY_BULLETS} />

          <div className="space-y-6">
            <LegalSectionCard
              id="final-sales"
              number="01"
              title="General Final Sales Policy"
              icon={<IconTicket className="size-5" />}
              takeaway="All ticket purchases are final. Once a pass is generated, we cannot process refunds for personal changes of plan."
            >
              <p>
                This Refund Policy governs transactions completed through{" "}
                <strong className="text-foreground">Orgatick</strong> at{" "}
                <strong className="text-foreground">orgatick.in</strong>. By purchasing a ticket or completing
                registration, you agree to these terms.
              </p>
              <p>
                Orgatick is an event ticketing software platform that empowers hosts to manage registrations. Orgatick
                is not the host or producer of listed events and does not control on-ground scheduling, venue
                arrangements, or content delivery.
              </p>
              <p>
                Because passes and access credentials are generated immediately upon payment confirmation, ticket sales
                are strictly <strong className="text-foreground">non-refundable</strong> for voluntary withdrawals,
                duplicate registrations, conflicting commitments, or personal schedule changes.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="cancellations"
              number="02"
              title="Official Event Cancellations vs. Rescheduled Dates"
              icon={<IconCalendarX className="size-5" />}
              takeaway="If an event is permanently cancelled by the organizer, refunds are issued automatically without manual paperwork."
            >
              <p>
                If an event is <strong className="text-foreground">officially cancelled</strong> by the host and will
                not be held, Orgatick will automatically initiate a full refund of ticket face value to all registered
                attendees. You do not need to submit a support ticket.
              </p>
              <p>
                If an event is postponed or rescheduled, your original ticket and QR code remain valid for the newly
                announced date. Refunds are issued only if the event is permanently called off.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="timelines"
              number="03"
              title="Refund Timelines & Payout Methods"
              icon={<IconBuildingBank className="size-5" />}
              takeaway="Refunds are sent back to your original payment method (Card/UPI/NetBanking) within 5–10 business days."
            >
              <p>
                All eligible refunds are credited directly back to the original source method (UPI ID, credit/debit
                card, or bank account) used during checkout.
              </p>
              <p>
                Funds typically reflect in your account within{" "}
                <strong className="text-foreground">5 to 10 business days</strong>, depending on your banking
                institution&rsquo;s internal reconciliation cycles. Orgatick cannot accelerate inter-bank clearing
                speeds.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="non-receipt"
              number="04"
              title="Non-Delivery Escalations"
              icon={<IconClock className="size-5" />}
              takeaway="If you paid but didn't receive your pass, contact support within 48 hours for immediate verification and re-issue."
            >
              <p>
                Passes are delivered digitally to your email and WhatsApp within minutes. If a technical error prevents
                receipt, attendees must contact{" "}
                <a href="mailto:support@orgatick.in" className="text-primary underline">
                  support@orgatick.in
                </a>{" "}
                within 48 hours of purchase.
              </p>
              <p>
                Our team will verify the payment log in our gateway ledger and regenerate your pass without hesitation.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="payment-errors"
              number="05"
              title="Payment Errors & Dispute Handling"
              icon={<IconAlertCircle className="size-5" />}
              takeaway="Experienced a double charge? Reach out to our support team first for fast settlement before opening bank disputes."
            >
              <p>
                If you observe a duplicate charge or transaction anomaly, notify Orgatick support immediately with your
                payment reference. Verified duplicate charges will be reversed promptly.
              </p>
              <p>
                Initiating uncoordinated payment chargebacks with credit card issuers without prior contact with our
                support team may result in account review or restriction on future bookings.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="jurisdiction"
              number="06"
              title="Governing Law & Legal Jurisdiction"
              icon={<IconGavel className="size-5" />}
              takeaway="This policy is governed by the laws of India, under the jurisdiction of courts in Punjab, India."
            >
              <p>
                This Policy is governed by the substantive laws of India. Any unresolved dispute or claim arising from
                ticket refunds shall be submitted exclusively to the courts of competent jurisdiction located in Punjab,
                India.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="policy-updates"
              number="07"
              title="Policy Modifications"
              icon={<IconEdit className="size-5" />}
              takeaway="Any changes to our refund protocols will be published on this page."
            >
              <p>
                We reserve the right to revise this Refund Policy to accommodate updated banking standards or platform
                capabilities. Continued use implies agreement with the latest version.
              </p>
            </LegalSectionCard>
          </div>

          <LegalFaqHelp />
        </div>
      </div>
    </motion.div>
  );
}
