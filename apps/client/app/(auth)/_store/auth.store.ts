import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "@/components/ui/sonner";
import { handleApiError, isEmailUnverifiedError } from "@/lib/apis/api-error";
import { clearAccessToken, setAccessToken } from "@/lib/apis/auth.api";
import { authService } from "../_services/auth.service";
import type { AuthState, LoginResult } from "../_types";
import type {
  ForgotPasswordData,
  LoginData,
  ResetPasswordData,
  SignupData,
  VerifyEmailData,
} from "@orgatick/contracts";

export type { LoginResult, AuthState };

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,

      setUser: (user) => {
        set({ user, isAuthenticated: Boolean(user) });
      },

      setToken: (token) => {
        if (token) {
          setAccessToken(token);
        } else {
          clearAccessToken();
        }
        set({ token, isAuthenticated: Boolean(token) });
      },

      setAuth: (user, token) => {
        if (token) {
          setAccessToken(token);
        } else {
          clearAccessToken();
        }
        set({
          user,
          token,
          isAuthenticated: Boolean(token || user),
        });
      },

      clearAuth: () => {
        clearAccessToken();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      fetchCurrentUser: async () => {
        try {
          const user = await authService.getCurrentUser();
          set({ user, isAuthenticated: true });
          return user;
        } catch {
          return null;
        }
      },

      login: async (credentials: LoginData) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(credentials);
          const token =
            response.token || response.accessToken || response.data?.token || response.data?.accessToken || null;
          let user = response.user || response.data?.user || null;

          if (token) {
            setAccessToken(token);
          }

          // If user not in response body, fetch own profile from /user/me
          if (!user) {
            try {
              user = await authService.getCurrentUser();
            } catch {
              // fallback
            }
          }

          set({
            user,
            token,
            isAuthenticated: Boolean(token || user),
            isLoading: false,
          });

          const welcomeName = user?.name ? `, ${user.name}` : "";
          toast.success(`Welcome back${welcomeName}!`);

          return { success: true, data: response };
        } catch (error) {
          set({ isLoading: false });
          const isUnverified = isEmailUnverifiedError(error);
          const errorMessage = handleApiError(
            error,
            isUnverified
              ? "Please verify your email before logging in."
              : "Failed to sign in. Please check your credentials.",
          );
          return {
            success: false,
            requiresEmailVerification: isUnverified,
            message: errorMessage,
          };
        }
      },

      googleLogin: async (code: string) => {
        set({ isLoading: true });
        try {
          const response = await authService.handleGoogleCallback(code);
          const token =
            response.token || response.accessToken || response.data?.token || response.data?.accessToken || null;
          let user = response.user || response.data?.user || null;

          if (token) {
            setAccessToken(token);
          }

          if (!user) {
            try {
              user = await authService.getCurrentUser();
            } catch {
              // fallback
            }
          }

          set({
            user,
            token,
            isAuthenticated: Boolean(token || user),
            isLoading: false,
          });

          const welcomeName = user?.name ? `, ${user.name}` : "";
          toast.success(`Welcome back${welcomeName}!`);

          return { success: true, data: response };
        } catch (error) {
          set({ isLoading: false });
          const errorMessage = handleApiError(error, "Failed to authenticate with Google. Please try again.");
          return {
            success: false,
            message: errorMessage,
          };
        }
      },

      register: async (data: SignupData) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(data);
          set({ isLoading: false });

          toast.success("Account created successfully! Please verify your email to continue.");
          return { success: true, data: response };
        } catch (error) {
          set({ isLoading: false });
          handleApiError(error, "Failed to create account. Please try again.");
          return { success: false };
        }
      },

      forgotPassword: async (data: ForgotPasswordData) => {
        set({ isLoading: true });
        try {
          await authService.forgotPassword(data);
          set({ isLoading: false });

          toast.success("Password reset instructions have been sent to your email.");
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          handleApiError(error, "Failed to send reset link. Please check the email address.");
          return { success: false };
        }
      },

      resendVerification: async (email: string) => {
        try {
          await authService.resendVerification(email);
          toast.success("Verification link sent! Please check your inbox.");
          return { success: true };
        } catch (error) {
          handleApiError(error, "Failed to resend verification email. Please try again.");
          return { success: false };
        }
      },

      verifyEmail: async (data: VerifyEmailData) => {
        set({ isLoading: true });
        try {
          const response = await authService.verifyEmail(data);
          set({ isLoading: false });

          toast.success(response.message || "Email verified successfully!");
          return { success: true, message: response.message };
        } catch (error) {
          set({ isLoading: false });
          const errorMessage = handleApiError(error, "Failed to verify email. The link may be invalid or expired.", {
            showToast: false,
          });
          return { success: false, message: errorMessage };
        }
      },

      resetPassword: async (data: ResetPasswordData) => {
        set({ isLoading: true });
        try {
          await authService.resetPassword(data);
          set({ isLoading: false });

          toast.success("Password updated successfully! You can now log in.");
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          handleApiError(error, "Failed to reset password. The link may have expired.");
          return { success: false };
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch {
          // Ignore network or token expiration errors on logout
        } finally {
          get().clearAuth();
          set({ isLoading: false });
          toast.info("You have been signed out.");
        }
      },

      initializeAuth: async () => {
        if (get().isInitialized) return;
        const currentToken = get().token;
        if (currentToken) {
          setAccessToken(currentToken);
        }

        try {
          // Attempt silent refresh if no token in memory
          if (!currentToken) {
            const refreshRes = await authService.refreshToken();
            const refreshedToken =
              refreshRes.token || refreshRes.accessToken || refreshRes.data?.token || refreshRes.data?.accessToken;
            if (refreshedToken) {
              setAccessToken(refreshedToken);
              set({ token: refreshedToken });
            }
          }

          // Fetch full user profile from /user/me
          const user = await authService.getCurrentUser();
          set({ user, isAuthenticated: true });
        } catch {
          if (!get().token) {
            get().clearAuth();
          }
        } finally {
          set({ isInitialized: true });
        }
      },
    }),
    {
      name: "orgatick-auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    },
  ),
);
