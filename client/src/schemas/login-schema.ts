import { z } from "zod";
import { emailSchema } from "./email-schema";
import { passwordSchema } from "./password-schema";

export const loginSchema = z.object({
  email: emailSchema.shape.email,
  password: passwordSchema.shape.password
});

export type loginFormData = z.infer<typeof loginSchema>;
