"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Step1Form from "./reset-password-form/step-1-form";
import Step2Form from "./reset-password-form/step-2-form";
import InvalidTokenView from "./reset-password-form/invalid-token-view";
import ResetPasswordSkeleton from "./reset-password-skeleton";
import { resetPasswordSchema, type ResetPasswordData } from "@orgatick/contracts";
import { useStepValidation } from "@/hooks/use-step-validation";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      token: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { validate, shouldRevalidate } = useStepValidation(form);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    const urlEmail = searchParams.get("email");

    if (urlToken) {
      setToken(urlToken);
      form.setValue("token", urlToken);
    }
    if (urlEmail) {
      setEmail(urlEmail);
      form.setValue("email", urlEmail);
    }

    setIsTokenChecked(true);

    // Strip token and email from URL to protect sensitive tokens in history/address bar
    if (typeof window !== "undefined" && (urlToken || urlEmail)) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState(null, "", cleanUrl);
    }
  }, [searchParams, form]);

  const handleSubmit = async (data: ResetPasswordData) => {
    const valid = await validate(["password", "confirmPassword"]);
    if (!valid) return;

    setLoading(true);
    try {
      // Simulate API call to reset password with { email: data.email, token: data.token, password: data.password }
      console.log("Simulating reset password with payload:", {
        email: data.email,
        token: data.token,
        password: data.password,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isTokenChecked) {
    return <ResetPasswordSkeleton />;
  }

  if (!token) {
    return <InvalidTokenView />;
  }

  return (
    <div className="w-full">
      {step === 1 && (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
          <Step1Form form={form} email={email} loading={loading} shouldRevalidate={shouldRevalidate} />
        </form>
      )}

      {step === 2 && <Step2Form />}
    </div>
  );
};

export default ResetPasswordForm;
