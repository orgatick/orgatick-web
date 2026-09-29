"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@orgatick/ui/components/button";
import { IconSend } from "@tabler/icons-react";
import { raiseVerificationRequest } from "@/lib/apis/verification.api";

interface RaiseVerificationButtonProps {
  organizationId: string | number;
  isResubmission?: boolean;
}

export function RaiseVerificationButton({ organizationId, isResubmission = false }: RaiseVerificationButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRaiseRequest = async () => {
    setIsSubmitting(true);
    try {
      await raiseVerificationRequest(organizationId);
      toast.success("Verification request raised", {
        description: "Our team will review your organization details and get back to you.",
      });
      router.refresh();
    } catch {
      toast.error("Couldn't raise the verification request", {
        description: "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button onClick={handleRaiseRequest} disabled={isSubmitting} className="gap-2">
      <IconSend className="size-4" />
      {isSubmitting
        ? "Sending request…"
        : isResubmission
          ? "Resubmit verification request"
          : "Raise verification request"}
    </Button>
  );
}
