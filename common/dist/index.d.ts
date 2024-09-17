import z from 'zod';
export declare const signupschema: z.ZodObject<{
    userName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
    email: string;
    password: string;
}, {
    userName: string;
    email: string;
    password: string;
}>;
export declare const signinschema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createblogschema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateblogschema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
}>;
export type SignupType = z.infer<typeof signupschema>;
export type SigninType = z.infer<typeof signinschema>;
export type CreateblogType = z.infer<typeof createblogschema>;
export type UpdateblogType = z.infer<typeof updateblogschema>;
