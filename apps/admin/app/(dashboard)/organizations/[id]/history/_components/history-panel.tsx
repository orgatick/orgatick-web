import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import type { AdminOrganization, StatusHistoryEntry, VerificationLogEntry, OwnershipHistoryEntry } from "@/lib/types";

interface HistoryPanelProps {
  organization: AdminOrganization;
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface SectionItem {
  id: string | number;
  label: string;
  date: string;
}

function Section({ title, items }: { title: string; items: SectionItem[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {items.length === 0 && <p className="text-sm text-muted-foreground">Nothing recorded yet.</p>}
      <Card>
        <CardContent className="divide-y divide-border/60">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
              <p className="text-sm text-foreground">{item.label}</p>
              <p className="shrink-0 text-xs text-muted-foreground">{formatDateTime(item.date)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function statusLabel(entry: StatusHistoryEntry) {
  const actor = entry.actorName ?? "Admin";
  const from = entry.fromStatus ? ` from "${entry.fromStatus}"` : "";
  const to = entry.toStatus ? ` to "${entry.toStatus}"` : "";
  const change = entry.changeType ?? "status changed";
  const reason = entry.reason ? ` — ${entry.reason}` : "";
  return `${actor} ${change}${from}${to}${reason}`;
}

function verificationLabel(entry: VerificationLogEntry) {
  const actor = entry.actorName ?? "Admin";
  const note = entry.note ? ` — ${entry.note}` : "";
  return `${actor} → ${entry.action}${note}`;
}

function ownershipLabel(entry: OwnershipHistoryEntry) {
  const actor = entry.actorName ? `${entry.actorName}: ` : "";
  const from = entry.fromUserName ?? "unknown";
  const to = entry.toUserName ?? "unknown";
  const reason = entry.reason ? ` — ${entry.reason}` : "";
  return `${actor}ownership ${entry.action} ${from} → ${to}${reason}`;
}

export function HistoryPanel({ organization }: HistoryPanelProps) {
  const histories = organization.histories;

  const statusItems: SectionItem[] = (histories?.status ?? []).map((entry) => ({
    id: entry.id,
    label: statusLabel(entry),
    date: entry.createdAt,
  }));

  const verificationItems: SectionItem[] = (histories?.verification ?? []).map((entry) => ({
    id: entry.id,
    label: verificationLabel(entry),
    date: entry.createdAt,
  }));

  const ownershipItems: SectionItem[] = (histories?.ownership ?? []).map((entry) => ({
    id: entry.id,
    label: ownershipLabel(entry),
    date: entry.createdAt,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Activity history</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Section title="Status changes" items={statusItems} />
        <Section title="Verification log" items={verificationItems} />
        <Section title="Ownership transfers" items={ownershipItems} />
      </CardContent>
    </Card>
  );
}
