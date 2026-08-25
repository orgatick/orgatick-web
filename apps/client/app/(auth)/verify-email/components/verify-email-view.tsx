"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import VerifyingState from "./verify-email/verifying-state";
import SuccessState from "./verify-email/success-state";
import ErrorState from "./verify-email/error-state";

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

  useEffect(() => {
    // Scrub sensitive token and email from browser URL / history immediately
    if (typeof window !== "undefined" && (initialToken || initialEmail)) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    if (!initialToken) {
      setStatus("missing_token");
      return;
    }

    const verify = async () => {
      setStatus("checking");
      try {
        // Simulate API call to verify token and email
        console.log("Simulating email verification with token:", token, "email:", email);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus("success");
      } catch (err) {
        console.error(err);
        setErrorMessage("We could not verify your email. The link may have expired or is invalid.");
        setStatus("error");
      }
    };

    void verify();
  }, [initialToken, initialEmail, token, email]);

  const handleResend = async () => {
    setIsResending(true);
    setResendSuccess(false);
    try {
      // Simulate API call to resend verification email
      console.log("Resending verification email to:", email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResendSuccess(true);
    } catch (err) {
      console.error(err);
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
            errorMessage={errorMessage}
            onResend={handleResend}
            isResending={isResending}
            resendSuccess={resendSuccess}
            key="error"
          />
        )}

        {status === "missing_token" && (
          <ErrorState
            email={email}
            errorMessage="No verification token was found in the link. Please check the link or request a new verification email."
            onResend={email ? handleResend : undefined}
            isResending={isResending}
            resendSuccess={resendSuccess}
            key="missing_token"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
