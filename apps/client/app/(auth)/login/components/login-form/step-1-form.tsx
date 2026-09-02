import { Controller, type FieldPath, type UseFormReturn } from "react-hook-form";

import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";

import type { LoginData } from "@orgatick/contracts";

interface Step1FormProps {
  form: UseFormReturn<LoginData>;
  handleNext: () => void;
  shouldRevalidate: (field: FieldPath<LoginData>) => boolean;
}

export default function Step1Form({ form, handleNext, shouldRevalidate }: Step1FormProps) {
  return (
    <FieldGroup>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-md">Email</FieldLabel>

            <Input
              {...field}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              autoComplete="email"
              className="h-10 text-xl"
              onChange={(event) => {
                field.onChange(event);

                if (shouldRevalidate("email")) {
                  void form.trigger("email");
                }
              }}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="button" onClick={handleNext} className="h-14 w-full rounded-full text-xl">
        Continue
      </Button>
    </FieldGroup>
  );
}
