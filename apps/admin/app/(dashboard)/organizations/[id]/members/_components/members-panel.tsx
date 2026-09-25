"use client";

import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Input } from "@orgatick/ui/components/input";
import { Label } from "@orgatick/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@orgatick/ui/components/select";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import { useState } from "react";
import type { AdminOrganization, MemberRef, MemberRoleKey, MemberStatus } from "@/lib/types";
import {
  addOrganizationMember,
  changeMemberRole,
  changeMemberStatus,
  removeOrganizationMember,
  transferOrganizationOwnership,
} from "@/lib/org-admin.api";
import { dangerButton, useOrgAction } from "../../_components/use-org-action";

const ROLES: MemberRoleKey[] = ["owner", "admin", "manager", "member"];
const STATUSES: MemberStatus[] = ["active", "inactive"];

interface MembersPanelProps {
  organization: AdminOrganization;
}

function MemberRow({ organization, member }: { organization: AdminOrganization; member: MemberRef }) {
  const { pending, run } = useOrgAction({ successMessage: "Member updated" });
  const id = String(organization.id);
  const memberId = String(member.id);
  const initials = (member.user?.name ?? "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border/60 px-3 py-2">
      <Avatar className="size-8 shrink-0">
        {member.user?.avatar ? (
          <AvatarImage src={member.user.avatar} alt={member.user?.name ?? ""} />
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-primary to-indigo-600 font-mono text-[9px] font-bold text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{member.user?.name ?? "Unknown user"}</p>
        <p className="truncate text-xs text-muted-foreground">
          #{member.user?.id ?? "-"} · {new Date(member.joinedAt).toLocaleDateString()}
        </p>
      </div>
      <Badge variant="secondary" className="shrink-0 px-1.5 py-0 font-mono text-[9px] capitalize">
        {member.role?.key ?? "member"}
      </Badge>
      <Select
        value={member.status}
        disabled={pending}
        onValueChange={(status) => run(() => changeMemberStatus(id, memberId, status as MemberStatus))}
      >
        <SelectTrigger className="h-7 w-28 font-mono text-xs capitalize" aria-label="Member status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((status) => (
            <SelectItem key={status} value={status} className="font-mono text-xs capitalize">
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={member.role?.key}
        disabled={pending}
        onValueChange={(role) => run(() => changeMemberRole(id, memberId, role as MemberRoleKey))}
      >
        <SelectTrigger className="h-7 w-28 font-mono text-xs capitalize" aria-label="Member role">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ROLES.map((role) => (
            <SelectItem key={role} value={role} className="font-mono text-xs capitalize">
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="sm"
        className={dangerButton}
        disabled={pending}
        onClick={() => run(() => removeOrganizationMember(id, memberId))}
      >
        Remove
      </Button>
    </div>
  );
}

function AddMemberForm({ organization }: { organization: AdminOrganization }) {
  const { pending, run } = useOrgAction({ successMessage: "Member added" });
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<MemberRoleKey>("member");

  return (
    <div className="flex flex-wrap items-end gap-2 rounded-xl border border-border/60 p-3">
      <div className="min-w-40 flex-1 space-y-1">
        <Label htmlFor="member-user-id" className="text-xs">
          User ID
        </Label>
        <Input
          id="member-user-id"
          type="number"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          placeholder="e.g. 42"
        />
      </div>
      <div className="w-32 space-y-1">
        <Label className="text-xs">Role</Label>
        <Select value={role} onValueChange={(value) => setRole(value as MemberRoleKey)}>
          <SelectTrigger className="h-8 font-mono text-xs capitalize" aria-label="Role for new member">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((item) => (
              <SelectItem key={item} value={item} className="font-mono text-xs capitalize">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        size="sm"
        disabled={pending || !userId.trim()}
        onClick={() =>
          run(async () => {
            await addOrganizationMember(String(organization.id), Number(userId), role);
            setUserId("");
          })
        }
      >
        Add member
      </Button>
    </div>
  );
}

function TransferForm({ organization }: { organization: AdminOrganization }) {
  const { pending, run } = useOrgAction({ successMessage: "Ownership transferred" });
  const [toUserId, setToUserId] = useState("");

  return (
    <div className="flex flex-wrap items-end gap-2 rounded-xl border border-destructive/30 p-3">
      <div className="min-w-40 flex-1 space-y-1">
        <Label htmlFor="owner-user-id" className="text-xs">
          New owner user ID
        </Label>
        <Input
          id="owner-user-id"
          type="number"
          value={toUserId}
          onChange={(event) => setToUserId(event.target.value)}
          placeholder="e.g. 42"
        />
      </div>
      <div className="flex-none">
        <Button
          variant="outline"
          size="sm"
          className={dangerButton}
          disabled={pending || !toUserId.trim()}
          onClick={() =>
            run(async () => {
              await transferOrganizationOwnership(String(organization.id), Number(toUserId));
              setToUserId("");
            })
          }
        >
          Transfer ownership
        </Button>
      </div>
    </div>
  );
}

export function MembersPanel({ organization }: MembersPanelProps) {
  const members = organization.members ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Members</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {members.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No members.</p>}
          {members.map((member) => (
            <MemberRow key={member.id} organization={organization} member={member} />
          ))}
        </div>
        <AddMemberForm organization={organization} />
        <TransferForm organization={organization} />
      </CardContent>
    </Card>
  );
}
