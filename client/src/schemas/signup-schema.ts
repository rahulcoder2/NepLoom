import { z } from "zod";
import { emailSchema } from "./email-schema";
import { passwordSchema } from "./password-schema";

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(2, "fullName must be at least 2 characters")
    .max(50, "fullName must be at most 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "fullName must contain only letters and spaces"),
  email: emailSchema.shape.email,
  password: passwordSchema.shape.password,
});

export type signUpFormData = z.infer<typeof signUpSchema>;
