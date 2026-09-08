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
  /**
   * Log in user with email and password
   * POST /auth/login
   */
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

  /**
   * Register a new user
   * POST /auth/register
   */
  async register(data: SignupData): Promise<AuthSuccessResponse> {
    const response = await baseApi.post<AuthSuccessResponse>("/auth/register", {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    const token =
      response.data.token || response.data.accessToken || response.data.data?.token || response.data.data?.accessToken;
    if (token) {
      setAccessToken(token);
    }

    return response.data;
  },

  /**
   * Request password reset link
   * POST /auth/forgot-password
   */
  async forgotPassword(data: ForgotPasswordData): Promise<GenericMessageResponse> {
    const response = await baseApi.post<GenericMessageResponse>("/auth/forgot-password", {
      email: data.email,
    });
    return response.data;
  },

  /**
   * Resend email verification link
   * POST /auth/resend-verification
   */
  async resendVerification(email: string): Promise<GenericMessageResponse> {
    const response = await baseApi.post<GenericMessageResponse>("/auth/resend-verification", {
      email,
    });
    return response.data;
  },

  /**
   * Verify email address with verification token
   * POST /auth/verify-email
   */
  async verifyEmail(data: VerifyEmailData): Promise<GenericMessageResponse> {
    const response = await baseApi.post<GenericMessageResponse>("/auth/verify-email", {
      email: data.email,
      token: data.token,
    });
    return response.data;
  },

  /**
   * Reset password with reset token
   * POST /auth/reset-password
   */
  async resetPassword(data: ResetPasswordData): Promise<GenericMessageResponse> {
    const response = await baseApi.post<GenericMessageResponse>("/auth/reset-password", {
      email: data.email,
      token: data.token,
      password: data.password,
    });
    return response.data;
  },

  /**
   * Refresh session access token
   * POST /auth/refresh
   */
  async refreshToken(): Promise<AuthSuccessResponse> {
    const response = await baseApi.post<AuthSuccessResponse>("/auth/refresh", {});
    const token =
      response.data.token || response.data.accessToken || response.data.data?.token || response.data.data?.accessToken;
    if (token) {
      setAccessToken(token);
    }
    return response.data;
  },

  /**
   * Log out user session
   * POST /auth/logout
   */
  async logout(): Promise<GenericMessageResponse> {
    try {
      const response = await api.post<GenericMessageResponse>("/auth/logout", {});
      return response.data;
    } finally {
      clearAccessToken();
    }
  },

  /**
   * Get current authenticated user profile
   * GET /users/me
   */
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
};
