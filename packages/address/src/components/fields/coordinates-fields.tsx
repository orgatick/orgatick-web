"use client";

import { Controller, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";

import { Input } from "@orgatick/ui/components/input";
import { Label } from "@orgatick/ui/components/label";
import { cn } from "@orgatick/ui/lib/utils";

import type { CreateAddressDto } from "../../types";

export interface CoordinatesFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: string;
}

function NumberField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <div className="flex w-full flex-col items-start gap-2">
          <Label htmlFor={String(name)}>{label}</Label>
          <Input
            id={String(name)}
            type="number"
            step="any"
            inputMode="decimal"
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            value={field.value ?? ""}
            onChange={(event) => field.onChange(event.target.value === "" ? null : Number(event.target.value))}
            onBlur={field.onBlur}
          />
          {fieldState.error && <p className="text-sm text-destructive">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}

export function CoordinatesFields<T extends FieldValues>({ form, name }: CoordinatesFieldsProps<T>) {
  const fieldName = (field: keyof CreateAddressDto) => `${name}.${String(field)}` as Path<T>;

  return (
    <div className={cn("grid w-full grid-cols-1 gap-4 lg:grid-cols-2")}>
      <NumberField form={form} name={fieldName("latitude")} label="Latitude" placeholder="e.g. 28.6139" />
      <NumberField form={form} name={fieldName("longitude")} label="Longitude" placeholder="e.g. 77.2090" />
    </div>
  );
}
