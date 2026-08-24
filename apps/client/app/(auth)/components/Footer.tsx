"use client";
import { Button } from "@orgatick/ui/components/button";
import { IconSun } from "@tabler/icons-react";
import { IconMoonStars } from "@tabler/icons-react";
import { IconCopyright } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <div className="w-full sm:px-30 flex flex-col-reverse sm:flex-row justify-between sm:items-center gap-2 px-2">
      <div className=" flex flex-col-reverse sm:flex-row sm:items-center sm:gap-10 gap-2 px-3 sm:px-0">
        <div className="flex gap-2 text-muted-foreground text-sm">
          <IconCopyright className="size-5" />
          <span>{mounted ? new Date().getFullYear() : ""} Orgatick. All rights reserved.</span>
        </div>
        <div className="flex w-full sm:w-fit justify-between sm:gap-6 text-muted-foreground">
          <Link href={"/contact"}>Support</Link>
          <Link href={"/terms-and-conditions"}>Terms and Conditions</Link>
          <Link href={"/privacy-policy"}>Privacy Policy</Link>
        </div>
      </div>
      <div>
        {/*TODO: Make this client Comp only this part not whole footer comp */}
        <Button variant={"ghost"} size={"sm"} onClick={toggleTheme} className={"gap-2"}>
          {mounted && theme === "dark" ? (
            <IconSun size={16} aria-hidden="true" />
          ) : (
            <IconMoonStars size={16} aria-hidden="true" />
          )}
          {!mounted ? "Switch theme" : theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        </Button>
      </div>
    </div>
  );
}

export default Footer;
