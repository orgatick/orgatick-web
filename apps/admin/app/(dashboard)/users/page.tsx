import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Card, CardContent } from "@orgatick/ui/components/card";
import { serverFetchUsers } from "@/lib/admin.api";
import type { AdminUser, UserListQuery } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { PaginationControls } from "@/components/data-tools/pagination";
import { SearchInput } from "@/components/data-tools/search-input";
import { RoleFilter } from "@/components/users/role-filter";
import { RoleSwitch } from "@/components/users/role-switch";

export const metadata: Metadata = { title: "Users" };

type UsersSearchParams = {
  search?: string;
  role?: string;
  page?: string;
  limit?: string;
};

function UserRow({ user }: { user: AdminUser }) {
  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <tr className="border-b border-border/60 last:border-b-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-9 shrink-0">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback className="bg-linear-to-br from-primary to-indigo-600 font-mono text-[10px] font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">#{user.id}</code>
      </td>
      <td className="px-4 py-3">
        {user.userAccount?.provider ? (
          <span className="font-mono text-xs capitalize text-muted-foreground">{user.userAccount.provider}</span>
        ) : (
          <span className="text-xs text-muted-foreground/60">-</span>
        )}
      </td>
      <td className="px-4 py-3">
        <RoleSwitch userId={user.id} currentRole={user.role} />
      </td>
      <td className="px-4 py-3">
        <span className="text-xs tabular-nums text-muted-foreground">
          {new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <Link
          href={`/users/${user.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View <IconArrowUpRight className="size-3.5" />
        </Link>
      </td>
    </tr>
  );
}

export default async function UsersPage({ searchParams }: { searchParams: Promise<UsersSearchParams> }) {
  const params = await searchParams;
  const page = Math.max(Number(params.page) || 1, 1);
  const limit = 20;
  const search = params.search?.trim();
  const role: UserListQuery["role"] = params.role === "admin" || params.role === "user" ? params.role : undefined;

  const data = await serverFetchUsers({ page, limit, search, role });

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      <PageHeader
        title="Users"
        description={`All users registered on the platform${search ? ` matching "${search}"` : ""}.`}
      />

      <div className="flex flex-wrap items-center gap-2">
        <SearchInput placeholder="Search by name or email..." className="w-full max-w-sm" />
        <RoleFilter value={role} />
        {(search || role) && (
          <p className="text-xs text-muted-foreground">
            {data.meta.total} result{data.meta.total === 1 ? "" : "s"}
          </p>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">User</th>
                  <th className="px-4 py-2.5 font-medium">ID</th>
                  <th className="px-4 py-2.5 font-medium">Auth</th>
                  <th className="px-4 py-2.5 font-medium">Role</th>
                  <th className="px-4 py-2.5 font-medium">Joined</th>
                  <th className="px-4 py-2.5 font-medium" />
                </tr>
              </thead>
              <tbody>
                {data.items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      No users found.
                    </td>
                  </tr>
                )}
                {data.items.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <PaginationControls page={data.meta.page} totalPages={data.meta.totalPages} />
    </div>
  );
}
