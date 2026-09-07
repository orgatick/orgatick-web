import { LinkButton } from "@/components/ui/link-button";
import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <OrgatickLogo className="size-8 sm:size-10" />
          <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">Orgatick</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          <Link href="/features" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/faq" className="hover:text-foreground transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <LinkButton
            href="/login"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground font-medium"
          >
            Sign In
          </LinkButton>
          <LinkButton
            href="/contact"
            variant="default"
            size="sm"
            className="shadow-sm shadow-primary/30 font-semibold rounded-lg px-4"
          >
            <span>Host an Event</span>
            <IconArrowUpRight className="size-4 ml-1" />
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
