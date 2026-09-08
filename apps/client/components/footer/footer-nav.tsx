import { IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { COMPANY_LINKS, LEGAL_LINKS, PLATFORM_LINKS, SUPPORT_CONFIG } from "./footer-constants";

export function FooterNav() {
  return (
    <>
      {/* Platform Column */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">Platform</h4>
        <ul className="space-y-2 text-xs">
          {PLATFORM_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Company Column */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">Company</h4>
        <ul className="space-y-2 text-xs">
          {COMPANY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal Column */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">Legal</h4>
        <ul className="space-y-2 text-xs">
          {LEGAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  {Icon && <Icon className="size-3.5 text-primary shrink-0" />}
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Support Column */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">Support</h4>
        <ul className="space-y-2 text-xs">
          <li>
            <a
              href={`mailto:${SUPPORT_CONFIG.email}`}
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <IconMail className="size-3.5" />
              <span>{SUPPORT_CONFIG.email}</span>
            </a>
          </li>
          <li>
            <a
              href={SUPPORT_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors inline-block"
            >
              WhatsApp Direct Support
            </a>
          </li>
          <li>
            <span className="text-muted-foreground/80">{SUPPORT_CONFIG.responseTime}</span>
          </li>
        </ul>
      </div>
    </>
  );
}
