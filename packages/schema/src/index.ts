import { z } from "zod";

// Convert all the objects to strings because I don't know why I did objects to begin with
// when it's checking strings...

export const nameSchema = z
  .string()
  .min(1, { message: "Can't be empty." })
  .max(10, { message: "Can't be 10 or more character long." });

export const emailSchema = z
  .string()
  .min(1, { message: "Can't be empty." })
  .email();

export const passwordLoginSchema = z
  .string()
  .min(1, { message: "Can't be empty." });

export const passwordSignupSchema = z
  .string()
  .min(1, { message: "Can't be empty." })
  .regex(/[^a-zA-Z0-9\s]/, {
    message: "Must contain atleast one special character.",
  });

export const userSignUpSchema = z.object({
  username: nameSchema,
  email: emailSchema,
  password: passwordSignupSchema,
});

export type UserSignUp = z.infer<typeof userSignUpSchema>;

export const userLogInSchema = z.object({
  username: nameSchema,
  password: passwordLoginSchema,
});

export type UserLogIn = z.infer<typeof userLogInSchema>;
