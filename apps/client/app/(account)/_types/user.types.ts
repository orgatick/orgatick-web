import type { Gender, UserResponse, UserRole } from "@orgatick/contracts";

export type { Gender, UserResponse, UserRole };

export interface UpdateProfileInput {
  name?: string;
  avatar?: File | null;
  bio?: string | null;
  gender?: Gender;
  phoneNumber?: string | null;
  address?: string | null;
}

export interface ProfileFormValues {
  name: string;
  email: string;
  gender: Gender;
  phoneNumber: string;
  bio: string;
  address: string;
}

export interface UserProfileApiResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: UserResponse;
  user?: UserResponse;
}
