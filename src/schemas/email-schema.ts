import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "Email must be at most 50 characters")
    .min(5, "Email must be at least 5 characters"),
});

export type emailData = z.infer<typeof emailSchema>;
