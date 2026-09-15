import serverApi from "@/lib/apis/server-auth-api";
import NoOrganizationCard from "@/components/landing-page/no-organization-card";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const api = await serverApi();
  let organizations: null | unknown[] = null;
  try {
    const response = await api.get("/organizations");
    organizations = response.data.data?.items ?? [];
  } catch {
    organizations = null;
  }

  if (!organizations || organizations.length === 0) {
    return <NoOrganizationCard />;
  }

  return <>{children}</>;
}
