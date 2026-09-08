import api, { clearAccessToken, setAccessToken } from "@/lib/apis/auth.api";
import baseApi from "@/lib/apis/base.api";
import type {
  ForgotPasswordData,
  LoginData,
  ResetPasswordData,
  SignupData,
  UserResponse,
  VerifyEmailData,
} from "@orgatick/contracts";
import type { AuthSuccessResponse, GenericMessageResponse } from "../_types";

export type { AuthSuccessResponse, GenericMessageResponse };

export const authService = {
  async login(credentials: LoginData): Promise<AuthSuccessResponse> {
    const response = await baseApi.post<AuthSuccessResponse>("/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });

    const token =
      response.data.token || response.data.accessToken || response.data.data?.token || response.data.data?.accessToken;
    if (token) {
      setAccessToken(token);
    }

    return response.data;
  },

  async register(data: SignupData): Promise<AuthSuccessResponse> {
    const response = await baseApi.post<AuthSuccessResponse>("/auth/register", data);
    const token =
      response.data.token || response.data.accessToken || response.data.data?.token || response.data.data?.accessToken;
    if (token) {
      setAccessToken(token);
    }

    return response.data;
  },

  async forgotPassword(data: ForgotPasswordData): Promise<GenericMessageResponse> {
    const response = await baseApi.post<GenericMessageResponse>("/auth/forgot-password", {
      email: data.email,
    });
    return response.data;
  },

  async resendVerification(email: string): Promise<GenericMessageResponse> {
    const response = await baseApi.post<GenericMessageResponse>("/auth/resend-verification", {
      email,
    });
    return response.data;
  },

  async verifyEmail(data: VerifyEmailData): Promise<GenericMessageResponse> {
    const response = await baseApi.post<GenericMessageResponse>("/auth/verify-email", {
      email: data.email,
      token: data.token,
    });
    return response.data;
  },

  async resetPassword(data: ResetPasswordData): Promise<GenericMessageResponse> {
    const response = await baseApi.post<GenericMessageResponse>("/auth/reset-password", {
      email: data.email,
      token: data.token,
      password: data.password,
    });
    return response.data;
  },

  async refreshToken(): Promise<AuthSuccessResponse> {
    const response = await baseApi.post<AuthSuccessResponse>("/auth/refresh", {});
    const token =
      response.data.token || response.data.accessToken || response.data.data?.token || response.data.data?.accessToken;
    if (token) {
      setAccessToken(token);
    }
    return response.data;
  },

  async logout(): Promise<GenericMessageResponse> {
    try {
      const response = await api.post<GenericMessageResponse>("/auth/logout", {});
      return response.data;
    } finally {
      clearAccessToken();
    }
  },

  async getCurrentUser(): Promise<UserResponse> {
    const response = await api.get<{
      success?: boolean;
      statusCode?: number;
      data?: UserResponse;
      user?: UserResponse;
    }>("/users/me");
    const user = response.data.data || response.data.user;
    if (!user) {
      throw new Error("User data not found in response");
    }
    return user;
  },

  async getGoogleAuthUrl(redirect = "/dashboard"): Promise<string> {
    const response = await baseApi.get<{
      url?: string;
      data?: { url?: string };
    }>(`/auth/google/url?redirect=${encodeURIComponent(redirect)}`);
    const url = response.data?.data?.url || response.data?.url;
    if (!url) {
      throw new Error("Failed to obtain Google authentication URL");
    }
    return url;
  },

  async handleGoogleCallback(code: string): Promise<AuthSuccessResponse> {
    const response = await baseApi.post<AuthSuccessResponse>("/auth/google/callback", { code });
    const token =
      response.data.token || response.data.accessToken || response.data.data?.token || response.data.data?.accessToken;
    if (token) setAccessToken(token);
    return response.data;
  },
};
