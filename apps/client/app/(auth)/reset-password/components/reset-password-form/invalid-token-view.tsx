import Link from "next/link";
import { IconAlertTriangle } from "@tabler/icons-react";
import { LinkButton } from "@/components/ui/link-button";

export default function InvalidTokenView() {
  return (
    <div className="w-full rounded-2xl border border-destructive/30 bg-card/80 p-6 space-y-4 shadow-sm text-center">
      <div className="mx-auto h-12 w-12 rounded-full bg-destructive/15 text-destructive flex items-center justify-center">
        <IconAlertTriangle size={26} />
      </div>

      <div className="space-y-1">
        <p className="text-xl font-semibold">Invalid or expired link</p>
        <p className="text-sm text-muted-foreground">
          This password reset link is invalid, incomplete, or has expired. Please request a new password reset link.
        </p>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <LinkButton href="/forgot-password" className="w-full rounded-full text-base h-11">
          Request new reset link
        </LinkButton>

        <Link href="/login" className="w-full rounded-full text-base h-11">
          Back to login
        </Link>
      </div>
    </div>
  );
}
