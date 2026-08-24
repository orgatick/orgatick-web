import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex sm:h-16 h-12 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <OrgatickLogo className="sm:h-10 sm:w-10 w-8 h-8" />
          <span className="font-heading text-xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-1.5">
            Orgatick
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#capabilities" className="hover:text-foreground transition-colors flex items-center gap-1">
            Capabilities
          </Link>
          <Link href="#lifecycle" className="hover:text-foreground transition-colors">
            Lifecycle
          </Link>
          <Link href="#solutions" className="hover:text-foreground transition-colors">
            Pillars
          </Link>
          <Link href="#architecture" className="hover:text-foreground transition-colors">
            Architecture
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-foreground transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <LinkButton
            href="#pricing"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
          >
            Sign In
          </LinkButton>
          <LinkButton href="#pricing" variant="default" className="shadow-sm shadow-primary/30 font-semibold">
            <span>Host an Event</span>
            <IconArrowUpRight className="size-4 ml-1" />
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
