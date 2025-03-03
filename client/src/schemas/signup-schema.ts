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
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^[0-9]*$/, "Phone number must contain only digits"),

  password: passwordSchema.shape.password,
});

export type signUpFormData = z.infer<typeof signUpSchema>;
