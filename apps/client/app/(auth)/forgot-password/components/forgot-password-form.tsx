"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Step1Form from "./forgot-password-form/step-1-form";
import Step2Form from "./forgot-password-form/step-2-form";
import { useStepValidation } from "@/hooks/use-step-validation";
import { type ForgotPasswordData, forgotPasswordSchema } from "@orgatick/contracts";

const ForgotPasswordForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { validate, shouldRevalidate } = useStepValidation(form);

  const handleSubmit = async (data: ForgotPasswordData) => {
    const valid = await validate(["email"]);
    if (!valid) return;

    setLoading(true);
    try {
      // Simulate API call to send password reset email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmittedEmail(data.email);
      setStep(2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      // Simulate API call to resend password reset email
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full">
      {step === 1 && (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
          <Step1Form form={form} loading={loading} shouldRevalidate={shouldRevalidate} />
        </form>
      )}

      {step === 2 && (
        <Step2Form
          email={submittedEmail || form.getValues("email")}
          onResend={handleResend}
          isResending={isResending}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default ForgotPasswordForm;
