import * as z from 'zod'

export const LogInSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters')
})

export type LogInSchemaType = z.infer<typeof LogInSchema>

export const resetSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email')
})

export type resetSchemaType = z.infer<typeof resetSchema>

export const verificationSchema = z.object({
    otp: z.string().min(1, 'Otp is required').min(4, 'Otp must have than 4 characters')
})

export type verificationSchemaType = z.infer<typeof verificationSchema>

export const updatePasswordSchema = z.object({
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
    confirm_password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters')
})

export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>