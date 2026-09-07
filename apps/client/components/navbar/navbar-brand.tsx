import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import Link from "next/link";

export function NavbarBrand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none shrink-0">
      <div className="relative flex items-center justify-center">
        <OrgatickLogo className="size-8 sm:size-9 transition-transform group-hover:scale-105" />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">Orgatick</span>
        <span className="hidden sm:inline-flex rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-primary">
          v2.4
        </span>
      </div>
    </Link>
  );
}
