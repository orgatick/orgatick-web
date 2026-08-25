import { useState } from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export function useStepValidation<T extends FieldValues>(form: UseFormReturn<T>) {
  const [submittedFields, setSubmittedFields] = useState<Set<FieldPath<T>>>(new Set());

  const validate = async (fields: FieldPath<T>[]) => {
    setSubmittedFields((current) => {
      const next = new Set(current);
      fields.forEach((field) => {
        next.add(field);
      });
      return next;
    });

    return form.trigger(fields);
  };

  const shouldRevalidate = (field: FieldPath<T>) => {
    return submittedFields.has(field);
  };

  return {
    validate,
    shouldRevalidate,
  };
}
