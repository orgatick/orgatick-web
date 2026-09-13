import api from "@/lib/apis/auth.api";
import serverApi from "@/lib/apis/server-auth-api";
import type { RevokeSessionsResponse, SessionResponse } from "@orgatick/contracts";
import type {
  CurrentSessionApiResponse,
  RevokeSessionsApiResponse,
  SessionsApiResponse,
} from "../_types/session.types";

export const sessionService = {
  /**
   * Server-side: List active sessions for the authenticated user
   * GET /auth/sessions
   */
  async getServerSessions(): Promise<SessionResponse[]> {
    try {
      const client = await serverApi();
      const response = await client.get<SessionsApiResponse>("/auth/sessions");
      if (Array.isArray(response.data?.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data as unknown as SessionResponse[];
      }
      return [];
    } catch {
      return [];
    }
  },

  /**
   * Server-side: Get current caller session details
   * GET /auth/sessions/current
   */
  async getServerCurrentSession(): Promise<SessionResponse | null> {
    try {
      const client = await serverApi();
      const response = await client.get<CurrentSessionApiResponse>("/auth/sessions/current");
      return response.data?.data || null;
    } catch {
      return null;
    }
  },

  /**
   * Client-side: List active sessions for the authenticated user
   * GET /auth/sessions
   */
  async getSessions(): Promise<SessionResponse[]> {
    const response = await api.get<SessionsApiResponse>("/auth/sessions");
    if (Array.isArray(response.data?.data)) {
      return response.data.data;
    }
    if (Array.isArray(response.data)) {
      return response.data as unknown as SessionResponse[];
    }
    return [];
  },

  /**
   * Client-side: Get current caller session details
   * GET /auth/sessions/current
   */
  async getCurrentSession(): Promise<SessionResponse | null> {
    const response = await api.get<CurrentSessionApiResponse>("/auth/sessions/current");
    return response.data?.data || null;
  },

  /**
   * Client-side: Revoke a specific session
   * DELETE /auth/sessions/:sessionId
   */
  async revokeSession(sessionId: number): Promise<RevokeSessionsResponse> {
    const response = await api.delete<RevokeSessionsApiResponse>(`/auth/sessions/${sessionId}`);
    const resData = response.data?.data || response.data;
    return {
      message: resData?.message || "Session revoked successfully",
      revokedCount: resData?.revokedCount,
    };
  },

  /**
   * Client-side: Revoke all other sessions except the current one
   * DELETE /auth/sessions/other
   */
  async revokeOtherSessions(): Promise<RevokeSessionsResponse> {
    const response = await api.delete<RevokeSessionsApiResponse>("/auth/sessions/other");
    const resData = response.data?.data || response.data;
    return {
      message: resData?.message || "All other sessions revoked successfully",
      revokedCount: resData?.revokedCount,
    };
  },

  /**
   * Client-side: Revoke all sessions belonging to the user and clear auth
   * DELETE /auth/sessions/all
   */
  async revokeAllSessions(): Promise<RevokeSessionsResponse> {
    const response = await api.delete<RevokeSessionsApiResponse>("/auth/sessions/all");
    const resData = response.data?.data || response.data;
    return {
      message: resData?.message || "All sessions revoked successfully",
      revokedCount: resData?.revokedCount,
    };
  },
};
