"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DEFAULT_CATEGORY } from "./contact-constants";
import { ContactIdentityFields, ContactMessageField, ContactTopicFields } from "./contact-form-fields";
import { ContactFormFooter } from "./contact-form-footer";
import { type ContactFormData, contactFormSchema } from "./contact-schema";
import { ContactSuccess, type SubmissionResult } from "./contact-success";

export function ContactForm() {
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      category: DEFAULT_CATEGORY,
      name: "",
      email: "",
      organisation: "",
      message: "",
    },
    mode: "onBlur",
  });

  async function handleSubmit(data: ContactFormData) {
    try {
      // Simulate API submission call
      await new Promise((resolve) => setTimeout(resolve, 1100));

      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      const generatedTicketId = `ORG-${randomDigits}`;

      const result: SubmissionResult = {
        ticketId: generatedTicketId,
        data,
        submittedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setSubmissionResult(result);
      toast.success("Inquiry submitted successfully!", {
        description: `Your support ticket #${generatedTicketId} has been created.`,
      });
    } catch {
      toast.error("Failed to submit inquiry. Please try again or reach out on WhatsApp.");
    }
  }

  if (submissionResult) {
    return (
      <ContactSuccess
        result={submissionResult}
        onReset={() => {
          setSubmissionResult(null);
          form.reset();
        }}
      />
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="flex flex-col gap-6">
        <ContactIdentityFields />
        <ContactTopicFields />
        <ContactMessageField />
        <ContactFormFooter />
      </form>
    </FormProvider>
  );
}
