import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Button, type buttonVariants } from "./button";

export interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
}

export function LinkButton({ href, children, variant = "default", icon, iconRight, size = "lg", className }: LinkButtonProps) {
  return (
    <Button variant={variant} size={size} className={className} nativeButton={false} render={<Link href={href} />}>
      {icon}
      {children}
      {iconRight}
    </Button>
  );
}
