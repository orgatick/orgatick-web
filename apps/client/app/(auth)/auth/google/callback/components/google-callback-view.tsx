"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "motion/react";

import Header from "@/app/(auth)/_components/Header";
import { useAuthStore } from "@/app/(auth)/_store";
import { useGoogleAuth } from "@/hooks/use-google-auth";

import AuthenticatingState from "./google-callback/authenticating-state";
import SuccessState from "./google-callback/success-state";
import ErrorState from "./google-callback/error-state";

type CallbackStatus = "authenticating" | "success" | "error";

export default function GoogleCallbackView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<CallbackStatus>("authenticating");
  const [error, setError] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState<string>("/dashboard");

  const googleLogin = useAuthStore((state) => state.googleLogin);
  const { startGoogleAuth, loading: isRetrying } = useGoogleAuth();
  const isExecutingRef = useRef(false);

  useEffect(() => {
    if (isExecutingRef.current) return;

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const oauthError = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    // Decode destination path from state if provided
    let targetRedirect = "/events";
    if (state) {
      try {
        const decoded = atob(decodeURIComponent(state));
        const parsedState = JSON.parse(decoded);
        if (parsedState.redirect) targetRedirect = parsedState.redirect;
      } catch {
        try {
          const parsedState = JSON.parse(atob(state));
          if (parsedState.redirect) targetRedirect = parsedState.redirect;
        } catch {
          // fallback to /dashboard
        }
      }
    }
    setRedirectPath(targetRedirect);

    if (oauthError) {
      setStatus("error");
      setError(errorDescription || `Google OAuth error: ${oauthError}`);
      return;
    }

    if (!code) {
      setStatus("error");
      setError("Authorization code was not received from Google. Please try signing in again.");
      return;
    }

    isExecutingRef.current = true;

    const exchangeCode = async () => {
      try {
        const result = await googleLogin(code);

        if (!result.success) {
          throw new Error(result.message || "Failed to authenticate with Google. Please try again.");
        }

        setStatus("success");
        setTimeout(() => {
          router.replace(targetRedirect);
          router.refresh();
        }, 800);
      } catch (err: unknown) {
        setStatus("error");
        const message = err instanceof Error ? err.message : "Authentication error occurred. Please try again.";
        setError(message);
      }
    };

    void exchangeCode();
  }, [searchParams, googleLogin, router]);

  const handleRetry = () => {
    startGoogleAuth(redirectPath);
  };

  return (
    <div className="h-full flex flex-col items-center pt-6">
      <Header />
      <div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {status === "authenticating" && <AuthenticatingState key="authenticating" />}

            {status === "success" && <SuccessState key="success" />}

            {status === "error" && (
              <ErrorState key="error" error={error} onRetry={handleRetry} isRetrying={isRetrying} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
