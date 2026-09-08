import type { UserResponse } from "@orgatick/contracts";

export interface AuthSuccessResponse {
  token?: string;
  accessToken?: string;
  user?: UserResponse;
  message?: string;
  data?: {
    token?: string;
    accessToken?: string;
    user?: UserResponse;
  };
}

export interface UserProfileResponse {
  success: boolean;
  statusCode: number;
  data: UserResponse;
  timestamp?: string;
}

export interface GenericMessageResponse {
  message?: string;
  success?: boolean;
}
