import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconArrowUpRight, IconKey, IconLock, IconShieldExclamation, IconWorldWww } from "@tabler/icons-react";
import Link from "next/link";

export function SessionsSecurityAdvisory() {
  return (
    <Card className="border-border/80 shadow-xs">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
          <IconShieldExclamation className="size-4 text-primary" />
          Security Guidance
        </CardTitle>
        <CardDescription className="text-xs">
          Best practices to safeguard your Orgatick access credentials.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3.5 pt-4 text-xs">
        {/* Tip 1 */}
        <div className="flex gap-2.5 items-start">
          <div className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground shrink-0 mt-0.5">
            <IconWorldWww className="size-3.5" />
          </div>
          <div className="space-y-0.5">
            <span className="font-semibold text-foreground block">Recognizing Unfamiliar IP Addresses</span>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              If an IP address or browser appears unfamiliar, revoke it immediately and update your password.
            </p>
          </div>
        </div>

        {/* Tip 2 */}
        <div className="flex gap-2.5 items-start">
          <div className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground shrink-0 mt-0.5">
            <IconLock className="size-3.5" />
          </div>
          <div className="space-y-0.5">
            <span className="font-semibold text-foreground block">Public and Shared Devices</span>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Always manually sign out when logging into workstations or shared public browsers.
            </p>
          </div>
        </div>

        {/* Action link */}
        <div className="pt-2">
          <Link
            href="/forgot-password"
            className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 hover:border-primary/50 bg-background hover:bg-muted/40 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <IconKey className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <span className="font-medium text-foreground block">Change Password</span>
                <span className="text-[11px] text-muted-foreground block">Protect against unauthorized logins</span>
              </div>
            </div>
            <IconArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
