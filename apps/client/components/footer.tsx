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
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <OrgatickLogo className="h-9 w-9 sm:h-10 sm:w-10" />
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Orgatick
              </span>
            </Link>

            <p className="text-muted-foreground text-xs sm:text-sm max-w-sm leading-relaxed">
              The unified SaaS event operating system. Streamline registrations, instant WhatsApp &amp; email ticket
              delivery, sub-second QR venue check-ins, and audited financial ledgers.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">All Systems Operational</span>
              </div>
              <span className="text-border">&bull;</span>
              <span className="text-[11px] font-mono text-muted-foreground">v2.4.0 Engine</span>
            </div>
          </div>

          {/* Col 1: Platform */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/features" className="hover:text-foreground transition-colors">
                  All Features
                </Link>
              </li>
              <li>
                <Link href="/features#scanner" className="hover:text-foreground transition-colors">
                  Offline QR Scanner
                </Link>
              </li>
              <li>
                <Link href="/features#whatsapp" className="hover:text-foreground transition-colors">
                  WhatsApp Pass Engine
                </Link>
              </li>
              <li>
                <Link href="/features#ledger" className="hover:text-foreground transition-colors">
                  Financial Ledger
                </Link>
              </li>
              <li>
                <Link href="/features#analytics" className="hover:text-foreground transition-colors">
                  Gate Velocity Stats
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Orgatick
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ &amp; Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Policy */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <IconFileCertificate className="size-3.5 text-primary shrink-0" />
                  <span>Terms</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <IconShieldCheck className="size-3.5 text-primary shrink-0" />
                  <span>Privacy</span>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-foreground transition-colors flex items-center gap-1">
                  <IconReceiptRefund className="size-3.5 text-primary shrink-0" />
                  <span>Refunds</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery-policy"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <IconTruckDelivery className="size-3.5 text-primary shrink-0" />
                  <span>Delivery</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="mailto:support@orgatick.in"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <IconMail className="size-3.5" />
                  <span>support@orgatick.in</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918539863808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 transition-colors"
                >
                  WhatsApp Direct Support
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/80">Average response &lt; 2h</span>
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
