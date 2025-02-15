import { z } from "zod";
export declare const nameSchema: z.ZodObject<{
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
}, {
    username: string;
}>;
export type Name = z.infer<typeof nameSchema>;
export declare const emailSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type Email = z.infer<typeof emailSchema>;
export declare const passwordLoginSchema: z.ZodObject<{
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
}, {
    password: string;
}>;
export type PasswordLogin = z.infer<typeof passwordLoginSchema>;
export declare const passwordSignupSchema: z.ZodObject<{
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
}, {
    password: string;
}>;
export type PasswordSignup = z.infer<typeof passwordSignupSchema>;
//# sourceMappingURL=index.d.ts.map