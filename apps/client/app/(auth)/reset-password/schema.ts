import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Need to be a valid email"),
    token: z.string().min(1, "Reset token is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(100, "Password is too long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordSchema = ResetPasswordData;
