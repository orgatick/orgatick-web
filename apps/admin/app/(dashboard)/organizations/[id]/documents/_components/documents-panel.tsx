"use client";

import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Textarea } from "@orgatick/ui/components/textarea";
import { Badge } from "@orgatick/ui/components/badge";
import { IconExternalLink, IconFile } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { AdminOrganization, OrgDocumentRef, OrgDocumentStatus } from "@/lib/types";
import {
  approveDocument,
  fetchOrganizationDocumentUrl,
  rejectDocument,
  requestDocumentReplacement,
  verifyDocument,
  type OrganizationDocumentUrl,
} from "@/lib/org-admin.api";
import { dangerButton, successButton, useOrgAction } from "../../_components/use-org-action";

interface DocumentsPanelProps {
  organization: AdminOrganization;
}

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp"];

const statusClass: Record<OrgDocumentStatus, string> = {
  pending: "bg-muted text-muted-foreground",
  approved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rejected: "bg-destructive/10 text-destructive",
  verified: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  replacement_requested: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

function getExtension(url: string): string {
  try {
    return (new URL(url).pathname.split(".").pop() ?? "").toLowerCase();
  } catch {
    return url.split(".").pop()?.toLowerCase() ?? "";
  }
}

function isImage(url: string): boolean {
  return IMAGE_EXTENSIONS.includes(getExtension(url));
}

/** Fetches a short-lived presigned URL for a private document. */
function useSignedDocumentUrl(organizationId: string, document: OrgDocumentRef) {
  const [result, setResult] = useState<OrganizationDocumentUrl | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setResult(null);
    setFailed(false);
    fetchOrganizationDocumentUrl(organizationId, String(document.id))
      .then((url) => {
        if (!cancelled) setResult(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [organizationId, document.id]);

  return { result, failed };
}

function DocumentPreview({ organizationId, document }: { organizationId: string; document: OrgDocumentRef }) {
  const [open, setOpen] = useState(false);
  const { result, failed } = useSignedDocumentUrl(organizationId, document);
  const image = isImage(document.fileUrl);

  if (failed) {
    return (
      <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
        Could not load the file. Try again or check the backend storage environment.
      </p>
    );
  }

  if (!image) {
    return (
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-md border border-dashed px-3 py-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <IconFile className="size-4" />
          Preview not available for this file type — open it in a new tab instead.
        </span>
        {result?.fileUrl && (
          <a
            href={result.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            View / Download <IconExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border/60 bg-muted/20 p-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          {result ? "Preview · click to expand" : "Loading preview…"}
        </p>
        {result?.fileUrl && (
          <a
            href={result.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Open <IconExternalLink className="size-3.5" />
          </a>
        )}
      </div>
      {result?.fileUrl && (
        <button type="button" onClick={() => setOpen((value) => !value)} className="mt-2 block w-full text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.fileUrl}
            alt="Document preview"
            className={`w-full rounded-md border object-contain ${open ? "max-h-[480px]" : "max-h-56"}`}
          />
        </button>
      )}
      {!result && <div className="mt-2 h-24 animate-pulse rounded-md bg-muted" />}
    </div>
  );
}

function DocumentCard({ organization, document }: { organization: AdminOrganization; document: OrgDocumentRef }) {
  const { pending, run } = useOrgAction({ successMessage: "Document updated" });
  const [note, setNote] = useState("");
  const id = String(organization.id);
  const documentId = String(document.id);
  const fileName = document.fileUrl.split("/").pop() ?? document.fileUrl;

  return (
    <div className="space-y-3 rounded-xl border border-border/60 p-4">
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold capitalize text-foreground">
              {document.type.replace(/_/g, " ").toLowerCase()}
            </p>
            <Badge
              variant="secondary"
              className={`px-1.5 py-0 font-mono text-[9px] capitalize ${statusClass[document.status]}`}
            >
              {document.status.replace(/_/g, " ")}
            </Badge>
          </div>
          <p className="mt-1 truncate font-mono text-xs text-muted-foreground">{fileName}</p>
          <p className="text-xs text-muted-foreground">
            Uploaded by {document.uploader?.name ?? "unknown"} ·{" "}
            {new Date(document.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {document.status === "rejected" || document.status === "replacement_requested" ? (
        <p className="rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          Admin note: {document.reviewNote ?? "—"}
          {document.reviewer?.name ? ` · reviewed by ${document.reviewer.name}` : ""}
        </p>
      ) : document.reviewNote ? (
        <p className="text-xs text-muted-foreground">
          Admin note: {document.reviewNote}
          {document.reviewer?.name ? ` · reviewed by ${document.reviewer.name}` : ""}
        </p>
      ) : null}

      <DocumentPreview organizationId={id} document={document} />

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className={successButton}
          disabled={pending}
          onClick={() => run(() => approveDocument(id, documentId))}
        >
          Approve
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={successButton}
          disabled={pending}
          onClick={() => run(() => verifyDocument(id, documentId))}
        >
          Verify
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => run(() => requestDocumentReplacement(id, documentId, note.trim()))}
        >
          Request replacement
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={dangerButton}
          disabled={pending}
          onClick={() => run(() => rejectDocument(id, documentId, note.trim()))}
        >
          Reject
        </Button>
      </div>
      <Textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Note for reject / replacement request"
        rows={1}
      />
    </div>
  );
}

export function DocumentsPanel({ organization }: DocumentsPanelProps) {
  const documents = organization.documents ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Documents <span className="text-xs font-normal text-muted-foreground">({documents.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {documents.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No documents uploaded yet. Request documents from the Verification page.
          </p>
        )}
        {documents.map((document) => (
          <DocumentCard key={document.id} organization={organization} document={document} />
        ))}
      </CardContent>
    </Card>
  );
}
