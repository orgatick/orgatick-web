import api from "@/lib/apis/auth.api";
import serverApi from "@/lib/apis/server-auth-api";
import type { UserResponse } from "@orgatick/contracts";
import type { UpdateProfileInput, UserProfileApiResponse } from "../_types/user.types";

export const userService = {
  /**
   * Client-side: Get current authenticated user profile
   * GET /users/me
   */
  async getProfile(): Promise<UserResponse> {
    const response = await api.get<UserProfileApiResponse>("/users/me");
    const user = response.data.data || response.data.user;
    if (!user) {
      throw new Error("User data not found in response");
    }
    return user;
  },

  /**
   * Server-side: Get current authenticated user profile using cookies
   * GET /users/me
   */
  async getServerProfile(): Promise<UserResponse | null> {
    try {
      const client = await serverApi();
      const response = await client.get<UserProfileApiResponse>("/users/me");
      return response.data.data || response.data.user || null;
    } catch {
      return null;
    }
  },

  /**
   * Client-side: Update user profile
   * PUT /users/me (multipart/form-data)
   */
  async updateProfile(data: UpdateProfileInput): Promise<UserResponse> {
    const formData = new FormData();

    if (data.name !== undefined && data.name !== null) {
      formData.append("name", data.name.trim());
    }

    if (data.gender !== undefined && data.gender !== null) {
      formData.append("gender", data.gender);
    }

    if (data.phoneNumber !== undefined && data.phoneNumber !== null) {
      formData.append("phoneNumber", data.phoneNumber.trim());
    }

    if (data.address !== undefined && data.address !== null) {
      formData.append("address", data.address.trim());
    }

    if (data.bio !== undefined && data.bio !== null) {
      formData.append("bio", data.bio.trim());
    }

    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }

    const response = await api.put<UserProfileApiResponse>("/users/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const user = response.data.data || response.data.user;
    if (!user) {
      throw new Error(response.data.message || "Failed to update profile");
    }

    return user;
  },
};
