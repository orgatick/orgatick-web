import serverApi from "@/lib/apis/server-auth-api";
import type { UserResponse } from "@orgatick/contracts";
import type { SidebarOrganization } from "@/lib/sidebar/nav-config";
import { SidebarLayout } from "@/components/sidebar/sidebar-layout";
import NoOrganizationCard from "@/components/landing-page/no-organization-card";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const api = await serverApi();

  let user: null | UserResponse = null;
  try {
    const response = await api.get("/users/me");
    user = response.data.data;
  } catch {
    user = null;
  }

  let organizations: SidebarOrganization[] = [];
  try {
    const response = await api.get("/organizations");
    organizations = response.data.data?.items ?? [];
  } catch {
    organizations = [];
  }

  if (!user || organizations.length === 0) {
    return <NoOrganizationCard />;
  }

  return (
    <SidebarLayout user={user} organizations={organizations}>
      {children}
    </SidebarLayout>
  );
}
