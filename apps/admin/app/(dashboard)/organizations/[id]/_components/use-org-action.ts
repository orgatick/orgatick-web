"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/apis/api-error";

interface UseOrgActionOptions {
  successMessage?: string;
  errorMessage?: string;
}

/** Runs an admin mutation, then refreshes the page and toasts the result. */
export function useOrgAction(options: UseOrgActionOptions = {}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const run = (action: () => Promise<unknown>) =>
    startTransition(async () => {
      try {
        await action();
        router.refresh();
        toast.success(options.successMessage ?? "Action completed");
      } catch (error) {
        handleApiError(error, options.errorMessage ?? "Action failed");
      }
    });

  return { pending, run };
}

/** Shared button styles for admin panels. */
export const dangerButton = "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20";
export const successButton =
  "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400";
