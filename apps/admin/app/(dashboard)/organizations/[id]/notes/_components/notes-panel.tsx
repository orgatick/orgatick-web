"use client";

import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Label } from "@orgatick/ui/components/label";
import { Textarea } from "@orgatick/ui/components/textarea";
import { useState } from "react";
import type { AdminOrganization } from "@/lib/types";
import { addOrganizationNote } from "@/lib/org-admin.api";
import { useOrgAction } from "../../_components/use-org-action";

interface NotesPanelProps {
  organization: AdminOrganization;
}

export function NotesPanel({ organization }: NotesPanelProps) {
  const { pending, run } = useOrgAction({ successMessage: "Note added" });
  const [text, setText] = useState("");
  const notes = organization.notes ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Internal notes <span className="text-xs font-normal text-muted-foreground">({notes.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="new-note">New note</Label>
          <Textarea
            id="new-note"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Internal note visible to platform admins only"
            rows={2}
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              disabled={pending || !text.trim()}
              onClick={() =>
                run(async () => {
                  await addOrganizationNote(String(organization.id), text.trim());
                  setText("");
                })
              }
            >
              Add note
            </Button>
          </div>
        </div>

        {notes.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No notes yet.</p>}
        <div className="space-y-2">
          {notes.map((note) => (
            <div key={note.id} className="rounded-lg border border-border/60 px-3 py-2">
              <p className="whitespace-pre-wrap text-sm text-foreground">{note.note}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {note.actorName ?? "Admin"} ·{" "}
                {new Date(note.createdAt).toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
