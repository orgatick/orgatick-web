"use client";

import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Label } from "@orgatick/ui/components/label";
import { Textarea } from "@orgatick/ui/components/textarea";
import { useState } from "react";
import type { AdminOrganization } from "@/lib/types";
import {
  archiveOrganization,
  blockOrganization,
  hideOrganization,
  restoreOrganization,
  showOrganization,
  unblockOrganization,
} from "@/lib/org-admin.api";
import { dangerButton, useOrgAction } from "../../_components/use-org-action";

interface AccessPanelProps {
  organization: AdminOrganization;
}

function StateBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 font-mono text-[10px] capitalize ${
        active ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
      }`}
    >
      {label}: {active ? "yes" : "no"}
    </span>
  );
}

export function AccessPanel({ organization }: AccessPanelProps) {
  const { pending, run } = useOrgAction({ successMessage: "Access state updated" });
  const [reason, setReason] = useState("");
  const state = organization.adminState;
  const id = String(organization.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Access control</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <StateBadge label="blocked" active={state?.blocked ?? false} />
          <StateBadge label="hidden" active={state?.hidden ?? false} />
          <StateBadge label="archived" active={state?.archived ?? false} />
        </div>

        <div className="space-y-3">
          <Label htmlFor="access-reason">
            Reason <span className="font-normal text-muted-foreground">(used for block, hide and archive)</span>
          </Label>
          <Textarea
            id="access-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Why is this action being taken?"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2 rounded-xl border border-border/60 p-3">
            <p className="text-sm font-semibold">Blocking</p>
            <p className="text-xs text-muted-foreground">
              {state?.blocked
                ? `Blocked${state.blockReason ? `: ${state.blockReason}` : ""}`
                : "Block access to the organization."}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={dangerButton}
                disabled={pending || state?.blocked}
                onClick={() => run(() => blockOrganization(id, reason.trim()))}
              >
                Block
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pending || !state?.blocked}
                onClick={() => run(() => unblockOrganization(id))}
              >
                Unblock
              </Button>
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-border/60 p-3">
            <p className="text-sm font-semibold">Content visibility</p>
            <p className="text-xs text-muted-foreground">
              {state?.hidden
                ? `Hidden${state.hiddenReason ? `: ${state.hiddenReason}` : ""}`
                : "Hide the organization's public content."}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pending || state?.hidden}
                onClick={() => run(() => hideOrganization(id, reason.trim()))}
              >
                Hide
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pending || !state?.hidden}
                onClick={() => run(() => showOrganization(id))}
              >
                Show
              </Button>
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-border/60 p-3">
            <p className="text-sm font-semibold">Archive</p>
            <p className="text-xs text-muted-foreground">
              {state?.archived
                ? `Archived${state.archivedReason ? `: ${state.archivedReason}` : ""}`
                : "Archive the organization."}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={dangerButton}
                disabled={pending || state?.archived}
                onClick={() => run(() => archiveOrganization(id, reason.trim()))}
              >
                Archive
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pending || !state?.archived}
                onClick={() => run(() => restoreOrganization(id))}
              >
                Restore
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
