"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/(auth)/_store";
import { Button } from "@orgatick/ui/components/button";
import { IconAlertCircle } from "@tabler/icons-react";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const googleLogin = useAuthStore((state) => state.googleLogin);
  const isExecutingRef = useRef(false);

  useEffect(() => {
    if (isExecutingRef.current) return;

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const oauthError = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (oauthError) {
      setError(errorDescription || `Google OAuth error: ${oauthError}`);
      return;
    }

    if (!code) {
      setError("Authorization code not received from Google.");
      return;
    }

    isExecutingRef.current = true;

    const exchangeCode = async () => {
      try {
        const result = await googleLogin(code);

        if (!result.success) {
          throw new Error(result.message || "Failed to authenticate with Google");
        }

        // Decode destination path from state if provided
        let redirectPath = "/dashboard";
        if (state) {
          try {
            const decoded = atob(decodeURIComponent(state));
            const parsedState = JSON.parse(decoded);
            if (parsedState.redirect) redirectPath = parsedState.redirect;
          } catch {
            try {
              const parsedState = JSON.parse(atob(state));
              if (parsedState.redirect) redirectPath = parsedState.redirect;
            } catch {
              // fallback to /dashboard
            }
          }
        }

        router.replace(redirectPath);
        router.refresh();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Authentication error";
        setError(message);
      }
    };

    exchangeCode();
  }, [searchParams, googleLogin, router]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-8 shadow-lg text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <IconAlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Authentication Failed</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{error}</p>
          <div className="pt-2">
            <Button onClick={() => router.push("/login")} className="w-full rounded-full">
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-foreground">Signing you in...</h3>
          <p className="text-sm text-muted-foreground">Completing sign in with Google. Please wait.</p>
        </div>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
