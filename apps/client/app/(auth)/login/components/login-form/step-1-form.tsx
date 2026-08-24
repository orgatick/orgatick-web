import { Controller, type UseFormReturn } from "react-hook-form";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import type { LoginData } from "../../schema";

interface Step1FormProps {
  form: UseFormReturn<LoginData>;
  handleNext: () => void;
}

export default function Step1Form({ form, handleNext }: Step1FormProps) {
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
              className="text-xl h-10"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="button" onClick={handleNext} className="w-full rounded-full text-xl h-14">
        Continue
      </Button>
    </FieldGroup>
  );
}
