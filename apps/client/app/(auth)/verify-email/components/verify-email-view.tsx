"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import VerifyingState from "./verify-email/verifying-state";
import SuccessState from "./verify-email/success-state";
import ErrorState from "./verify-email/error-state";
import { useAuthStore } from "@/app/(auth)/_store";

interface VerifyEmailViewProps {
  initialToken?: string;
  initialEmail?: string;
}

type VerificationStatus = "checking" | "success" | "error" | "missing_token";

export default function VerifyEmailView({ initialToken = "", initialEmail = "" }: VerifyEmailViewProps) {
  const [status, setStatus] = useState<VerificationStatus>(initialToken ? "checking" : "missing_token");
  const [token] = useState(initialToken);
  const [email] = useState(initialEmail);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const resendVerification = useAuthStore((state) => state.resendVerification);

  useEffect(() => {
    // Scrub sensitive token from browser URL / history immediately
    if (typeof window !== "undefined" && initialToken) {
      const cleanUrl = initialEmail
        ? `${window.location.pathname}?email=${encodeURIComponent(initialEmail)}`
        : window.location.pathname;
      window.history.replaceState(null, "", cleanUrl);
    }

    if (!token) {
      setStatus("missing_token");
      return;
    }

    const verify = async () => {
      setStatus("checking");
      const result = await verifyEmail({ email, token });
      if (result.success) {
        setStatus("success");
      } else {
        setErrorMessage(result.message || "We could not verify your email. The link may have expired or is invalid.");
        setStatus("error");
      }
    };

    void verify();
  }, [token, email, verifyEmail, initialToken, initialEmail]);

  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    setResendSuccess(false);
    try {
      const result = await resendVerification(email);
      if (result.success) {
        setResendSuccess(true);
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {status === "checking" && <VerifyingState email={email} key="checking" />}

        {status === "success" && <SuccessState email={email} key="success" />}

        {status === "error" && (
          <ErrorState
            email={email}
            title="Verification Failed"
            errorMessage={errorMessage}
            onResend={email ? handleResend : undefined}
            isResending={isResending}
            resendSuccess={resendSuccess}
            key="error"
          />
        )}

        {status === "missing_token" && (
          <ErrorState
            email={email}
            title={email ? "Email Verification Required" : "Verification Link Required"}
            errorMessage={
              email
                ? "Please verify your email before logging in. Click below to receive a new verification link."
                : "No verification token was found in the link. Please check the link or request a new verification email."
            }
            onResend={email ? handleResend : undefined}
            isResending={isResending}
            resendSuccess={resendSuccess}
            isNoticeOnly={Boolean(email)}
            key="missing_token"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
