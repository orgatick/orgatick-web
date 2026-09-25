"use client";

import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Badge } from "@orgatick/ui/components/badge";
import { useState } from "react";
import type { AdminOrganization } from "@/lib/types";
import { approveOrganizationClosure, rejectOrganizationClosure, requestOrganizationClosure } from "@/lib/org-admin.api";
import { dangerButton, successButton, useOrgAction } from "../../_components/use-org-action";

interface ClosurePanelProps {
  organization: AdminOrganization;
}

export function ClosurePanel({ organization }: ClosurePanelProps) {
  const { pending, run } = useOrgAction({ successMessage: "Closure updated" });
  const [note, setNote] = useState("");
  const state = organization.adminState;
  const id = String(organization.id);
  const requested = Boolean(state?.closureRequestedAt);
  const archived = Boolean(state?.archived);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          Closure
          <Badge variant="secondary" className="px-1.5 py-0 font-mono text-[9px] capitalize">
            {requested ? "requested" : "not requested"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {state?.closureRequestedAt && (
          <p className="text-xs text-muted-foreground">
            Requested {new Date(state.closureRequestedAt).toLocaleString()}
          </p>
        )}
        {state?.closureReason && (
          <p className="rounded-lg bg-muted/40 px-3 py-2 text-sm text-foreground">Reason: {state.closureReason}</p>
        )}
        {archived ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            This organization has been archived and can no longer operate.
          </p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Request closure on behalf of the organization, then approve or reject the request.
            </p>
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Reason for closure"
              className="flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pending}
                onClick={() => run(() => requestOrganizationClosure(id, note.trim()))}
              >
                Request closure
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={successButton}
                disabled={pending || !requested}
                onClick={() => run(() => approveOrganizationClosure(id, note.trim() || undefined))}
              >
                Approve request
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={dangerButton}
                disabled={pending || !requested}
                onClick={() => run(() => rejectOrganizationClosure(id, note.trim() || undefined))}
              >
                Reject request
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
