import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconArrowUpRight, IconFileText, IconFolder, IconSettings, IconUser } from "@tabler/icons-react";
import Link from "next/link";

export function SessionsNavigationCard() {
  const links = [
    {
      label: "My Profile",
      description: "View bio, contact and public details",
      href: "/profile",
      icon: IconUser,
    },
    {
      label: "Account Settings",
      description: "Edit name, phone number, and avatar",
      href: "/settings",
      icon: IconSettings,
    },
    {
      label: "Privacy Policy",
      description: "How we secure your sessions & tokens",
      href: "/privacy-policy",
      icon: IconFileText,
    },
  ];

  return (
    <Card className="border-border/80 shadow-xs">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
          <IconFolder className="size-4 text-primary" />
          Related Settings
        </CardTitle>
        <CardDescription className="text-xs">
          Manage other aspects of your account security and profile.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 pt-4 text-xs">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 hover:border-primary/50 bg-background hover:bg-muted/40 transition-colors group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <div className="min-w-0">
                  <span className="font-medium text-foreground block truncate">{link.label}</span>
                  <span className="text-[11px] text-muted-foreground block truncate">{link.description}</span>
                </div>
              </div>
              <IconArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
