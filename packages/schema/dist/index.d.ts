import { z } from "zod";
export declare const nameSchema: z.ZodString;
export declare const emailSchema: z.ZodString;
export declare const passwordLoginSchema: z.ZodString;
export declare const passwordSignupSchema: z.ZodString;
export declare const userSignUpSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export type UserSignUp = z.infer<typeof userSignUpSchema>;
export declare const userLogInSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type UserLogIn = z.infer<typeof userLogInSchema>;
export declare const fileSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
    size: z.ZodNumber;
    userId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: string;
    name: string;
    size: number;
    userId: number;
}, {
    type: string;
    name: string;
    size: number;
    userId: number;
}>;
//# sourceMappingURL=index.d.ts.map