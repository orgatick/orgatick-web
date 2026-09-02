"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Step1Form from "./signup-form/step-1-form";
import Step2Form from "./signup-form/step-2-form";
import { signupSchema, type SignupData } from "@orgatick/contracts";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [step1Submitted, setStep1Submitted] = useState(false);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const handleNext = async () => {
    setStep1Submitted(true);
    const valid = await form.trigger(["name", "email"]);
    if (valid) setStep(2);
  };

  const handleSubmit = async (data: SignupData) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
      {step === 1 && <Step1Form form={form} handleNext={handleNext} step1Submitted={step1Submitted} />}

      {step === 2 && <Step2Form form={form} setStep={setStep} />}
    </form>
  );
};

export default SignupForm;
