import { z } from "zod";
export const nameSchema = z.object({
    username: z
        .string()
        .min(1, { message: "Can't be empty." })
        .max(10, { message: "Can't be 10 or more character long." }),
});
export const emailSchema = z.object({
    email: z.string().min(1, { message: "Can't be empty." }).email(),
});
export const passwordLoginSchema = z.object({
    password: z.string().min(1, { message: "Can't be empty." }),
});
export const passwordSignupSchema = z.object({
    password: z
        .string()
        .min(1, { message: "Can't be empty." })
        .regex(/[^a-zA-Z0-9\s]/, {
        message: "Must contain atleast one special character.",
    }),
});
