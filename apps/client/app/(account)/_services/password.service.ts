import api from "@/lib/apis/auth.api";
import type { GenericMessageResponse } from "@/app/(auth)/_types";
import type { ChangePasswordInput } from "@orgatick/contracts";

export const passwordService = {
  /**
   * Change authenticated user's password
   * POST /auth/password/change
   */
  async changePassword(data: ChangePasswordInput): Promise<GenericMessageResponse> {
    const response = await api.post<GenericMessageResponse>("/auth/password/change", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
      revokeOtherSessions: data.revokeOtherSessions ?? true,
    });
    return response.data;
  },
};
