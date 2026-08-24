"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import { cn } from "@orgatick/ui/lib/utils";

interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  iconClassName?: string;
}

function PasswordInput({ className, iconClassName, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative w-full">
      <InputPrimitive
        {...props}
        type={showPassword ? "text" : "password"}
        data-slot="password-input"
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 pr-9 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className,
        )}
      />

      <button
        type="button"
        tabIndex={-1}
        aria-label={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword((value) => !value)}
        className="absolute top-1/2 right-2 flex size-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"
      >
        {showPassword ? (
          <IconEyeOff className={cn("size-4", iconClassName)} />
        ) : (
          <IconEye className={cn("size-4", iconClassName)} />
        )}
      </button>
    </div>
  );
}

export default PasswordInput;
