import { z } from "zod";
export declare const nameSchema: z.ZodString;
export type Name = z.infer<typeof nameSchema>;
export declare const emailSchema: z.ZodString;
export type Email = z.infer<typeof emailSchema>;
export declare const passwordLoginSchema: z.ZodString;
export type PasswordLogin = z.infer<typeof passwordLoginSchema>;
export declare const passwordSignupSchema: z.ZodString;
export type PasswordSignup = z.infer<typeof passwordSignupSchema>;
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
//# sourceMappingURL=index.d.ts.map