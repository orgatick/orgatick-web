import baseApi from "./apis/base.api";
import serverApi from "./apis/server-auth-api";
import type {
  AdminOrganization,
  AdminUser,
  ApiResponseData,
  DashboardStats,
  Membership,
  OrganizationListQuery,
  OrgStatus,
  Paginated,
  PlatformRole,
  UserListQuery,
} from "./types";

export interface UserDetail {
  user: AdminUser;
  memberships: Membership[];
}

function cleanParams(query: Record<string, unknown>): Record<string, string | number> {
  const cleaned: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      cleaned[key] = value as string | number;
    }
  }
  return cleaned;
}

// ---- Client (browser) helpers ----

export async function fetchCurrentUser(): Promise<AdminUser> {
  const response = await baseApi.get<ApiResponseData<AdminUser>>("/users/me");
  return response.data.data;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await baseApi.get<ApiResponseData<DashboardStats>>("/admin/dashboard/stats");
  return response.data.data;
}

export async function fetchUsers(query: UserListQuery = {}): Promise<Paginated<AdminUser>> {
  const response = await baseApi.get<ApiResponseData<Paginated<AdminUser>>>("/admin/users", {
    params: cleanParams(query),
  });
  return response.data.data;
}

export async function fetchUserDetail(id: string): Promise<UserDetail> {
  const response = await baseApi.get<ApiResponseData<UserDetail>>(`/admin/users/${id}`);
  return response.data.data;
}

export async function updateUserRole(id: string, role: PlatformRole): Promise<void> {
  await baseApi.patch(`/admin/users/${id}/role`, { role });
}

export async function fetchOrganizations(query: OrganizationListQuery = {}): Promise<Paginated<AdminOrganization>> {
  const response = await baseApi.get<ApiResponseData<Paginated<AdminOrganization>>>("/admin/organizations", {
    params: cleanParams(query),
  });
  return response.data.data;
}

export async function fetchOrganizationDetail(id: string): Promise<AdminOrganization> {
  const response = await baseApi.get<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}`);
  return response.data.data;
}

export async function updateOrganizationStatus(id: string, status: OrgStatus): Promise<void> {
  await baseApi.patch(`/admin/organizations/${id}/status`, { status });
}

// ---- Server helpers (Server Components / Actions) ----

export async function serverFetchDashboardStats(): Promise<DashboardStats> {
  const api = await serverApi();
  const response = await api.get<ApiResponseData<DashboardStats>>("/admin/dashboard/stats");
  return response.data.data;
}

export async function serverFetchUsers(query: UserListQuery = {}): Promise<Paginated<AdminUser>> {
  const api = await serverApi();
  const response = await api.get<ApiResponseData<Paginated<AdminUser>>>("/admin/users", {
    params: cleanParams(query),
  });
  return response.data.data;
}

export async function serverFetchUserDetail(id: string): Promise<UserDetail> {
  const api = await serverApi();
  const response = await api.get<ApiResponseData<UserDetail>>(`/admin/users/${id}`);
  return response.data.data;
}

export async function serverFetchOrganizations(
  query: OrganizationListQuery = {},
): Promise<Paginated<AdminOrganization>> {
  const api = await serverApi();
  const response = await api.get<ApiResponseData<Paginated<AdminOrganization>>>("/admin/organizations", {
    params: cleanParams(query),
  });
  return response.data.data;
}

export async function serverFetchOrganizationDetail(id: string): Promise<AdminOrganization> {
  const api = await serverApi();
  const response = await api.get<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}`);
  return response.data.data;
}
