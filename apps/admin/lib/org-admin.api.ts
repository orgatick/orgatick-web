import api from "./apis/auth-base.api";
import type {
  AdminOrganization,
  ApiResponseData,
  MemberRoleKey,
  MemberStatus,
  OrgDocumentRef,
  OrgHistories,
  VerificationLogEntry,
} from "./types";

export async function blockOrganization(id: string, reason: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}/block`, {
    reason,
  });
  return response.data.data;
}

export async function unblockOrganization(id: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}/unblock`);
  return response.data.data;
}

export async function hideOrganization(id: string, reason: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}/hide`, {
    reason,
  });
  return response.data.data;
}

export async function showOrganization(id: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}/show`);
  return response.data.data;
}

export async function archiveOrganization(id: string, reason: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}/archive`, {
    reason,
  });
  return response.data.data;
}

export async function restoreOrganization(id: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}/restore`);
  return response.data.data;
}

// ---- Closure ----

export async function requestOrganizationClosure(id: string, reason: string): Promise<AdminOrganization> {
  const response = await api.post<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}/closure`, {
    reason,
  });
  return response.data.data;
}

export async function approveOrganizationClosure(id: string, note?: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}/closure/approve`, {
    note,
  });
  return response.data.data;
}

export async function rejectOrganizationClosure(id: string, reason?: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}/closure/reject`, {
    reason,
  });
  return response.data.data;
}

export async function permanentlyDeleteOrganization(id: string): Promise<{ id: string; deleted: boolean }> {
  const response = await api.delete<ApiResponseData<{ id: string; deleted: boolean }>>(
    `/admin/organizations/${id}/permanent`,
  );
  return response.data.data;
}

// ---- Verification ----

export async function approveOrganizationVerification(id: string, note?: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(
    `/admin/organizations/${id}/verification/approve`,
    { note },
  );
  return response.data.data;
}

export async function rejectOrganizationVerification(id: string, reason: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(
    `/admin/organizations/${id}/verification/reject`,
    { reason },
  );
  return response.data.data;
}

export async function revokeOrganizationVerification(id: string, reason?: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(
    `/admin/organizations/${id}/verification/revoke`,
    { reason },
  );
  return response.data.data;
}

export async function requestOrganizationDocuments(id: string, note: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(
    `/admin/organizations/${id}/verification/request-documents`,
    { note },
  );
  return response.data.data;
}

export async function reverifyOrganization(id: string, note?: string): Promise<AdminOrganization> {
  const response = await api.patch<ApiResponseData<AdminOrganization>>(
    `/admin/organizations/${id}/verification/reverify`,
    { note },
  );
  return response.data.data;
}

export async function fetchVerificationHistory(id: string): Promise<VerificationLogEntry[]> {
  const response = await api.get<ApiResponseData<VerificationLogEntry[]>>(
    `/admin/organizations/${id}/verification/history`,
  );
  return response.data.data;
}

// ---- Members & ownership ----

export async function addOrganizationMember(
  id: string,
  userId: number,
  role: MemberRoleKey,
): Promise<AdminOrganization> {
  const response = await api.post<ApiResponseData<AdminOrganization>>(`/admin/organizations/${id}/members`, {
    userId,
    role,
  });
  return response.data.data;
}

export async function changeMemberRole(id: string, memberId: string, role: MemberRoleKey): Promise<void> {
  await api.patch(`/admin/organizations/${id}/members/${memberId}/role`, { role });
}

export async function changeMemberStatus(id: string, memberId: string, status: MemberStatus): Promise<void> {
  await api.patch(`/admin/organizations/${id}/members/${memberId}/status`, { status });
}

export async function removeOrganizationMember(id: string, memberId: string): Promise<void> {
  await api.delete(`/admin/organizations/${id}/members/${memberId}`);
}

export async function transferOrganizationOwnership(id: string, toUserId: number, reason?: string): Promise<void> {
  await api.post(`/admin/organizations/${id}/ownership/transfer`, { toUserId, reason });
}

export async function fetchOwnershipHistory(id: string): Promise<OrgHistories["ownership"]> {
  const response = await api.get<ApiResponseData<OrgHistories["ownership"]>>(
    `/admin/organizations/${id}/ownership/history`,
  );
  return response.data.data;
}

// ---- Notes ----

export async function addOrganizationNote(id: string, note: string): Promise<void> {
  await api.post(`/admin/organizations/${id}/notes`, { note });
}

export async function fetchOrganizationNotes(id: string): Promise<AdminOrganization["notes"]> {
  const response = await api.get<ApiResponseData<AdminOrganization["notes"]>>(`/admin/organizations/${id}/notes`);
  return response.data.data;
}

export async function fetchOrganizationHistories(id: string): Promise<OrgHistories> {
  const response = await api.get<ApiResponseData<OrgHistories>>(`/admin/organizations/${id}/history`);
  return response.data.data;
}

// ---- Documents ----

export async function fetchOrganizationDocuments(id: string): Promise<OrgDocumentRef[]> {
  const response = await api.get<ApiResponseData<OrgDocumentRef[]>>(`/admin/organizations/${id}/documents`);
  return response.data.data;
}

export async function approveDocument(id: string, documentId: string): Promise<void> {
  await api.patch(`/admin/organizations/${id}/documents/${documentId}/approve`, {});
}

export async function rejectDocument(id: string, documentId: string, reason: string): Promise<void> {
  await api.patch(`/admin/organizations/${id}/documents/${documentId}/reject`, { reason });
}

export async function requestDocumentReplacement(id: string, documentId: string, note: string): Promise<void> {
  await api.patch(`/admin/organizations/${id}/documents/${documentId}/replacement`, { note });
}

export async function verifyDocument(id: string, documentId: string): Promise<void> {
  await api.patch(`/admin/organizations/${id}/documents/${documentId}/verify`, {});
}

export interface OrganizationDocumentUrl {
  fileUrl: string;
  expiresIn: number;
  fileName: string;
}

export async function fetchOrganizationDocumentUrl(id: string, documentId: string): Promise<OrganizationDocumentUrl> {
  const response = await api.get<ApiResponseData<OrganizationDocumentUrl>>(
    `/admin/organizations/${id}/documents/${documentId}/url`,
  );
  return response.data.data;
}
