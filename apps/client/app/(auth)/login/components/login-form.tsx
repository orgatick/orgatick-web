"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema, { type LoginData } from "../schema";
import Step1Form from "./login-form/step-1-form";
import Step2Form from "./login-form/step-2-form";

const LoginForm = () => {
  const [step, setStep] = useState(1);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleNext = async () => {
    const valid = await form.trigger(["email"]);
    if (valid) {
      // API call to for email and call
      setStep(2);
    }
  };

  const handleSubmit = async (data: LoginData) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
      {step === 1 && <Step1Form form={form} handleNext={handleNext} />}
      {step === 2 && <Step2Form form={form} setStep={setStep} />}
    </form>
  );
};

export default LoginForm;
