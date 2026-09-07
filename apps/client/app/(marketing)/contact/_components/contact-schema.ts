import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name must be 80 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address."),
  organisation: z.string().trim().max(120, "Organisation must be 120 characters or fewer.").optional(),
  category: z.enum(["General question", "Host an event", "Product support", "Partnership"]),
  message: z
    .string()
    .trim()
    .min(20, "Please share a little more detail (at least 20 characters).")
    .max(2000, "Message must be 2,000 characters or fewer."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
