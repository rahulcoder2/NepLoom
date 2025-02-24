import { z } from "zod";

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
});

export type passwordData = z.infer<typeof passwordSchema>;
