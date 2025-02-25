import { z } from "zod";
// make max match the actual prisma schema/database requirement e.g username max is 100 character limit
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
export const userLogInSchema = z.object({
    username: nameSchema,
    password: passwordLoginSchema,
});
export const fileSchema = z.object({
    name: z.string().min(1).max(100),
    type: z.string().min(1).max(30),
    size: z.number().int(),
    userId: z.number().int(),
});
