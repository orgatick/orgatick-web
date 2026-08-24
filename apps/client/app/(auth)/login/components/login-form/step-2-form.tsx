import { Controller, type UseFormReturn } from "react-hook-form";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import EmailView from "@/app/(auth)/components/EmailView";
import type { LoginData } from "@orgatick/contracts";

interface Step2FormProps {
  form: UseFormReturn<LoginData>;
  setStep: (step: number) => void;
}

export default function Step2Form({ form, setStep }: Step2FormProps) {
  return (
    <FieldGroup>
      <EmailView email={form.getValues("email")} onBack={() => setStep(1)} message="Logging using email" />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-md">Password</FieldLabel>
            <Input
              {...field}
              type="password"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your password"
              autoComplete="new-password"
              className="text-xl h-10"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex gap-2">
        <Button type="submit" className="w-full rounded-full text-xl h-14">
          Continue with Password
        </Button>
      </div>
    </FieldGroup>
  );
}
