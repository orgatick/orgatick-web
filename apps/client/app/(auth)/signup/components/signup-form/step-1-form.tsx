import { Controller, type UseFormReturn } from "react-hook-form";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import type { SignupData } from "@orgatick/contracts";

interface Step1FormProps {
  form: UseFormReturn<SignupData>;
  handleNext: () => void;
  step1Submitted: boolean;
}

export default function Step1Form({ form, handleNext, step1Submitted }: Step1FormProps) {
  return (
    <FieldGroup>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-md">Name</FieldLabel>

            <Input
              {...field}
              onChange={(event) => {
                field.onChange(event);

                if (step1Submitted) {
                  void form.trigger("name");
                }
              }}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your name"
              autoComplete="name"
              className="h-10 text-xl"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-md">Email</FieldLabel>

            <Input
              {...field}
              type="email"
              onChange={(event) => {
                field.onChange(event);

                if (step1Submitted) {
                  void form.trigger("email");
                }
              }}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              autoComplete="email"
              className="h-10 text-xl"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="button" onClick={handleNext} className="h-14 w-full rounded-full text-xl">
        Next
      </Button>
    </FieldGroup>
  );
}
