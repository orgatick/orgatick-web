"use client";

import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Label } from "@orgatick/ui/components/label";
import { Textarea } from "@orgatick/ui/components/textarea";
import { Badge } from "@orgatick/ui/components/badge";
import { useState } from "react";
import type { AdminOrganization, OrgVerificationStatus } from "@/lib/types";
import {
  approveOrganizationVerification,
  requestOrganizationDocuments,
  rejectOrganizationVerification,
  reverifyOrganization,
  revokeOrganizationVerification,
} from "@/lib/org-admin.api";
import { dangerButton, successButton, useOrgAction } from "../../_components/use-org-action";

interface VerificationPanelProps {
  organization: AdminOrganization;
}

const statusClass: Record<OrgVerificationStatus, string> = {
  pending: "bg-muted text-muted-foreground",
  verified: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rejected: "bg-destructive/10 text-destructive",
};

export function VerificationPanel({ organization }: VerificationPanelProps) {
  const { pending, run } = useOrgAction({ successMessage: "Verification updated" });
  const [note, setNote] = useState("");
  const verification = organization.verification;
  const id = String(organization.id);
  const status: OrgVerificationStatus =
    verification?.status === "verified" || verification?.status === "rejected" ? verification.status : "pending";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          Verification
          <Badge variant="secondary" className={`px-1.5 py-0 font-mono text-[9px] capitalize ${statusClass[status]}`}>
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {verification?.verifiedAt && (
          <p className="text-xs text-muted-foreground">Verified {new Date(verification.verifiedAt).toLocaleString()}</p>
        )}
        {verification?.rejectionReason && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
            Rejection reason: {verification.rejectionReason}
          </p>
        )}

        <div className="space-y-2">
          <Label htmlFor="verification-note">Note / reason</Label>
          <Textarea
            id="verification-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Optional note for the action"
            rows={2}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className={successButton}
            disabled={pending || status === "verified"}
            onClick={() => run(() => approveOrganizationVerification(id, note.trim() || undefined))}
          >
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={dangerButton}
            disabled={pending || status === "rejected"}
            onClick={() => run(() => rejectOrganizationVerification(id, note.trim()))}
          >
            Reject
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={() => run(() => revokeOrganizationVerification(id, note.trim() || undefined))}
          >
            Revoke
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={() => run(() => requestOrganizationDocuments(id, note.trim()))}
          >
            Request documents
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={pending || status === "verified"}
            onClick={() => run(() => reverifyOrganization(id, note.trim() || undefined))}
          >
            Re-verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
