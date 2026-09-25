"use client";

import { Controller, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";

import { Label } from "@orgatick/ui/components/label";
import { Switch } from "@orgatick/ui/components/switch";

import type { CreateAddressDto } from "../../types";
import { TextField } from "./text-field";

export interface GeneralFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: string;
}

export function GeneralFields<T extends FieldValues>({ form, name }: GeneralFieldsProps<T>) {
  const fieldName = (field: keyof CreateAddressDto) => `${name}.${String(field)}`;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <TextField
          form={form}
          name={fieldName("venueName") as never}
          label="Venue Name"
          placeholder="e.g. Grand Plaza Hall"
        />
        <TextField form={form} name={fieldName("label") as never} label="Label" placeholder="e.g. Home, Work" />
      </div>

      <Controller
        name={fieldName("isDefault") as Path<T>}
        control={form.control}
        render={({ field }) => (
          <Label className="field-label flex w-fit cursor-pointer items-center gap-2">
            <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
            <span className="text-sm text-foreground">Set as default address</span>
          </Label>
        )}
      />
    </div>
  );
}
