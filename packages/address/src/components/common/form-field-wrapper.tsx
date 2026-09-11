"use client";

import { Field, FieldDescription, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import type * as React from "react";
import { useId } from "react";

export interface FormFieldWrapperProps {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  standalone?: boolean;
  className?: string;
  children: (id: string) => React.ReactNode;
}

export function FormFieldWrapper({
  id: explicitId,
  label,
  description,
  error,
  required = false,
  standalone = false,
  className,
  children,
}: FormFieldWrapperProps) {
  const generatedId = useId();
  const id = explicitId || generatedId;

  if (standalone) {
    return <>{children(id)}</>;
  }

  return (
    <Field data-invalid={Boolean(error)} className={className}>
      {label && (
        <FieldLabel htmlFor={id}>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </FieldLabel>
      )}
      {children(id)}
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
}
