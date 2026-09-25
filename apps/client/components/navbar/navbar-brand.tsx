import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import Link from "next/link";

export function NavbarBrand() {
  return (
    <Link href="/" className="group relative flex shrink-0 select-none items-center gap-2.5">
      <span className="relative inline-flex">
        <span className="absolute inset-0 -m-1.5 rounded-2xl bg-primary/10 opacity-0 blur-md transition-all duration-300 group-hover:opacity-100" />
        <span className="relative flex items-center justify-center rounded-xl p-0.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:scale-[1.04]">
          <OrgatickLogo className="size-8 transition-transform sm:size-9" />
        </span>
      </span>

      <span className="flex items-baseline gap-0.5">
        <span className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">Orgatick</span>
        <span className="size-1.5 translate-y-[-1px] rounded-full bg-primary transition-transform duration-300 group-hover:scale-150" />
      </span>
    </Link>
  );
}
