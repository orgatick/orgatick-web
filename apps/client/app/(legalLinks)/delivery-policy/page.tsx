import type { Metadata } from "next";
import * as motion from "motion/react-client";
import {
  IconClock,
  IconEdit,
  IconInfoCircle,
  IconQrcode,
  IconRefresh,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { LegalFaqHelp } from "../components/legal-faq-help";
import { LegalHeader } from "../components/legal-header";
import { LegalSectionCard } from "../components/legal-section-card";
import { LegalSidebar } from "../components/legal-sidebar";
import { PlainEnglishSummary } from "../components/plain-english-summary";

export const metadata: Metadata = {
  title: "Digital Ticket Delivery Policy",
  description:
    "Learn how Orgatick delivers digital tickets, confirmations, and event access details electronically, including timelines, methods, and user responsibilities.",
  alternates: {
    canonical: "/delivery-policy",
  },
  openGraph: {
    title: "Digital Ticket Delivery Policy | Orgatick",
    description:
      "Learn how Orgatick delivers digital tickets, confirmations, and event access details electronically, including timelines, methods, and user responsibilities.",
    url: "https://orgatick.in/delivery-policy",
    type: "website",
  },
};

const SECTIONS = [
  { id: "digital-model", number: "01", title: "100% Digital Delivery" },
  { id: "delivery-channels", number: "02", title: "Delivery Channels" },
  { id: "timelines", number: "03", title: "Timelines & Delays" },
  { id: "user-accuracy", number: "04", title: "Contact Accuracy" },
  { id: "gate-entry", number: "05", title: "Venue Gate Admission" },
  { id: "reissue-guarantee", number: "06", title: "Reissue Guarantee" },
  { id: "policy-updates", number: "07", title: "Updates & Revisions" },
];

const SUMMARY_BULLETS = [
  "Tickets are 100% digital — zero physical paper passes or shipping fees.",
  "Delivered instantly via Email and WhatsApp upon payment completion.",
  "Your ticket contains a secure dynamic QR code scanned at the event gate.",
  "If not received in 10 minutes, our support team reissues it for free.",
];

export default function DeliveryPolicyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-10"
    >
      <LegalHeader
        title="Digital Ticket Delivery Policy"
        description="This policy explains how event passes, QR codes, and registration credentials are authenticated and dispatched across Orgatick's digital infrastructure."
        effectiveDate="01 Nov 2025"
        readTime="3 min"
        badgeText="Ticketing & Fulfillment"
        icon={<IconTruckDelivery className="size-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 xl:gap-12 items-start">
        {/* Sticky Desktop Sidebar */}
        <LegalSidebar sections={SECTIONS} readTime="3 min" effectiveDate="01 Nov 2025" />

        {/* Content Column */}
        <div className="space-y-8 min-w-0">
          <PlainEnglishSummary bullets={SUMMARY_BULLETS} />

          <div className="space-y-6">
            <LegalSectionCard
              id="digital-model"
              number="01"
              title="100% Digital Delivery Model"
              icon={<IconInfoCircle className="size-5" />}
              takeaway="We are an entirely digital ticketing system. You will never need to wait for postal mail or pay delivery courier charges."
            >
              <p>
                This Digital Ticket Delivery Policy outlines how passes, booking confirmations, and event access
                credentials are provided when an attendee completes a registration on{" "}
                <strong className="text-foreground">Orgatick</strong> at{" "}
                <strong className="text-foreground">orgatick.in</strong>.
              </p>
              <p>
                Orgatick operates solely as a digital ticketing and operations platform. We do not manufacture, print,
                or physically ship badges, paper tickets, or merchandise. Every pass issued on Orgatick is delivered in
                an encrypted digital format with a verifiable QR code.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="delivery-channels"
              number="02"
              title="Electronic Delivery Channels"
              icon={<IconTruckDelivery className="size-5" />}
              takeaway="Tickets arrive on your primary email and WhatsApp simultaneously for seamless offline and mobile access."
            >
              <p>
                Upon successful payment clearance, our notification engine initiates automatic distribution across
                multiple redundant channels:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-foreground/90">
                <li>
                  <strong className="text-foreground">Email Dispatch:</strong> An order confirmation containing your PDF
                  pass, tax invoice receipt, and calendar invite is dispatched to your registered email address.
                </li>
                <li>
                  <strong className="text-foreground">WhatsApp Hub:</strong> An interactive notification with instant
                  pass viewing and Apple Wallet / Google Wallet ready pass links is sent to your registered mobile
                  number.
                </li>
                <li>
                  <strong className="text-foreground">Gate Backup Lookup:</strong> If your mobile device battery runs
                  out or data access fails at the venue, authorized gate staff can look up your credentials via your
                  registered email or phone number.
                </li>
              </ul>
            </LegalSectionCard>

            <LegalSectionCard
              id="timelines"
              number="03"
              title="Delivery Timelines & Troubleshooting"
              icon={<IconClock className="size-5" />}
              takeaway="99.4% of passes are delivered within 60 seconds. If missing after 10 minutes, check spam or contact support."
            >
              <p>
                Digital tickets are generated immediately upon webhook confirmation from the payment gateway. In rare
                instances of peak traffic or telecom provider delays, delivery may take up to 10–15 minutes.
              </p>
              <p>If you have not received your ticket after 15 minutes:</p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-foreground/90">
                <li>Check your Spam, Junk, and Promotional email folders.</li>
                <li>Ensure WhatsApp notifications from unknown business accounts are not muted or blocked.</li>
                <li>Verify you typed your email address without typos during checkout.</li>
              </ol>
            </LegalSectionCard>

            <LegalSectionCard
              id="user-accuracy"
              number="04"
              title="Contact Information Accuracy"
              icon={<IconShieldCheck className="size-5" />}
              takeaway="Ensure your phone number and email are accurate at checkout. Orgatick cannot be responsible for typos entered during registration."
            >
              <p>
                Because ticket delivery is fully automated based on the user-submitted form data, Orgatick cannot be
                held responsible for failed deliveries resulting from misspelled email addresses or incorrect phone
                numbers.
              </p>
              <p>
                If you realize you made a typo during checkout, reach out to{" "}
                <a href="mailto:support@orgatick.in" className="text-primary underline">
                  support@orgatick.in
                </a>{" "}
                immediately with your transaction ID so our team can update your registration record.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="gate-entry"
              number="05"
              title="Venue Gate Admission & Verification"
              icon={<IconQrcode className="size-5" />}
              takeaway="Present your QR code on your smartphone screen at the venue gate for instant check-in."
            >
              <p>
                To enter an event venue, attendees must display their digital pass QR code at the registration desk or
                gate scanner. High-contrast digital screen displays and clear screenshots are accepted.
              </p>
              <p>
                Event organizers reserve the right to request valid government or student institution ID to confirm
                identity matching the registration details.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="reissue-guarantee"
              number="06"
              title="Platform Reissue Guarantee"
              icon={<IconRefresh className="size-5" />}
              takeaway="If technical issues on our end disrupt delivery, we will regenerate and re-send your passes immediately at zero cost."
            >
              <p>
                If a technical error or platform outage disrupts ticket generation after successful payment capture,
                Orgatick guarantees instant regeneration and re-issuance at zero cost to the attendee.
              </p>
              <p>
                Holding a digital pass does not alter cancellation rights. Please review our{" "}
                <a
                  href="/refund-policy"
                  className="text-primary font-medium underline underline-offset-4 hover:opacity-80"
                >
                  Refund Policy
                </a>{" "}
                for full details.
              </p>
            </LegalSectionCard>

            <LegalSectionCard
              id="policy-updates"
              number="07"
              title="Policy Revisions & Support"
              icon={<IconEdit className="size-5" />}
              takeaway="We periodically upgrade our delivery channels to incorporate newer messaging platforms and security features."
            >
              <p>
                Orgatick may update this delivery policy to reflect technical enhancements or operational requirements.
                Continued use of the platform constitutes acceptance of updated terms.
              </p>
            </LegalSectionCard>
          </div>

          <LegalFaqHelp />
        </div>
      </div>
    </motion.div>
  );
}
