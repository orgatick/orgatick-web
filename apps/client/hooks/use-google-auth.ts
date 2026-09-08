import { useState } from "react";
import { authService } from "@/app/(auth)/_services";
import { useAuthStore } from "@/app/(auth)/_store";
import { toast } from "@/components/ui/sonner";

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const googleLogin = useAuthStore((state) => state.googleLogin);

  const startGoogleAuth = async (redirectIntent = "/dashboard") => {
    setLoading(true);
    setError(null);
    try {
      const url = await authService.getGoogleAuthUrl(redirectIntent);
      if (url) window.location.href = url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to start Google sign-in";
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  };

  const handleCallback = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await googleLogin(code);
      if (!result.success) {
        throw new Error(result.message || "Google authentication failed");
      }
      return result.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Google authentication failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { startGoogleAuth, handleCallback, loading, error };
};
