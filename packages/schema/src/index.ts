import { z } from "zod";

// Convert all the objects to strings because I don't know why I did objects to begin with
// when it's checking strings...

export const nameSchema = z
  .string()
  .min(1, { message: "Can't be empty." })
  .max(10, { message: "Can't be 10 or more character long." });

export type Name = z.infer<typeof nameSchema>;

export const emailSchema = z
  .string()
  .min(1, { message: "Can't be empty." })
  .email();

export type Email = z.infer<typeof emailSchema>;

export const passwordLoginSchema = z
  .string()
  .min(1, { message: "Can't be empty." });

export type PasswordLogin = z.infer<typeof passwordLoginSchema>;

export const passwordSignupSchema = z
  .string()
  .min(1, { message: "Can't be empty." })
  .regex(/[^a-zA-Z0-9\s]/, {
    message: "Must contain atleast one special character.",
  });

export type PasswordSignup = z.infer<typeof passwordSignupSchema>;
