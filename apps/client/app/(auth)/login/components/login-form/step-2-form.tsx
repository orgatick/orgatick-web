import { Controller, type UseFormReturn } from "react-hook-form";
import { IconLoader2 } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@orgatick/ui/components/field";
import EmailView from "@/app/(auth)/_components/EmailView";
import type { LoginData } from "@orgatick/contracts";
import PasswordInput from "@orgatick/ui/components/password-input";

interface Step2FormProps {
  form: UseFormReturn<LoginData>;
  setStep: (step: number) => void;
  isLoading?: boolean;
}

export default function Step2Form({ form, setStep, isLoading }: Step2FormProps) {
  const isSubmitting = isLoading || form.formState.isSubmitting;

  return (
    <FieldGroup>
      <EmailView email={form.getValues("email")} onBack={() => setStep(1)} message="Logging using email" />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-md">Password</FieldLabel>
            <PasswordInput
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="text-xl h-10"
              iconClassName="size-10"
              disabled={isSubmitting}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting} className="w-full rounded-full text-xl h-14">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <IconLoader2 className="size-5 animate-spin" />
              Signing in...
            </span>
          ) : (
            "Continue with Password"
          )}
        </Button>
      </div>
    </FieldGroup>
  );
}
