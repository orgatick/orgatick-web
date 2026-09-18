"use client";

import { authService } from "@/app/(auth)/_services/auth.service";
import { clearAccessToken } from "@/lib/apis/auth.api";
import { toast } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  return async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network or token expiry errors on logout.
    }
    clearAccessToken();
    toast.info("You have been signed out.");
    router.refresh();
  };
}
