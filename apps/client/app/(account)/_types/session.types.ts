import type { RevokeSessionsResponse, SessionResponse } from "@orgatick/contracts";

export type { SessionResponse, RevokeSessionsResponse };

export interface SessionsApiResponse {
  success?: boolean;
  statusCode?: number;
  data?: SessionResponse[];
  message?: string;
  timestamp?: string;
}

export interface CurrentSessionApiResponse {
  success?: boolean;
  statusCode?: number;
  data?: SessionResponse;
  message?: string;
  timestamp?: string;
}

export interface RevokeSessionsApiResponse {
  success?: boolean;
  statusCode?: number;
  data?: RevokeSessionsResponse;
  message?: string;
  revokedCount?: number;
  timestamp?: string;
}

export interface SessionDeviceDetails {
  browser: string;
  platform: string;
  deviceType: "desktop" | "mobile" | "tablet" | "client" | "unknown";
  formattedLastActive: string;
  formattedCreatedAt: string;
  formattedExpiresAt: string | null;
  relativeLastActive: string;
}
