import api from "./auth.api";

export const ORGANIZATION_VERIFICATION_REQUEST_ENDPOINT = (organizationId: string | number) =>
  `/organizations/${organizationId}/verification/request`;

export async function raiseVerificationRequest(organizationId: string | number) {
  const response = await api.post(ORGANIZATION_VERIFICATION_REQUEST_ENDPOINT(organizationId), {});
  return response.data;
}
