import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import {
  IconCopyright,
  IconFileCertificate,
  IconMail,
  IconReceiptRefund,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/60 pt-16 pb-10 text-muted-foreground text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Col (Spans 2 cols on lg) */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <OrgatickLogo className="h-10 w-10 sm:h-11 sm:w-11" />
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Orgatick
              </span>
            </Link>

            <p className="text-muted-foreground text-xs sm:text-sm max-w-sm leading-relaxed">
              The unified SaaS event operating system. Streamline registrations, instant WhatsApp &amp; email ticket
              delivery, sub-second QR venue check-ins, and audited financial ledgers.
            </p>

            {/* System Status indicator */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">All Systems Operational</span>
              </div>
              <span className="text-border">•</span>
              <span className="text-[11px] font-mono text-muted-foreground">v2.4.0 Engine</span>
            </div>
          </div>

          {/* Col 1: Platform & Features */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#capabilities" className="hover:text-foreground transition-colors">
                  Event Engine
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="hover:text-foreground transition-colors">
                  Digital QR Passes
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="hover:text-foreground transition-colors">
                  Payment Ledger
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="hover:text-foreground transition-colors">
                  WhatsApp Broadcasts
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="hover:text-foreground transition-colors">
                  Gate Scanner App
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="hover:text-foreground transition-colors">
                  Real-time Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#solutions" className="hover:text-foreground transition-colors">
                  Hackathons &amp; Summits
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-foreground transition-colors">
                  College Cultural Fests
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-foreground transition-colors">
                  Technical Workshops
                </Link>
              </li>
              <li>
                <Link href="#lifecycle" className="hover:text-foreground transition-colors">
                  Attendee Journey
                </Link>
              </li>
              <li>
                <Link href="#lifecycle" className="hover:text-foreground transition-colors">
                  Organizer Command
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Governance (Active Legal Pages) */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
              Legal &amp; Policy
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-foreground transition-colors flex items-center gap-1 text-foreground/90 font-medium"
                >
                  <IconFileCertificate className="size-3.5 text-primary shrink-0" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-foreground transition-colors flex items-center gap-1 text-foreground/90 font-medium"
                >
                  <IconShieldCheck className="size-3.5 text-primary shrink-0" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="hover:text-foreground transition-colors flex items-center gap-1 text-foreground/90 font-medium"
                >
                  <IconReceiptRefund className="size-3.5 text-primary shrink-0" />
                  <span>Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery-policy"
                  className="hover:text-foreground transition-colors flex items-center gap-1 text-foreground/90 font-medium"
                >
                  <IconTruckDelivery className="size-3.5 text-primary shrink-0" />
                  <span>Delivery Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#pricing" className="hover:text-foreground transition-colors">
                  Pricing &amp; Plans
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-foreground transition-colors">
                  FAQ &amp; Knowledge Base
                </Link>
              </li>
              <li>
                <Link href="#architecture" className="hover:text-foreground transition-colors">
                  Architecture &amp; Security
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@orgatick.in"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <IconMail className="size-3.5" />
                  <span>Contact Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center md:text-left">
            <p className="flex items-center gap-1">
              <IconCopyright className="size-4 inline-block align-middle" />
              <span>{currentYear} Orgatick Platform Inc. All rights reserved.</span>
            </p>
          </div>

          {/* Quick Legal Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <Link href="/terms-and-conditions" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/refund-policy" className="hover:text-foreground transition-colors">
              Refunds
            </Link>
            <Link href="/delivery-policy" className="hover:text-foreground transition-colors">
              Delivery
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
