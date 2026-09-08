import { LinkButton } from "@/components/ui/link-button";
import type { UserResponse } from "@orgatick/contracts";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import {
  IconCheck,
  IconGenderBigender,
  IconMail,
  IconMapPin,
  IconPencil,
  IconPhone,
  IconQuote,
  IconUser,
} from "@tabler/icons-react";

interface ProfileDetailsCardProps {
  user: UserResponse | null;
}

function formatGender(gender?: string): string {
  if (gender === "male") return "Male";
  if (gender === "female") return "Female";
  if (gender === "notToSay") return "Prefer not to say";
  return "Not specified";
}

export function ProfileDetailsCard({ user }: ProfileDetailsCardProps) {
  return (
    <div className="space-y-6">
      {/* Primary Personal Information Card */}
      <Card className="border-border/80 shadow-xs">
        <CardHeader className="border-b border-border/60 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                <IconUser className="size-4.5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-xs">
                Your public profile details and verified contact information.
              </CardDescription>
            </div>

            <LinkButton href="/settings" variant="ghost" size="sm">
              <IconPencil className="size-3" />
              <span>Edit</span>
            </LinkButton>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-1.5 p-3.5 rounded-xl border border-border/60 bg-muted/20">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <IconUser className="size-3.5 text-primary" />
                Full Name
              </span>
              <p className="font-semibold text-sm text-foreground">{user?.name || "Not provided"}</p>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5 p-3.5 rounded-xl border border-border/60 bg-muted/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <IconMail className="size-3.5 text-primary" />
                  Email Address
                </span>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium"
                >
                  <IconCheck className="size-2.5 mr-0.5 inline" />
                  Verified
                </Badge>
              </div>
              <p className="font-semibold text-sm text-foreground font-mono truncate">
                {user?.email || "Not provided"}
              </p>
            </div>

            {/* Gender */}
            <div className="space-y-1.5 p-3.5 rounded-xl border border-border/60 bg-muted/20">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <IconGenderBigender className="size-3.5 text-primary" />
                Gender
              </span>
              <p className="font-semibold text-sm text-foreground capitalize">{formatGender(user?.gender)}</p>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5 p-3.5 rounded-xl border border-border/60 bg-muted/20">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <IconPhone className="size-3.5 text-primary" />
                Phone Number
              </span>
              <p className="font-semibold text-sm text-foreground font-mono">
                {user?.phoneNumber || (
                  <span className="text-muted-foreground font-sans text-xs font-normal">No phone number added</span>
                )}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="mt-5 space-y-1.5 p-3.5 rounded-xl border border-border/60 bg-muted/20">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <IconMapPin className="size-3.5 text-primary" />
              Address & Location
            </span>
            <p className="text-sm text-foreground leading-relaxed">
              {user?.address || (
                <span className="text-muted-foreground text-xs font-normal">
                  No residential or billing address provided
                </span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bio / About Section Card */}
      <Card className="border-border/80 shadow-xs">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <IconQuote className="size-4.5 text-primary" />
            About / Bio
          </CardTitle>
          <CardDescription className="text-xs">
            A short self-introduction displayed to event organizers and peers.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {user?.bio ? (
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{user.bio}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-border/80 bg-muted/10 text-center gap-2">
              <IconQuote className="size-8 text-muted-foreground/50" />
              <p className="text-sm font-medium text-muted-foreground">No bio added yet.</p>
              <LinkButton href="/settings" variant="ghost" size="sm">
                Add a bio in Settings
              </LinkButton>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
