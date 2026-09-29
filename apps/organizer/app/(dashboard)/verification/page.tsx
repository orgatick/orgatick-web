import type { Metadata } from "next";
import { redirect } from "next/navigation";
import serverApi from "@/lib/apis/server-auth-api";
import { getCurrentOrganization, getVerificationStatus } from "@/lib/organization/current-organization";
import { OrganizationReviewCard } from "./_components/organization-review-card";
import { RaiseVerificationButton } from "./_components/raise-verification-button";
import { VerificationStatusCard } from "./_components/verification-status-card";
import { OrganizationVerificationStatus } from "@orgatick/contracts";

export const metadata: Metadata = {
  title: "Verification | Orgatick Organizer",
  description: "Verify your organization to unlock events, payouts, and the full organizer dashboard.",
};

export default async function VerificationPage() {
  const api = await serverApi();
  const membership = await getCurrentOrganization(api);

  if (!membership) redirect("/");

  const organization = membership.organization;
  const status = getVerificationStatus(membership);
  const verification = organization.verification ?? null;
  const canRequest = status !== OrganizationVerificationStatus.VERIFIED;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-1">
      <div className="flex flex-col gap-1">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">Organization</p>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Verification</h1>
        <p className="text-sm text-muted-foreground">
          Verify <span className="font-medium text-foreground">{organization.name}</span> to publish events, collect
          payments, and unlock the full organizer dashboard.
        </p>
      </div>

      <VerificationStatusCard
        status={status}
        rejectionReason={verification?.rejectionReason ?? null}
        verifiedAt={verification?.verifiedAt ?? null}
      />

      <OrganizationReviewCard membership={membership} />

      {canRequest && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/60 p-4">
          <p className="text-sm text-muted-foreground">
            {status === OrganizationVerificationStatus.REJECTED
              ? "Update your details if needed, then send a fresh request to our review team."
              : "Happy with the details above? Send them to the platform team for verification."}
          </p>
          <RaiseVerificationButton
            organizationId={organization.id}
            isResubmission={status === OrganizationVerificationStatus.REJECTED}
          />
        </div>
      )}
    </div>
  );
}
