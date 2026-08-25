import { z } from "zod";

export const verifyEmailSchema = z.object({
  email: z.string().email("Need to be a valid email"),
  token: z.string().min(1, "Verification token is required"),
});

export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;
export type VerifyEmailSchema = VerifyEmailData;
