import type { AxiosInstance } from "axios";
import type { SidebarOrganization } from "@/lib/sidebar/nav-config";
import { OrganizationVerificationStatus } from "@orgatick/contracts";

interface SessionOrganizationSummary {
  id: string;
  name: string;
}

async function getCurrentOrganizationId(api: AxiosInstance): Promise<string | null> {
  try {
    const response = await api.get("/session/organization");
    const current: SessionOrganizationSummary | null = response.data?.data ?? null;
    return current?.id ? String(current.id) : null;
  } catch {
    return null;
  }
}

export async function getCurrentOrganization(api: AxiosInstance): Promise<SidebarOrganization | null> {
  const currentId = await getCurrentOrganizationId(api);

  try {
    const response = await api.get("/organizations/my");
    const memberships: SidebarOrganization[] = response.data?.data ?? [];
    if (memberships.length === 0) return null;

    return memberships.find((entry) => String(entry.organization.id) === currentId) ?? memberships[0] ?? null;
  } catch {
    return null;
  }
}

export function getVerificationStatus(membership: SidebarOrganization | null): OrganizationVerificationStatus {
  const status = membership?.organization.verification?.status;
  const isKnownStatus = (Object.values(OrganizationVerificationStatus) as string[]).includes(status ?? "");

  return isKnownStatus ? (status as OrganizationVerificationStatus) : OrganizationVerificationStatus.PENDING;
}
