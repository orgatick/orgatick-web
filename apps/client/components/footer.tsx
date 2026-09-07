import { FooterBottom } from "./footer/footer-bottom";
import { FooterBrand } from "./footer/footer-brand";
import { FooterNav } from "./footer/footer-nav";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/60 pt-16 pb-10 text-muted-foreground text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          <FooterBrand />
          <FooterNav />
        </div>

        {/* Bottom Bar */}
        <FooterBottom />
      </div>
    </footer>
  );
}
