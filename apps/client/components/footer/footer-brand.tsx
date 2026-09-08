import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import Link from "next/link";

export function FooterBrand() {
  return (
    <div className="col-span-2 space-y-4">
      <Link href="/" className="flex items-center gap-2.5 group w-fit">
        <OrgatickLogo className="h-9 w-9 sm:h-10 sm:w-10" />
        <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">Orgatick</span>
      </Link>

      <p className="text-muted-foreground text-xs sm:text-sm max-w-sm leading-relaxed">
        The unified SaaS event operating system. Streamline registrations, instant WhatsApp &amp; email ticket delivery,
        sub-second QR venue check-ins, and audited financial ledgers.
      </p>
    </div>
  );
}
