import { LinkButton } from "@/components/ui/link-button";
import { Alert, AlertDescription, AlertTitle } from "@orgatick/ui/components/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { cn } from "@orgatick/ui/lib/utils";
import { IconArrowRight, IconCircleCheck, IconClockHour4, IconFileSearch, IconX } from "@tabler/icons-react";

interface VerificationStatusCardProps {
  status: string;
  rejectionReason?: string | null;
  verifiedAt?: string | null;
}

interface StatusContent {
  tone: "success" | "warning" | "destructive" | "muted";
  title: string;
  description: string;
  icon: React.ElementType;
}

const UNVERIFIED_CONTENT: StatusContent = {
  tone: "muted",
  title: "Your organization is not verified yet",
  description: "Submit your business documents to start the verification process.",
  icon: IconFileSearch,
};

const STATUS_CONTENT: Record<string, StatusContent> = {
  verified: {
    tone: "success",
    title: "Your organization is verified",
    description: "Verification is complete. You now have full access to the organizer dashboard.",
    icon: IconCircleCheck,
  },
  pending: {
    tone: "warning",
    title: "Verification under review",
    description: "Your documents are being reviewed. This usually takes 1–3 business days.",
    icon: IconClockHour4,
  },
  rejected: {
    tone: "destructive",
    title: "Verification was rejected",
    description: "Please review the reason below, update your documents, and submit a new request.",
    icon: IconX,
  },
  unverified: UNVERIFIED_CONTENT,
};

const TONE_STYLES: Record<StatusContent["tone"], { badge: string; icon: string }> = {
  success: { badge: "bg-success/15 text-success", icon: "bg-success/15 text-success" },
  warning: { badge: "bg-warning/5 text-warning", icon: "bg-warning/15 text-warning" },
  destructive: { badge: "bg-destructive/15 text-destructive", icon: "bg-destructive/15 text-destructive" },
  muted: { badge: "bg-muted text-muted-foreground", icon: "bg-muted text-muted-foreground" },
};

function formatDate(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export function VerificationStatusCard({ status, rejectionReason, verifiedAt }: VerificationStatusCardProps) {
  const content = STATUS_CONTENT[status] ?? UNVERIFIED_CONTENT;
  const tone = TONE_STYLES[content.tone];
  const Icon = content.icon;
  const verifiedOn = formatDate(verifiedAt);

  return (
    <Card>
      <CardHeader className="flex-row items-start gap-3">
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", tone.icon)}>
          <Icon className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <CardTitle>{content.title}</CardTitle>
          <CardDescription className="mt-1">{content.description}</CardDescription>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-md px-2 py-1 font-mono text-[10px] font-semibold uppercase leading-none tracking-wider",
            tone.badge,
          )}
        >
          {status}
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {status === "verified" && verifiedOn && (
          <p className="text-sm text-muted-foreground">
            Verified on <span className="font-medium text-foreground">{verifiedOn}</span>.
          </p>
        )}

        {status === "rejected" && rejectionReason && (
          <Alert variant="destructive">
            <IconX />
            <AlertTitle>Reason for rejection</AlertTitle>
            <AlertDescription>{rejectionReason}</AlertDescription>
          </Alert>
        )}

        {status === "pending" && (
          <ol className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <IconCircleCheck className="mt-0.5 size-4 shrink-0 text-success" />
              Documents received and request submitted.
            </li>
            <li className="flex items-start gap-2">
              <IconClockHour4 className="mt-0.5 size-4 shrink-0 text-warning" />
              Our team is reviewing your business details.
            </li>
            <li className="flex items-start gap-2">
              <IconArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              You&apos;ll be notified once a decision is made.
            </li>
          </ol>
        )}

        {status === "verified" && (
          <div>
            <LinkButton href="/" size="sm" iconRight={<IconArrowRight className="size-4" />}>
              Go to dashboard
            </LinkButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
