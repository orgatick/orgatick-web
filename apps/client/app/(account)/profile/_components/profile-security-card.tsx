import type { UserResponse } from "@orgatick/contracts";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconArrowUpRight, IconCheck, IconKey, IconLock, IconShieldLock } from "@tabler/icons-react";
import Link from "next/link";

interface ProfileSecurityCardProps {
  user: UserResponse | null;
}

export function ProfileSecurityCard({ user }: ProfileSecurityCardProps) {
  const resetPasswordHref = user?.email
    ? `/forgot-password?email=${encodeURIComponent(user.email)}`
    : "/forgot-password";

  return (
    <Card className="border-border/80 shadow-xs">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
          <IconShieldLock className="size-4 text-primary" />
          Security & Access
        </CardTitle>
        <CardDescription className="text-xs">
          Manage your credentials, login safety, and privacy preferences.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-4 text-xs">
        {/* Email verification status */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-muted/20">
          <div className="space-y-0.5">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <IconLock className="size-3.5 text-primary" />
              Email Authentication
            </div>
            <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">{user?.email || "Account email"}</p>
          </div>
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium"
          >
            <IconCheck className="size-3 mr-1 inline" />
            Verified
          </Badge>
        </div>

        {/* Password Reset action */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Password & Credentials
          </div>

          <Link
            href={resetPasswordHref}
            className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 hover:border-primary/50 bg-background hover:bg-muted/40 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <IconKey className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <span className="font-medium text-foreground block">Change Password</span>
                <span className="text-[11px] text-muted-foreground block">Send reset token to registered email</span>
              </div>
            </div>
            <IconArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>

        {/* Privacy Note */}
        <div className="rounded-lg bg-muted/40 p-2.5 text-[11px] text-muted-foreground leading-relaxed">
          Your personal data is encrypted and handled in strict accordance with our{" "}
          <Link href="/privacy-policy" className="text-primary underline underline-offset-2 hover:opacity-80">
            Privacy Policy
          </Link>
          .
        </div>
      </CardContent>
    </Card>
  );
}
