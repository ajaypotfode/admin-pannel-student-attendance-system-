import { z } from 'zod'

export const LoginFormSchema = z.object({
    email: z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
        .nonempty('email is Required')
        .refine(val => val === val.toLowerCase(), 'email Should be in lowercase'),

    password: z
        .string()
        .min(6, 'password Should be 6-10 char')
        .max(10, 'password should be 6-10 char')
})



export const registerFormSchema = z.object({
    role: z
        .string(),
    // .nonempty('Role is Required'),
    // .includes(''),
    userName: z
        .string()
        .min(2, 'User Name should be min 2 char')
        .nonempty('User Name Is Required'),

    email: z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
        .nonempty('email is Required')
        .refine(val => val === val.toLowerCase(), 'email Should be in lowercase'),

    image: z
        .any()
        .refine(
            (files) => files instanceof FileList && files.length > 0,
            { message: "File is required" }
        ),

    password: z
        .string()
        .min(6, 'password Should be 6-10 char')
        .max(10, 'password should be 6-10 char'),

    contactNo: z
        .string()
        .min(10, 'contact no should be 10 char')
        .max(10, 'contact no should be 10 char')
})


export type LoginFormType = z.infer<typeof LoginFormSchema>
export type RegisterFormType = z.infer<typeof registerFormSchema>