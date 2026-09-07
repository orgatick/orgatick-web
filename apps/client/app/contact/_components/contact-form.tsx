"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowUpRight, IconCheck, IconMail, IconSend } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@orgatick/ui/components/select";
import { Textarea } from "@orgatick/ui/components/textarea";
import { type ContactFormData, contactFormSchema } from "./contact-schema";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { category: "General question", name: "", email: "", organisation: "", message: "" },
    mode: "onBlur",
  });

  function handleSubmit({ name, email, organisation, category, message }: ContactFormData) {
    const subject = `${category} — message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nOrganisation: ${organisation}\nCategory: ${category}\n\n${message}`;

    window.location.href = `mailto:support@orgatick.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 px-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <IconCheck className="size-7" />
        </div>
        <div className="flex max-w-sm flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Your email draft is ready</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            It should have opened in your email app. Send it when you&apos;re ready and our team will get back to you
            shortly.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="flex flex-col gap-6">
      <FieldGroup className="grid gap-5 sm:grid-cols-2">
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="name">Your name</FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Aarav Sharma"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          <FieldError errors={[form.formState.errors.name]} />
        </Field>
        <Field data-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="email">Work email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@college.edu"
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>
      </FieldGroup>

      <FieldGroup className="grid gap-5 sm:grid-cols-2">
        <Field data-invalid={!!form.formState.errors.organisation}>
          <FieldLabel htmlFor="organisation">
            Organisation <span className="text-muted-foreground">(optional)</span>
          </FieldLabel>
          <Input
            id="organisation"
            autoComplete="organization"
            placeholder="Your college or company"
            aria-invalid={!!form.formState.errors.organisation}
            {...form.register("organisation")}
          />
          <FieldError errors={[form.formState.errors.organisation]} />
        </Field>
        <Field data-invalid={!!form.formState.errors.category}>
          <FieldLabel htmlFor="category">How can we help?</FieldLabel>
          <Controller
            name="category"
            control={form.control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="category" className="w-full" aria-invalid={!!form.formState.errors.category}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="General question">General question</SelectItem>
                    <SelectItem value="Host an event">Host an event</SelectItem>
                    <SelectItem value="Product support">Product support</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[form.formState.errors.category]} />
        </Field>
      </FieldGroup>

      <Field data-invalid={!!form.formState.errors.message}>
        <FieldLabel htmlFor="message">Tell us a little more</FieldLabel>
        <Textarea
          id="message"
          placeholder="What are you planning, and how can we help make it happen?"
          className="min-h-36 resize-y"
          aria-invalid={!!form.formState.errors.message}
          {...form.register("message")}
        />
        <FieldDescription>We usually reply within one business day.</FieldDescription>
        <FieldError errors={[form.formState.errors.message]} />
      </Field>

      <div className="flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground">
          By sending this message, you agree to our friendly, no-spam communication policy.
        </p>
        <Button type="submit" size="lg" className="shrink-0">
          Send message
          <IconSend data-icon="inline-end" />
        </Button>
      </div>

      <a
        href="mailto:support@orgatick.in"
        className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <IconMail className="size-4" />
        Prefer email? support@orgatick.in
        <IconArrowUpRight className="size-4" />
      </a>
    </form>
  );
}
