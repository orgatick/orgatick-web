import type { ReactNode } from "react";
import type { UserResponse } from "@orgatick/contracts";
import serverApi from "@/lib/apis/server-auth-api";
import { AdminShell } from "@/components/sidebar/admin-shell";
import { RestrictedAccess } from "@/components/restricted-access";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const api = await serverApi();
  let user: UserResponse | null = null;
  try {
    const response = await api.get("/users/me");
    user = response.data.data;
  } catch {
    user = null;
  }

  if (!user || user.role !== "admin") {
    return <RestrictedAccess />;
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
