import { z } from "zod";
export declare const nameSchema: z.ZodString;
export type Name = z.infer<typeof nameSchema>;
export declare const emailSchema: z.ZodString;
export type Email = z.infer<typeof emailSchema>;
export declare const passwordLoginSchema: z.ZodString;
export type PasswordLogin = z.infer<typeof passwordLoginSchema>;
export declare const passwordSignupSchema: z.ZodString;
export type PasswordSignup = z.infer<typeof passwordSignupSchema>;
//# sourceMappingURL=index.d.ts.map