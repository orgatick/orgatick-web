import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Need to be a valid email"),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordSchema = ForgotPasswordData;
