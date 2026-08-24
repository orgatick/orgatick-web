import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/40 pt-16 pb-12 text-muted-foreground text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/40">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <OrgatickLogo className="h-12 w-12" />
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                Orgatick
              </span>
            </Link>

            <p className="text-muted-foreground text-xs sm:text-sm max-w-sm leading-relaxed">
              Orgatick is the unified SaaS operating platform bringing event discovery,
              registration, ticketing, payments, WhatsApp communication, QR verification, and
              analytics into one seamless experience.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-foreground font-medium">
                All Systems Operational
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-xs font-mono text-muted-foreground">v2.4.0 Engine</span>
            </div>
          </div>

          {/* Col 1: Platform */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider font-mono">
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
                  WhatsApp Hub
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="hover:text-foreground transition-colors">
                  Venue Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Lifecycle */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider font-mono">
              Pillars
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#solutions" className="hover:text-foreground transition-colors">
                  Discover Events
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-foreground transition-colors">
                  Operate & Ticketing
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-foreground transition-colors">
                  Measure Performance
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

          {/* Col 3: Architecture & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider font-mono">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#architecture" className="hover:text-foreground transition-colors">
                  Node.js Microservices
                </Link>
              </li>
              <li>
                <Link href="#architecture" className="hover:text-foreground transition-colors">
                  Redis Gate Caching
                </Link>
              </li>
              <li>
                <Link href="#architecture" className="hover:text-foreground transition-colors">
                  State Machine
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-foreground transition-colors">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-foreground transition-colors">
                  FAQ & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Orgatick Platform Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">Built for events & communities worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
