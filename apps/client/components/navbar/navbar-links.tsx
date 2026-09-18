"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_LINKS, NAV_EASE } from "./navbar-constants";

const navVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: NAV_EASE },
  },
};

export function NavbarLinks() {
  const pathname = usePathname();

  return (
    <motion.nav
      aria-label="Primary"
      variants={{ show: { transition: { staggerChildren: 0.045 } } }}
      initial="hidden"
      animate="show"
      className="hidden flex-1 items-center justify-center gap-1 lg:flex"
    >
      {MAIN_NAV_LINKS.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));

        return (
          <motion.div key={link.href} variants={navVariants}>
            <Link
              href={link.href}
              className="group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-primary/10 shadow-[inset_0_0_0_1px] shadow-primary/10"
                />
              )}

              <span
                className={
                  isActive
                    ? "relative text-primary"
                    : "relative text-muted-foreground transition-colors group-hover:text-foreground"
                }
              >
                {link.label}
              </span>

              {link.badge && (
                <span className="relative rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-primary">
                  {link.badge}
                </span>
              )}

              <span
                className={`relative h-0.5 rounded-full bg-primary transition-all duration-300 ${
                  isActive ? "w-3 opacity-100" : "w-0 opacity-0 group-hover:opacity-40"
                }`}
              />
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}
