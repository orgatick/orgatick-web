import type {
  ForgotPasswordData,
  LoginData,
  ResetPasswordData,
  SignupData,
  UserResponse,
  VerifyEmailData,
} from "@orgatick/contracts";
import type { AuthSuccessResponse } from "./service.types";

export interface LoginResult {
  success: boolean;
  data?: AuthSuccessResponse;
  requiresEmailVerification?: boolean;
  message?: string;
}

export interface AuthState {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  // State Mutators
  setUser: (user: UserResponse | null) => void;
  setToken: (token: string | null) => void;
  setAuth: (user: UserResponse | null, token: string | null) => void;
  clearAuth: () => void;

  // Auth Operations
  login: (credentials: LoginData) => Promise<LoginResult>;
  register: (data: SignupData) => Promise<{ success: boolean; data?: AuthSuccessResponse }>;
  forgotPassword: (data: ForgotPasswordData) => Promise<{ success: boolean }>;
  resendVerification: (email: string) => Promise<{ success: boolean }>;
  verifyEmail: (data: VerifyEmailData) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (data: ResetPasswordData) => Promise<{ success: boolean }>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<UserResponse | null>;
  initializeAuth: () => Promise<void>;
}
