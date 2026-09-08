"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { IconCopyright, IconMoonStars, IconSun } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";

function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <footer className="w-full sm:px-12 py-4 flex flex-col-reverse sm:flex-row justify-between sm:items-center gap-3 px-3 text-xs text-muted-foreground">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:gap-6 gap-2">
        <div className="flex items-center gap-1.5">
          <IconCopyright className="size-4" />
          <span>{mounted ? new Date().getFullYear() : ""} Orgatick. All rights reserved.</span>
        </div>
        <nav aria-label="Legal Links" className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link href="/terms-and-conditions" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/refund-policy" className="hover:text-foreground transition-colors">
            Refunds
          </Link>
          <Link href="/delivery-policy" className="hover:text-foreground transition-colors">
            Delivery
          </Link>
        </nav>
      </div>

      <div className="w-full items-end justify-end flex">
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-8 px-2.5 gap-2 text-xs">
          {mounted && theme === "dark" ? (
            <IconSun size={15} aria-hidden="true" />
          ) : (
            <IconMoonStars size={15} aria-hidden="true" />
          )}
          {!mounted ? "Theme" : theme === "dark" ? "Light" : "Dark"}
        </Button>
      </div>
    </footer>
  );
}

export default Footer;
