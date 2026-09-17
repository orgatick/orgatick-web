"use client";

import { Controller, type Path, type FieldValues, type UseFormReturn } from "react-hook-form";

import { Input } from "@orgatick/ui/components/input";
import { Label } from "@orgatick/ui/components/label";
import { cn } from "@orgatick/ui/lib/utils";

export interface TextFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  className?: string;
}

export function TextField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  required,
  type = "text",
  className,
}: TextFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <div className={cn("flex w-full flex-col items-start gap-2", className)}>
          <Label htmlFor={name}>
            {label}
            {required && <span className="ml-0.5 text-destructive">*</span>}
          </Label>
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
          {fieldState.error && <p className="text-sm text-destructive">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}
