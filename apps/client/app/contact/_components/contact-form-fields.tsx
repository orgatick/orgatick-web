"use client";

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
import {
  IconArrowUpRight,
  IconBrandWhatsapp,
  IconBuilding,
  IconLoader2,
  IconMail,
  IconSend,
  IconUser,
} from "@tabler/icons-react";
import { Controller, useFormContext } from "react-hook-form";
import { CATEGORY_OPTIONS, DEFAULT_HINT, SUPPORT_EMAIL, WHATSAPP_PHONE } from "./contact-constants";
import type { ContactFormData } from "./contact-schema";

export function ContactIdentityFields() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<ContactFormData>();

  return (
    <FieldGroup className="grid gap-5 sm:grid-cols-2">
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="name">
          Your Full Name <span className="text-destructive">*</span>
        </FieldLabel>
        <div className="relative">
          <Input
            id="name"
            autoComplete="name"
            placeholder="e.g. Aarav Sharma"
            aria-invalid={!!errors.name}
            className="pl-9"
            disabled={isSubmitting}
            {...register("name")}
          />
          <IconUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
        <FieldError errors={[errors.name]} />
      </Field>

      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email">
          Email Address <span className="text-destructive">*</span>
        </FieldLabel>
        <div className="relative">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. aarav@college.edu"
            aria-invalid={!!errors.email}
            className="pl-9"
            disabled={isSubmitting}
            {...register("email")}
          />
          <IconMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
        <FieldError errors={[errors.email]} />
      </Field>
    </FieldGroup>
  );
}

export function ContactTopicFields() {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<ContactFormData>();

  return (
    <FieldGroup className="grid gap-5 sm:grid-cols-2">
      <Field data-invalid={!!errors.organisation}>
        <FieldLabel htmlFor="organisation">
          College / Organisation <span className="text-xs text-muted-foreground font-normal">(optional)</span>
        </FieldLabel>
        <div className="relative">
          <Input
            id="organisation"
            autoComplete="organization"
            placeholder="e.g. IIT Delhi / Tech Corp"
            aria-invalid={!!errors.organisation}
            className="pl-9"
            disabled={isSubmitting}
            {...register("organisation")}
          />
          <IconBuilding className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
        <FieldError errors={[errors.organisation]} />
      </Field>

      <Field data-invalid={!!errors.category}>
        <FieldLabel htmlFor="category-select">Topic Details</FieldLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
              <SelectTrigger id="category-select" className="w-full" aria-invalid={!!errors.category}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.category]} />
      </Field>
    </FieldGroup>
  );
}

export function ContactMessageField() {
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<ContactFormData>();

  const selectedCategory = watch("category");
  const messageValue = watch("message") || "";

  const activeCategoryHint = CATEGORY_OPTIONS.find((c) => c.value === selectedCategory)?.hint || DEFAULT_HINT;

  return (
    <Field data-invalid={!!errors.message}>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="message">
          Message <span className="text-destructive">*</span>
        </FieldLabel>
        <span className="text-[11px] text-muted-foreground">{messageValue.length} / 2000 characters</span>
      </div>
      <Textarea
        id="message"
        placeholder={activeCategoryHint}
        className="min-h-36 resize-y text-sm leading-relaxed"
        aria-invalid={!!errors.message}
        disabled={isSubmitting}
        {...register("message")}
      />
      <FieldDescription className="text-xs">
        Please include key details such as expected dates, team size, or technical queries.
      </FieldDescription>
      <FieldError errors={[errors.message]} />
    </Field>
  );
}

export function ContactFormFooter() {
  const {
    formState: { isSubmitting },
  } = useFormContext<ContactFormData>();

  return (
    <>
      <div className="flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
          <span>No spam guarantee &bull; Avg response under 2h</span>
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="shrink-0 h-11 px-6 font-semibold shadow-md shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          {isSubmitting ? (
            <>
              <IconLoader2 className="size-4 animate-spin mr-1.5" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <IconSend className="size-4 ml-1.5" />
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <IconMail className="size-3.5" />
          Direct Email: {SUPPORT_EMAIL}
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=Hi%20Orgatick%20Team%2C%20I%20have%20an%20inquiry.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors"
        >
          <IconBrandWhatsapp className="size-3.5" />
          WhatsApp Fast Track
          <IconArrowUpRight className="size-3" />
        </a>
      </div>
    </>
  );
}
