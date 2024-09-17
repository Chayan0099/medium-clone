import z from 'zod'; 

export const signupschema = z.object({
    userName: z.string(),
    email: z.string().email(), 
    password: z.string()
})

export const signinschema = z.object({
    email: z.string().email(),
    password: z.string()
})
 
export const createblogschema = z.object({
    title: z.string(),
    content: z.string()
})

export const updateblogschema = z.object({
    title: z.string().optional(),
    content: z.string().optional()
})

export type SignupType = z.infer< typeof signupschema>;
export type SigninType = z.infer< typeof signinschema>; 
export type CreateblogType = z.infer< typeof createblogschema>; 
export type UpdateblogType = z.infer< typeof updateblogschema>; 
