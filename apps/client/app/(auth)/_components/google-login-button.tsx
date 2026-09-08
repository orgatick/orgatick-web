"use client";

import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import { useSearchParams } from "next/navigation";
import { cn } from "@orgatick/ui/lib/utils";

interface GoogleLoginButtonProps {
  text?: string;
  redirectIntent?: string;
  className?: string;
  variant?: "outline" | "default" | "secondary" | "ghost" | "link";
  disabled?: boolean;
}

export const GoogleLoginButton = ({
  text = "Continue with Google",
  redirectIntent,
  className,
  variant = "outline",
  disabled,
}: GoogleLoginButtonProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = redirectIntent || searchParams.get("callbackUrl") || "/dashboard";
  const { startGoogleAuth, loading } = useGoogleAuth();

  const handleClick = () => {
    startGoogleAuth(callbackUrl);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={loading || disabled}
      variant={variant}
      className={cn("w-full rounded-full text-xl h-14 font-medium flex items-center justify-center gap-2", className)}
    >
      {loading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <IconBrandGoogle size={20} className="shrink-0" />
      )}
      <span>{loading ? "Redirecting to Google..." : text}</span>
    </Button>
  );
};

export default GoogleLoginButton;
