"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Step1Form from "./login-form/step-1-form";
import Step2Form from "./login-form/step-2-form";
import { type LoginData, loginSchema } from "@orgatick/contracts";
import { useStepValidation } from "@/hooks/use-step-validation";
import { useAuthStore } from "@/app/(auth)/_store";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [step, setStep] = useState(1);
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { validate, shouldRevalidate } = useStepValidation(form);

  const handleNext = async () => {
    const valid = await validate(["email"]);
    if (!valid) return;
    setStep(2);
  };

  const handleSubmit = async (data: LoginData) => {
    const result = await login(data);
    if (result.success) {
      router.push(callbackUrl);
      router.refresh();
    } else if (result.requiresEmailVerification) {
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
      {step === 1 && <Step1Form form={form} handleNext={handleNext} shouldRevalidate={shouldRevalidate} />}

      {step === 2 && <Step2Form form={form} setStep={setStep} isLoading={isLoading} />}
    </form>
  );
};

export default LoginForm;
