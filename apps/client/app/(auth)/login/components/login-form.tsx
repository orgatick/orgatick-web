"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Step1Form from "./login-form/step-1-form";
import Step2Form from "./login-form/step-2-form";
import { type LoginData, loginSchema } from "@orgatick/contracts";
import { useStepValidation } from "@/hooks/use-step-validation";

const LoginForm = () => {
  const [step, setStep] = useState(1);

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

    // API call to check email
    // const response = await checkEmail(form.getValues("email"));

    setStep(2);
  };

  const handleSubmit = async (data: LoginData) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
      {step === 1 && <Step1Form form={form} handleNext={handleNext} shouldRevalidate={shouldRevalidate} />}

      {step === 2 && <Step2Form form={form} setStep={setStep} />}
    </form>
  );
};

export default LoginForm;
