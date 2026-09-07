import { NavbarAuth } from "./navbar/navbar-auth";
import { NavbarBrand } from "./navbar/navbar-brand";
import { NavbarLinks } from "./navbar/navbar-links";
import { NavbarMobile } from "./navbar/navbar-mobile";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left: Brand Identity */}
        <NavbarBrand />

        {/* Center: Desktop Navigation Links */}
        <NavbarLinks />

        {/* Right: Auth Actions / User Menu & Mobile Drawer */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NavbarAuth />
          <NavbarMobile />
        </div>
      </div>
    </header>
  );
}
