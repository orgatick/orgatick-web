import { IconCopyright } from "@tabler/icons-react";
import Link from "next/link";
import { BOTTOM_LEGAL_LINKS } from "./footer-constants";

export function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center md:text-left">
        <p className="flex items-center gap-1">
          <IconCopyright className="size-4 inline-block align-middle" />
          <span>{currentYear} Orgatick Platform Inc. All rights reserved.</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
        {BOTTOM_LEGAL_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
